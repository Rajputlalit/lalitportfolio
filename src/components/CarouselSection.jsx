import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import { FaReact, FaCss3Alt, FaHtml5, FaGithub } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiFigma } from "react-icons/si";
import { SiCanva } from "react-icons/si";
import "swiper/css";
import "./CarouselSection.css";

/* Load ALL images from /src/assets/pics (png/jpg/jpeg) */
const imports = import.meta.glob("../assets/pics/*.{png,jpg,jpeg}", { eager: true });
const ALL_IMAGES = Object.values(imports).map((m) => m.default).filter(Boolean);

/* Safety: if folder empty, keep array valid */
const safeImages = ALL_IMAGES.length ? ALL_IMAGES : [""];

/* Card data (titles + tech) — images are assigned dynamically per-card */
const CARDS = [
  {
    title: "Web Development",
    tech: [
      { label: "HTML", icon: <FaHtml5 /> },
      { label: "CSS", icon: <FaCss3Alt /> },
      { label: "JavaScript", icon: <SiJavascript /> },
    ],
    quote:
      "I design and develop responsive, accessible web experiences.",
  },
  {
    title: "Web Design",
    tech: [
      { label: "Figma", icon: <SiFigma /> },
      { label: "CSS", icon: <FaCss3Alt /> },
      { label: "Canva", icon: <SiCanva /> },
    ],
    quote:
      "Clean layouts, strong hierarchy, and delightful micro-interactions.",
  },
  {
    title: "ReactJs Development",
    tech: [
      { label: "React", icon: <FaReact /> },
      { label: "Tailwind", icon: <SiTailwindcss /> },
      { label: "GitHub", icon: <FaGithub /> },
    ],
    quote:
      "I build scalable React apps with performance and clean code.",
  },
];

/* Utility to get a different random index than current */
function nextRandomIndex(len, current) {
  if (len <= 1) return 0;
  let idx = current;
  while (idx === current) idx = Math.floor(Math.random() * len);
  return idx;
}

/* A single card that crossfades its image slowly in a loop */
function CarouselCard({ title, tech, quote, images }) {
const [currentIdx, setCurrentIdx] = React.useState(
  () => Math.floor(Math.random() * images.length) // 👈 pick a random starting image
);
const [nextIdx, setNextIdx] = React.useState(() =>
  nextRandomIndex(images.length, currentIdx) // 👈 next one should be different from the starting one
);

  const [crossfading, setCrossfading] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  /* Very slow random crossfade loop (independent per card) */
  React.useEffect(() => {
    if (!images.length) return;
    if (paused) return; // pause internal fade on hover
    const FADE_EVERY = 5000;     // time between image changes
    const FADE_DURATION = 4000;  // css fade duration should match

    const t = setTimeout(() => {
      setCrossfading(true);
      // after fade completes, commit next -> current
      const end = setTimeout(() => {
        setCurrentIdx(nextIdx);
        setNextIdx(nextRandomIndex(images.length, nextIdx));
        setCrossfading(false);
      }, FADE_DURATION);
      return () => clearTimeout(end);
    }, FADE_EVERY);

    return () => clearTimeout(t);
  }, [images.length, nextIdx, paused]);

  const currentSrc = images[currentIdx] ?? "";
  const nextSrc = images[nextIdx] ?? "";

  return (
    <article
      className="card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="img-frame">
        {/* Bottom layer (current) */}
        <img
          key={`bottom-${currentIdx}`}
          src={currentSrc}
          alt={`${title} current`}
          className={`layer bottom ${paused ? "paused" : ""}`}
        />
        {/* Top layer (next) — fades in when crossfading */}
        <img
          key={`top-${nextIdx}`}
          src={nextSrc}
          alt={`${title} next`}
          className={`layer top ${crossfading ? "show" : ""} ${paused ? "paused" : ""}`}
        />

        {/* Bluish/blur overlay + quote on hover */}
        <div className="hover-overlay">
          <p className="overlay-quote">“{quote}”</p>
        </div>
      </div>

      {/* label below image */}
      <div className="label">{title}</div>

      {/* tech badges */}
      <div className="tech">
        {tech.map((t, k) => (
          <span className="badge" key={k}>
            <i>{t.icon}</i>
            {t.label}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function CarouselSection() {
  // Memoize images array for all cards (we'll use the full set for each)
  const images = useMemo(() => safeImages, []);

  return (
    <section className="carousel-wrap">
      <div className="carousel-inner">
       <Swiper
  modules={[Autoplay, A11y]}
  loop
  speed={900}
  spaceBetween={24}
  slidesPerView={3}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
>
  {[...CARDS, ...CARDS, ...CARDS].map((c, i) => (
    <SwiperSlide key={i}>
      <CarouselCard {...c} images={images} />
    </SwiperSlide>
  ))}
</Swiper>


        {/* Global quote under the carousel */}
        <p className="global-quote">
          💭 “I believe great UI is not just pixels — it’s how people feel when they use a product.”
        </p>
      </div>
    </section>
  );
}
