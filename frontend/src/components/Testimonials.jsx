// src/components/Testimonials.jsx

import React from "react";

function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">TESTIMONIALS</span>
          <h2>
            What Our <span className="highlight">Guests Say</span>
          </h2>
        </div>

        <div className="testimonials-grid">
          
          {/* Testimonial 1 */}
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>

            <p className="testimonial-text">
              "Exceptional service and luxurious accommodations. The staff
              went above and beyond to make our anniversary special."
            </p>

            <div className="testimonial-author">
              <div className="author-avatar">RK</div>

              <div className="author-info">
                <h4>Rajesh Kumar</h4>
                <span>Business Traveler</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-card featured">
            <div className="testimonial-rating">★★★★★</div>

            <p className="testimonial-text">
              "The perfect blend of modern luxury and traditional hospitality.
              The spa treatments were absolutely divine."
            </p>

            <div className="testimonial-author">
              <div className="author-avatar">SP</div>

              <div className="author-info">
                <h4>Sarah Patel</h4>
                <span>Vacationer</span>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>

            <p className="testimonial-text">
              "Outstanding conference facilities and impeccable service. Will
              definitely return for our next corporate event."
            </p>

            <div className="testimonial-author">
              <div className="author-avatar">AM</div>

              <div className="author-info">
                <h4>Arjun Mehta</h4>
                <span>Corporate Client</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;