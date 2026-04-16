// src/components/Newsletter.jsx

import React from "react";

function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          
          <h3>Subscribe to Our Newsletter</h3>
          <p>Receive exclusive offers and updates</p>

          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
            />

            <button
              type="submit"
              className="btn btn-primary"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}

export default Newsletter;