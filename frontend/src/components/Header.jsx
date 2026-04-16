import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header({
  user,
  setShowLoginModal,
  setShowSignupModal,
  logout
}) {
  /* ---------- LOCAL UI STATE (HEADER ONLY) ---------- */
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className={showMobileMenu ? "menu-open" : ""}>
      <div className="container">
        <div className="header-top">

          {/* LOGO (FIXED: using NavLink instead of <a>) */}
          <NavLink className="logo" to="/">
            <span className="logo-icon">✦</span>
            Le Méridien <span className="logo-location">Ahmedabad</span>
          </NavLink>

          {/* MOBILE MENU BUTTON */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* NAVIGATION (Hidden for admins to separate experience) */}
          {user?.role !== "admin" && (
            <ul className={`nav-main ${showMobileMenu ? "active" : ""}`}>
              <li><NavLink to="/rooms">Rooms & Suites</NavLink></li>
              <li><NavLink to="/dining">Dining</NavLink></li>
              <li><NavLink to="/spa">Spa</NavLink></li>
              <li><NavLink to="/events">Meetings & Events</NavLink></li>
              <li><NavLink to="/gallery">Gallery</NavLink></li>
              <li><NavLink to="/offers">Offers</NavLink></li>
            </ul>
          )}

          {/* HEADER ACTIONS */}
          <div className="header-actions">

            {user ? (
              <div className="auth-status">

                <button
                  className="user-menu-btn"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>

                  <span className="user-name">
                    {user.name || user.email}
                  </span>

                  <span className="dropdown-arrow">▼</span>
                </button>

                {showProfileMenu && (
                  <div className="profile-dropdown">

                    <div className="profile-header">
                      <div className="profile-avatar-large">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>

                      <div className="profile-info">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>

                    <div className="profile-stats">
                      <div className="stat-item">
                        <span className="stat-label">Member Since</span>
                        <span className="stat-value">
                          {user.memberSince || "2026"}
                        </span>
                      </div>

                      <div className="stat-item">
                        <span className="stat-label">Loyalty Tier</span>
                        <span className="stat-value">
                          {user.tier || "Bronze"}
                        </span>
                      </div>

                      <div className="stat-item">
                        <span className="stat-label">Points</span>
                        <span className="stat-value">
                          {user.loyaltyPoints || "0"}
                        </span>
                      </div>
                    </div>

                    <ul className="profile-menu">

                      <li>
                        <NavLink to={user?.role === 'admin' ? '/admin' : '/dashboard'}>
                          <span className="menu-icon">📊</span>
                          {user?.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                        </NavLink>
                      </li>

                      {user?.role !== "admin" && (
                        <li>
                          <NavLink to="/bookings">
                            <span className="menu-icon">📅</span>
                            My Bookings
                          </NavLink>
                        </li>
                      )}

                      <li>
                        <NavLink to="/rewards">
                          <span className="menu-icon">🏆</span>
                          Rewards
                        </NavLink>
                      </li>

                      <li className="divider"></li>

                      <li>
                        <button onClick={logout} className="logout-btn">
                          <span className="menu-icon">🚪</span>
                          Sign Out
                        </button>
                      </li>

                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  className="btn btn-outline"
                  onClick={() => setShowLoginModal(true)}
                >
                  Sign In
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => setShowSignupModal(true)}
                >
                  Join Now
                </button>
              </>
            )}

            {/* FIXED: React Router navigation instead of window.location */}
            <NavLink to="/book" className="btn btn-primary">
              Book Now
            </NavLink>

          </div>
        </div>
      </div>
    </header>
  );
}