import React, { useState } from "react";

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    seatPreference: "",
    mealPreference: "",
  });

  const [message, setMessage] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here if necessary
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Update Your Profile</h2>
        
        {message && (
          <div className="mb-6 text-green-500 font-semibold">
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <div className="space-y-4 mt-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-xl font-semibold">Emergency Contact</h3>
            <div className="space-y-4 mt-4">
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                placeholder="Emergency Contact Name"
                className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                placeholder="Emergency Contact Phone"
                className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Travel Preferences */}
          <div>
            <h3 className="text-xl font-semibold">Travel Preferences</h3>
            <div className="space-y-4 mt-4">
              <select
                name="seatPreference"
                value={formData.seatPreference}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select Seat Preference</option>
                <option value="Window">Window</option>
                <option value="Aisle">Aisle</option>
                <option value="Middle">Middle</option>
              </select>
              <select
                name="mealPreference"
                value={formData.mealPreference}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select Meal Preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-yellow-500 py-3 px-6 rounded-lg text-white hover:bg-yellow-600 font-semibold w-full"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
