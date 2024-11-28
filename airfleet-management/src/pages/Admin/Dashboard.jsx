import React, { useState } from "react";
import { FaHome } from "react-icons/fa";

const Dashboard = () => {
  // State to toggle sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Mock statistics (replace with real data from an API or database)
  const stats = {
    activeFlights: 12,
    totalPassengers: 1250,
    pendingCrewRequests: 8,
    totalFlights: 50,
    onTimeFlights: 45,
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
        {/* Add additional sidebar content here */}
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
