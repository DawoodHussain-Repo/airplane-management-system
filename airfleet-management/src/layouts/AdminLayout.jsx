import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom"; // Used for nested routes
import planeImage from "../assets/images/plane.jpg";

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Background with Image */}
      <div
        className="absolute inset-0 bg-black opacity-40 z-0"
      ></div>

      {/* Sidebar and Content */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div
  className="flex-1 p-6 flex justify-center items-center w-full z-10" // Added z-10 here to ensure the content is clickable
  style={{
    backgroundColor: "#fdfd96", // Yellowish fallback
    backgroundImage: `url(${planeImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <Outlet />
</div>

    </div>
  );
};

export default AdminLayout;
