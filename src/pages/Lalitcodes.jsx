import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import "./Lalitcodes.css";

// ✅ Import all images dynamically from a folder
const imageImports = import.meta.glob("../assets/pics/*.{png,jpg,jpeg}", {
  eager: true,
});
const slideshowImages = Object.values(imageImports).map((img) => img.default);

function Lalitcodes() {
  const [activeButton, setActiveButton] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // slideshow index
  const navigate = useNavigate();

  // ✅ Slideshow auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkedInClick = () => {
    setActiveButton("linkedin");
    window.open("https://www.linkedin.com/in/lalit-rajput-950220216", "_blank");
  };

  const handleGithubClick = () => {
    setActiveButton("github");
    window.open("https://github.com/Rajputlalit", "_blank");
  };

  const handleProjectsClick = () => {
    setActiveButton("projects");
    navigate("/projects");
  };

  return (
    <section className="Landing">
      <div className="leftSide">
        <p>
          Hey I'm <strong>Lalit</strong>{" "}
          <span className="waving-hand">&#128075;</span>
        </p>
        <h2>
          <span>Front</span>end Developer
        </h2>
        <p>
          I'm a frontend developer based in Hisar. I'll help you build beautiful
          websites your users will love.
        </p>

        {/* ✅ BUTTONS SECTION */}
        <div className="button-group">
          <button
            className={activeButton === "linkedin" ? "active" : ""}
            onClick={handleLinkedInClick}
          >
            <FaLinkedin
              size={22}
              style={{ marginRight: "8px", verticalAlign: "middle" }}
            />
            LinkedIn
          </button>
          <button
            className={activeButton === "github" ? "active" : ""}
            onClick={handleGithubClick}
          >
            💻 GitHub
          </button>
          <button
            className={activeButton === "projects" ? "active" : ""}
            onClick={handleProjectsClick}
          >
            🚀 Browse Projects
          </button>
        </div>
      </div>

      {/* ✅ Slideshow goes here */}
      <div className="rightSide">
        <div className="slideshow">
          {slideshowImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={index === currentIndex ? "slide active" : "slide"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Lalitcodes;
