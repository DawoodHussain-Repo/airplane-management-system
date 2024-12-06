import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';  // For redirection after failed auth

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeFlights: 0,
    totalPassengers: 0,
    pendingCrewRequests: 0,
    totalFlights: 0,
    onTimeFlights: 0,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  // Fetch data for the dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get the token from localStorage (or sessionStorage)
        const token = localStorage.getItem("token");

        if (!token) {
          // If there's no token, redirect the user to the login page
          navigate("/login");
          return;
        }

        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach token in the header
          }
        });

        if (response.status === 401 || response.status === 403) {
          // If the response status is Unauthorized or Forbidden, redirect to login
          navigate("/login");
        }

        const data = await response.json();
        if (data && data.data) {
          setStats(data.data); // Set the stats from the API response
        } else {
          console.error("No data received");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // If an error occurs, handle it by redirecting to the login page
        navigate("/login");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-[600px] bg-gradient-to-br from-gray-900 to-gray-700 text-white flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-64 bg-gray-800 p-6 space-y-8`}
      >
        <h1 className="text-2xl font-bold">Airline Management</h1>
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
        >
          <FaHome />
          Home
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-8 w-full">
        <div className="flex justify-between items-center mb-6">
          {/* Home logo button for mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
          >
            <FaHome />
            Home
          </button>
        </div>

        {/* Overview Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">Active Flights</h2>
            <p className="text-3xl font-bold text-green-500">{stats.activeFlights}</p>
          </div>

          <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">Total Passengers</h2>
            <p className="text-3xl font-bold text-blue-500">{stats.totalPassengers}</p>
          </div>

          <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">Pending Crew Requests</h2>
            <p className="text-3xl font-bold text-red-500">{stats.pendingCrewRequests}</p>
          </div>

          <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">Total Flights</h2>
            <p className="text-3xl font-bold text-purple-500">{stats.totalFlights}</p>
          </div>

          <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">On-Time Flights</h2>
            <p className="text-3xl font-bold text-teal-500">{stats.onTimeFlights}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
