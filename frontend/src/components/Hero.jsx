// src/components/Hero.jsx

import React from "react";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <span className="hero-subtitle">WELCOME TO LUXURY</span>

        <h1>
          Discover <span className="highlight">Luxury</span> Reimagined
        </h1>

        <p>
          Experience the perfect blend of contemporary elegance
          and rich cultural heritage in the heart of Ahmedabad
        </p>

        <div className="hero-btns">
          <button className="btn btn-outline-light btn-large">
            Virtual Tour
          </button>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
}

export default Hero;