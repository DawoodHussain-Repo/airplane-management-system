import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaPlane, FaClipboardList, FaBell, FaCog, FaComments, FaMapMarkerAlt } from 'react-icons/fa'; // Font Awesome icons

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex h-screen ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300`}>
      {/* Sidebar */}
      <div className={`w-64 h-screen bg-[#2c3e50] text-white p-6 fixed top-0 left-0 ${isSidebarOpen ? '' : 'hidden'} md:block`}>
        
        {/* Logo and Admin Panel Link */}
        <div className="text-center text-3xl font-bold mb-6 text-[#fdfd96]">
          <Link to="/admin/dashboard" className="text-white no-underline">
            <FaHome className="inline-block mb-2" />
            Admin Panel
          </Link>
        </div>

        {/* Back to Home Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center text-lg px-4 py-3 hover:bg-[#34495e] rounded transition-colors duration-300 space-x-3"
          >
            <FaHome />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center text-lg px-4 py-3 hover:bg-[#34495e] rounded transition-colors duration-300 space-x-3"
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/crew-management"
              className="flex items-center text-lg px-4 py-3 hover:bg-[#34495e] rounded transition-colors duration-300 space-x-3"
            >
              <FaUsers />
              <span>Crew Management</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/flight-schedule"
              className="flex items-center text-lg px-4 py-3 hover:bg-[#34495e] rounded transition-colors duration-300 space-x-3"
            >
              <FaPlane />
              <span>Flight Schedule</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/user-management"
              className="flex items-center text-lg px-4 py-3 hover:bg-[#34495e] rounded transition-colors duration-300 space-x-3"
            >
              <FaUsers />
              <span>User Management</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/notifications"
              className="flex items-center text-lg px-4 py-3 hover:bg-[#34495e] rounded transition-colors duration-300 space-x-3"
            >
              <FaBell />
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/feedback"
              className="flex items-center text-lg px-4 py-3 hover:bg-[#34495e] rounded transition-colors duration-300 space-x-3"
            >
              <FaComments />
              <span>Feedback</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/tracking"
              className="flex items-center text-lg px-4 py-3 hover:bg-[#34495e] rounded transition-colors duration-300 space-x-3"
            >
              <FaMapMarkerAlt />
              <span>Tracking</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#2c3e50] text-white p-3 rounded-full shadow-lg"
      >
        <FaHome className="text-xl" />
      </button>
    </div>
  );
};

export default AdminSidebar;
