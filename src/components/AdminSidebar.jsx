import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <Link to="/admin/dashboard" className="logo">
          Admin Panel
        </Link>
      </div>

      <ul className="sidebar-links">
        <li>
          <Link to="/admin/crew-management">Crew Management</Link>
        </li>
        <li>
          <Link to="/admin/flight-schedule">Flight Schedule</Link>
        </li>
        <li>
          <Link to="/admin/user-management">User Management</Link>
        </li>
        <li>
          <Link to="/admin/notifications">Notifications</Link>
        </li>
        <li>
          <Link to="/admin/feedback">Feedback</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
