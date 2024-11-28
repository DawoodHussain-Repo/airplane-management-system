import React, { useState } from "react";

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

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("availability")) {
      const [day, time] = name.split("-");
      setUserData({
        ...userData,
        availability: {
          ...userData.availability,
          [day]: {
            ...userData.availability[day],
            [time]: value,
          },
        },
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
    // You can implement the API call to save updated data here.
    // For example: fetch('/api/updateProfile', { method: 'POST', body: JSON.stringify(userData) });
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
            className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Update Profile
          </button>
        </div>
      </form>

      {/* Display Success Message */}
      {message && (
        <div className="mt-6 text-center text-green-400">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
