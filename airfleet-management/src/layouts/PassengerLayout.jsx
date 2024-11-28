import React from "react";
import PassengerNavbar from "../components/Passenger/PNavbar"; // Including the navbar
import { Outlet } from "react-router-dom"; // Used for nested routes
import planeImage from "../assets/images/plane.jpg";

const PassengerLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-y-auto overflow-x-hidden"> {/* Keep vertical scroll, remove horizontal scroll */}
      {/* Navbar */}
      <PassengerNavbar /> {/* Passenger Navbar */}

      {/* Main Content Area */}
      <div
        className="flex-1 p-6 flex justify-center items-center w-full z-10"
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

export default PassengerLayout;
