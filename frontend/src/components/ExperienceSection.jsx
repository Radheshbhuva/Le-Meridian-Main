// src/components/ExperienceSection.jsx

import React from "react";

function ExperienceSection() {
  return (
    <section className="section experience-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">EXPERIENCE</span>
          <h2>
            The Le Méridien <span className="highlight">Experience</span>
          </h2>
          <p>Discover what makes our brand unique and unforgettable</p>
        </div>

        <div className="experience-grid">
          <div className="experience-card">
            <div className="exp-img">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Lobby"
              />
              <div className="exp-overlay">
                <span className="exp-category">Signature</span>
              </div>
            </div>

            <div className="exp-content">
              <h3>Transformative Lobby</h3>
              <p>
                Experience our curated lobby environment where art, music, and
                aroma create an unforgettable arrival.
              </p>

              <button className="read-more">Click</button>
            </div>
          </div>

          <div className="experience-card featured">
            <div className="exp-img">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Restaurant"
              />
              <div className="exp-overlay">
                <span className="exp-category">Culinary</span>
              </div>
            </div>

            <div className="exp-content">
              <h3>Curated Culinary Journey</h3>
              <p>
                Italian classics meet authentic Gujarati cuisine in our
                signature restaurants.
              </p>

              <button className="read-more btn-link">
                Explore Dining <span className="arrow">→</span>
              </button>
            </div>
          </div>

          <div className="experience-card">
            <div className="exp-img">
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Spa"
              />
              <div className="exp-overlay">
                <span className="exp-category">Wellness</span>
              </div>
            </div>

            <div className="exp-content">
              <h3>Explore Spa</h3>
              <p>
                Holistic wellness treatments inspired by ancient traditions and
                modern techniques.
              </p>

              <button className="read-more btn-link">
                View Treatments <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;