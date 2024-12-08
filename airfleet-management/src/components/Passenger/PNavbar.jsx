import React, { useState } from "react";
import { FaBars, FaTimes, FaUserAlt, FaBell, FaTicketAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AirFleet from "../../assets/images/AirFleet.png"; // Logo Image

const PassengerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white p-4 text-center mx-0 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src={AirFleet}
            alt="AirFleet Logo"
            className="w-8 h-8"
          />
          <NavLink to="/" className="text-2xl font-bold text-secondary">
            AirFleet
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 items-center">
          {[
            { label: "Dashboard", path: "/passenger/dashboard" },
            { label: "Booking", path: "/passenger/booking" },
            { label: "Seats", path: "/passenger/seat-selection" },
            { label: "Flight Information", path: "/passenger/flight-info" },
            { label: "History", path: "/passenger/history" },
            { label: "Airport", path: "/passenger/airport" },
            { label: "Tracking", path: "/passenger/tracking" },
          ].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className="nav-link text-black py-2 px-4 transition-all duration-300 ease-in-out hover:text-secondary"
                activeClassName="text-secondary underline"
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {/* Loyalty Link with Ticket Icon */}
          <li>
            <NavLink
              to="/passenger/loyalty"
              className="nav-link text-black py-2 px-4 flex items-center transition-all duration-300 ease-in-out hover:text-secondary"
              activeClassName="text-secondary underline"
            >
              <FaTicketAlt className="mr-2" />
              Loyalty
            </NavLink>
          </li>

          {/* User and Notifications Icons */}
          <li>
            <NavLink to="/passenger/profile">
              <FaUserAlt size={24} className="text-secondary" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/passenger/notifications">
              <FaBell size={24} className="text-secondary" />
            </NavLink>
          </li>

          {/* CTA Button */}
          <li>
            <NavLink
              to="/passenger/booking"
              className="bg-secondary text-white py-2 px-6 rounded-full transition-all duration-300 whitespace-nowrap hover:bg-gray-800 hover:text-white"
              activeClassName="bg-secondary-dark"
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
            >
              Book Flight
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Toggle Button */}
        <div
          className="lg:hidden flex items-center p-2 bg-white rounded-md border-none"
          onClick={toggleMenu}
        >
          <button className="text-secondary bg-white border-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 bg-white z-50 transition-all duration-300 ease-in-out transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } overflow-hidden w-full h-full`}
      >
        <div className="flex flex-col items-center justify-start space-y-6 pt-16">
          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <button className="text-secondary bg-white" onClick={toggleMenu}>
              <FaTimes size={30} />
            </button>
          </div>

          {/* Mobile Menu Links */}
          {[
            { label: "Dashboard", path: "/passenger/dashboard" },
            { label: "Booking", path: "/passenger/booking" },
            { label: "Seats", path: "/passenger/seat-selection" },
            { label: "Flight Information", path: "/passenger/flight-info" },
            { label: "History", path: "/passenger/history" },
            { label: "Airport", path: "/passenger/airport" },
            { label: "Tracking", path: "/passenger/tracking" },
          ].map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="text-black py-3 px-6 w-full text-center transition-all duration-300 ease-in-out"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setMenuOpen(false)}
              activeClassName="text-secondary underline"
            >
              {item.label}
            </NavLink>
          ))}

          {/* Loyalty Link with Icon */}
          <NavLink
            to="/passenger/loyalty"
            className="text-black py-3 px-6 w-full flex items-center justify-center transition-all duration-300 ease-in-out hover:text-secondary"
            onClick={() => setMenuOpen(false)}
            activeClassName="text-secondary underline"
          >
            <FaTicketAlt className="mr-2" />
            Loyalty
          </NavLink>

        

          {/* CTA Button in Mobile Menu */}
          <NavLink
            to="/passenger/booking"
            className="bg-secondary text-white py-2 px-6 rounded-full transition-all duration-300 whitespace-nowrap hover:bg-gray-800 hover:text-white"
            activeClassName="bg-secondary-dark"
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            Book Flight
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default PassengerNavbar;
