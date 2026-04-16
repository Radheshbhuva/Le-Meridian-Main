// src/components/Offers.jsx

import React from "react";

function Offers() {
  return (
    <section className="section offers-section">
      <div className="container">
        <div className="offers-content">
          
          <span className="offers-subtitle">Limited Time</span>
          <h2>Special Offers</h2>
          <p>Exclusive packages for the discerning traveler</p>

          <div className="offers-grid">

            {/* Offer 1 */}
            <div className="offer-card">
              <h4>Spa Escape Package</h4>
              <p>Includes 60-minute massage and breakfast</p>

              <span className="offer-price">
                From ₹12,999/night
              </span>

              <button className="btn btn-outline">
                Learn More
              </button>
            </div>

            {/* Offer 2 */}
            <div className="offer-card featured">
              <h4>Romantic Getaway</h4>
              <p>Dinner, champagne, and late checkout</p>

              <span className="offer-price">
                From ₹15,999/night
              </span>

              <button className="btn btn-primary">
                Book Now
              </button>
            </div>

            {/* Offer 3 */}
            <div className="offer-card">
              <h4>Business Package</h4>
              <p>Meeting room credit and express checkout</p>

              <span className="offer-price">
                From ₹10,999/night
              </span>

              <button className="btn btn-outline">
                Learn More
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Offers;