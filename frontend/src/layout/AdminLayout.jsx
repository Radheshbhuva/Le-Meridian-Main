import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Dashboard.css";
import {
  FaHotel, FaBed, FaUtensils, FaSpa,
  FaCalendarAlt, FaImages, FaTags, FaSignOutAlt
} from "react-icons/fa";

function AdminLayout({ logout }) {
  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-header">
          <h2>🏨 Admin Panel</h2>
          <p>Le Méridien</p>
        </div>

        <nav className="menu">
          <NavLink to="/admin" className="menu-link" end> <FaHotel /> Dashboard</NavLink>
          <NavLink to="/admin/bookings" className="menu-link"> <FaCalendarAlt /> Bookings</NavLink>
          <NavLink to="/admin/rooms" className="menu-link"> <FaBed /> Rooms</NavLink>
          <NavLink to="/admin/dining" className="menu-link"> <FaUtensils /> Dining</NavLink>
          <NavLink to="/admin/spa" className="menu-link"> <FaSpa /> Spa</NavLink>
          <NavLink to="/admin/events" className="menu-link"> <FaCalendarAlt /> Events</NavLink>
          <NavLink to="/admin/gallery" className="menu-link"> <FaImages /> Gallery</NavLink>
          <NavLink to="/admin/offers" className="menu-link"> <FaTags /> Offers</NavLink>
        </nav>

        {/* LOGOUT */}
        <div className="logout">
          <button className="logout-btn" onClick={() => {
            logout();
            window.location.href = '/login';
          }}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <div className="main">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;