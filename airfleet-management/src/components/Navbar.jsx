import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">AirFleet.com</a>
      </div>

      {/* Main Navigation */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/admin/crew-management">Crew Management</a></li>
        <li><a href="/admin/flight-schedule">Flight Schedule</a></li>
        <li><a href="/admin/user-management">User Management</a></li>
        <li><a href="/admin/notifications">Notifications</a></li>
        <li><a href="/admin/feedback">Feedback</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="navbar-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Admin Button */}
      <button className="admin-button">
        <a href="/admin-dashboard">Admin</a>
      </button>
    </nav>
  );
};

export default Navbar;
