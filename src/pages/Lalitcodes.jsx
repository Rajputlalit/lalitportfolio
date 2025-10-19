import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import myphoto from "../assets/png/png/Lalit.png";
import { FaLinkedin } from "react-icons/fa";
import "./Lalitcodes.css";

function Lalitcodes() {
  const [activeButton, setActiveButton] = useState(null); // Track clicked button
  const navigate = useNavigate();

const handleLinkedInClick = () => {
  setActiveButton("linkedin");
  window.open("https://www.linkedin.com/in/lalit-rajput-950220216", "_blank");
};

  const handleGithubClick = () => {
    setActiveButton("github");
    window.open("https://github.com/https://github.com/Rajputlalit", "_blank");
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
            <FaLinkedin size={22} style={{ marginRight: "8px", verticalAlign: "middle" }} />
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

      <div className="rightSide">
        <div className="image-wrapper">
          <img src={myphoto} alt="Lalit - ReactJS Developer" />
        </div>
      </div>
    </section>
  );
}

export default Lalitcodes;
