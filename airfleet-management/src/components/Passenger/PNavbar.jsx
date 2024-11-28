import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Navbar.css'; // Assuming you have styles defined in this CSS file

const PassengerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">✈ AirFleet</Link>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {/* Links to different routes */}
        <li><Link to="/passenger/authentication" className="nav-link">Authentication</Link></li>
        <li><Link to="/passenger/dashboard" className="nav-link">Dashboard</Link></li>
        <li><Link to="/passenger/booking" className="nav-link">Booking</Link></li>
        <li><Link to="/passenger/seat-selection" className="nav-link">Seats</Link></li>
        <li><Link to="/passenger/flight-info" className="nav-link">Flight Information</Link></li>
        <li><Link to="/passenger/history" className="nav-link">History</Link></li>
        <li><Link to="/passenger/profile" className="nav-link">Profile</Link></li>
        <li><Link to="/passenger/loyalty" className="nav-link">Loyalty</Link></li>
        <li><Link to="/passenger/airport" className="nav-link">Airport</Link></li>
        <li><Link to="/passenger/tracking" className="nav-link">Tracking</Link></li>

        {/* Book Flight Button */}
        <li className="cta-button">
          <Link to="/passenger/booking" className="btn btn-book-flight">Book Flight</Link>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="navbar-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
    </nav>
  );
};

export default PassengerNavbar;
