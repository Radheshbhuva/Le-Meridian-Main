// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Le Méridien Ahmedabad</h3>
            <p>Luxury redefined in the heart of Gujarat's cultural capital.</p>
            <div className="footer-social">
              < Link to ="#" aria-label="Facebook">📘</Link>
              < Link to ="#" aria-label="Instagram">📷</Link>
              < Link to ="#" aria-label="Twitter">🐦</Link>
              < Link to ="#" aria-label="LinkedIn">💼</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/rooms">Rooms & Suites</Link></li>
              <li><Link to="/dining">Dining</Link></li>
              <li><Link to="/spa">Spa</Link></li>
              <li><Link to="/events">Meetings & Events</Link></li>
              <li><Link to="/offers">Offers</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>📍 Ahmedabad, Gujarat 380015</li>
              <li>📞 +91 79 1234 5678</li>
              <li>✉️ reservations@lemeridien-ahd.com</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Download App</h4>
            <p>Get exclusive mobile-only offers</p>
            <div className="app-buttons">
              <button className="app-button">App Store</button>
              <button className="app-button">Google Play</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Le Méridien Ahmedabad. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;