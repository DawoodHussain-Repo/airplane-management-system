import React, { useState, useEffect } from "react";
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
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-white text-white  p-0">
   {/* Main Content */}
   <div className="flex items-center justify-between px-6 py-4 bg-secondary">
        <h1 className="text-xl font-bold">Airline Management</h1>
      
      </div>
      <div className="flex-1 p-4 sm:p-6 space-y-6 w-full overflow-hidden">
        {/* Airline Management Banner */}
   

        {/* Overview Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Active Flights */}
          <div className="bg-secondary bg-opacity-80 p-4 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-center h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">Active Flights</h2>
            <div className="bg-white text-black p-4 rounded-full flex justify-center items-center shadow-lg w-24 h-24 sm:w-28 sm:h-28 transform transition-all duration-300 hover:scale-105">
              <p className="text-3xl sm:text-4xl font-bold text-green-500">{stats.activeFlights}</p>
            </div>
          </div>

          {/* Total Passengers */}
          <div className="bg-secondary bg-opacity-80 p-4 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-center h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">Total Passengers</h2>
            <div className="bg-white text-black p-4 rounded-full flex justify-center items-center shadow-lg w-24 h-24 sm:w-28 sm:h-28 transform transition-all duration-300 hover:scale-105">
              <p className="text-3xl sm:text-4xl font-bold text-blue-500">{stats.totalPassengers}</p>
            </div>
          </div>

          {/* Pending Crew Requests */}
          <div className="bg-secondary bg-opacity-80 p-4 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-center h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">Pending Crew Requests</h2>
            <div className="bg-white text-black p-4 rounded-full flex justify-center items-center shadow-lg w-24 h-24 sm:w-28 sm:h-28 transform transition-all duration-300 hover:scale-105">
              <p className="text-3xl sm:text-4xl font-bold text-red-500">{stats.pendingCrewRequests}</p>
            </div>
          </div>

          {/* Total Flights */}
          <div className="bg-secondary bg-opacity-80 p-4 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-center h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">Total Flights</h2>
            <div className="bg-white text-black p-4 rounded-full flex justify-center items-center shadow-lg w-24 h-24 sm:w-28 sm:h-28 transform transition-all duration-300 hover:scale-105">
              <p className="text-3xl sm:text-4xl font-bold text-purple-500">{stats.totalFlights}</p>
            </div>
          </div>

          {/* On-Time Flights */}
          <div className="bg-secondary bg-opacity-80 p-4 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-center h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">On-Time Flights</h2>
            <div className="bg-white text-black p-4 rounded-full flex justify-center items-center shadow-lg w-24 h-24 sm:w-28 sm:h-28 transform transition-all duration-300 hover:scale-105">
              <p className="text-3xl sm:text-4xl font-bold text-teal-500">{stats.onTimeFlights}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
