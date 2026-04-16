// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

function Navbar({
  user,
  setShowLoginModal,
  setShowSignupModal,
  logout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        
        {/* LOGO */}
        <Link to="/" className={styles.logo}>
          Le Méridien Ahmedabad
        </Link>

        {/* NAV LINKS */}
        <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/dining">Dining</Link>
          <Link to="/spa">Spa</Link>
          <Link to="/events">Events</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/offers">Offers</Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className={styles.actions}>
          
          <Link to="/book" className={styles.bookBtn}>
            Book Now
          </Link>

          {!user ? (
            <>
              <button
                className={styles.signIn}
                onClick={() => setShowLoginModal(true)}
              >
                Sign In
              </button>

              <button
                className={styles.signIn}
                onClick={() => setShowSignupModal(true)}
              >
                Join Now
              </button>
            </>
          ) : (
            <div className={styles.userMenu}>
              <span className={styles.userName}>
                {user.name}
              </span>

              <button onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;