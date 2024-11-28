import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Navbar.css'; // Updated styles for gray theme

const CrewNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">✈ AirFleet</Link>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {/* Links to Crew Member routes */}
        <li><Link to="/crew/authentication" className="nav-link">Authentication</Link></li>
        <li><Link to="/crew/dashboard" className="nav-link">Dashboard</Link></li>
        <li><Link to="/crew/assigned-flights" className="nav-link">Assigned Flights</Link></li>
        <li><Link to="/crew/flight-withdrawal" className="nav-link">Withdrawal Requests</Link></li>
        <li><Link to="/crew/flight-status" className="nav-link">Flight Status</Link></li>
        <li><Link to="/crew/profile" className="nav-link">Profile</Link></li>
        <li><Link to="/crew/notifications" className="nav-link">Notifications</Link></li>
        <li><Link to="/crew/tracking" className="nav-link">Tracking Panel</Link></li>

        {/* CTA Button */}
        <li className="cta-button">
  <Link to="/crew/assigned-flights" className="btn">
    View Flights
  </Link>
</li>

      </ul>

      {/* Mobile Menu Toggle */}
      <div className="navbar-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
    </nav>
  );
};

export default CrewNavbar;
