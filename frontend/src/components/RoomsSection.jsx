// src/components/RoomsSection.jsx

import React from "react";

function RoomsSection() {
  return (
    <section className="section rooms-showcase">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">ACCOMMODATIONS</span>
          <h2>
            Luxurious <span className="highlight">Rooms & Suites</span>
          </h2>
          <p>Elegantly appointed spaces designed for your ultimate comfort</p>
        </div>

        <div className="rooms-grid">
          
          {/* Deluxe Room */}
          <div className="room-card">
            <div className="room-img">
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Deluxe Room"
              />
              <div className="room-badge">Best Seller</div>
            </div>

            <div className="room-content">
              <h3>Deluxe Room</h3>

              <div className="room-features">
                <span className="room-feature">🛏️ King Bed</span>
                <span className="room-feature">🚿 Rain Shower</span>
                <span className="room-feature">📺 55" TV</span>
              </div>

              <div className="room-price">
                <span className="price">
                  ₹8,999<span>/night</span>
                </span>

                <button className="btn btn-outline btn-small">
                  View Room
                </button>
              </div>
            </div>
          </div>

          {/* Executive Suite */}
          <div className="room-card">
            <div className="room-img">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Executive Suite"
              />
              <div className="room-badge">Premium</div>
            </div>

            <div className="room-content">
              <h3>Executive Suite</h3>

              <div className="room-features">
                <span className="room-feature">🛏️ King Bed</span>
                <span className="room-feature">🛋️ Living Area</span>
                <span className="room-feature">🏊 Pool Access</span>
              </div>

              <div className="room-price">
                <span className="price">
                  ₹15,999<span>/night</span>
                </span>

                <button className="btn btn-outline btn-small">
                  View Room
                </button>
              </div>
            </div>
          </div>

          {/* Presidential Suite */}
          <div className="room-card">
            <div className="room-img">
              <img
                src="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Presidential Suite"
              />
              <div className="room-badge">Ultra Luxury</div>
            </div>

            <div className="room-content">
              <h3>Presidential Suite</h3>

              <div className="room-features">
                <span className="room-feature">🛏️ Super King</span>
                <span className="room-feature">🍽️ Dining Area</span>
                <span className="room-feature">🛁 Jacuzzi</span>
              </div>

              <div className="room-price">
                <span className="price">
                  ₹35,999<span>/night</span>
                </span>

                <button className="btn btn-outline btn-small">
                  View Room
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="section-footer">
          <button className="btn btn-outline">
            View All Rooms
          </button>
        </div>
      </div>
    </section>
  );
}

export default RoomsSection;