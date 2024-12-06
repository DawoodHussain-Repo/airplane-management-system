import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    availability: {
      monday: { start: "", end: "" },
      tuesday: { start: "", end: "" },
      wednesday: { start: "", end: "" },
      thursday: { start: "", end: "" },
      friday: { start: "", end: "" },
      saturday: { start: "", end: "" },
      sunday: { start: "", end: "" },
    },
  });

  const [loading, setLoading] = useState(false);

  // Fetch existing profile data dynamically based on logged-in crew email
  const fetchProfile = async (crewEmail) => {
    try {
      const response = await fetch(`http://localhost:5000/api/crew/getProfile/${crewEmail}`);
      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }
      const data = await response.json();
      setUserData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        availability: data.availability,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    const crewEmail = localStorage.getItem("crewEmail"); // Get crew email from localStorage
    if (crewEmail) {
      fetchProfile(crewEmail); // Fetch profile using the email from localStorage
    } else {
      console.error("No crew email found in localStorage.");
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("availability")) {
      const [_, day, time] = name.split("-");
      setUserData((prevData) => ({
        ...prevData,
        availability: {
          ...prevData.availability,
          [day]: {
            ...prevData.availability[day],
            [time]: value,
          },
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/crew/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: data.message,
        showConfirmButton: false,
        timer: 2000,
      });
      // Refresh the profile data to reflect changes
      fetchProfile(userData.email);
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "An error occurred while updating your profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Profile Update</h2>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring focus:ring-yellow-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring focus:ring-yellow-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userData.phone}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring focus:ring-yellow-500"
          />
          <h4 className="text-lg font-semibold mb-2">Emergency Contact</h4>
          <input
            type="text"
            name="emergencyContactName"
            placeholder="Emergency Contact Name"
            value={userData.emergencyContactName}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring focus:ring-yellow-500"
          />
          <input
            type="tel"
            name="emergencyContactPhone"
            placeholder="Emergency Contact Phone"
            value={userData.emergencyContactPhone}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring focus:ring-yellow-500"
          />
        </div>

        {/* Availability Settings */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Modify Availability</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(userData.availability).map((day) => (
              <div key={day}>
                <label className="block text-gray-300">{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                <div className="flex space-x-4">
                  <input
                    type="time"
                    name={`availability-${day}-start`}
                    value={userData.availability[day].start}
                    onChange={handleInputChange}
                    className="w-1/2 p-3 bg-gray-700 rounded-lg text-white border border-gray-600"
                  />
                  <input
                    type="time"
                    name={`availability-${day}-end`}
                    value={userData.availability[day].end}
                    onChange={handleInputChange}
                    className="w-1/2 p-3 bg-gray-700 rounded-lg text-white border border-gray-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
