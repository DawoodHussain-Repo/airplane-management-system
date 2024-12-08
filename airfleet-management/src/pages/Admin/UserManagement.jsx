import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    role: "Passenger",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactDetails: { phone: "", emergencyContact: "" },
    status: "Active",
    booking: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_BASE_URL = "http://localhost:5000/api/users"; // Update as needed

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Add a new user
  const handleAddUser = async () => {
    if (!newUser.firstName || !newUser.email || !newUser.password) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post(API_BASE_URL, newUser);
      setUsers((prevUsers) => [...prevUsers, response.data.user]);
      resetForm();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Edit an existing user
  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    setNewUser(userToEdit);
    setIsEditing(true);
    setEditUserId(id);
  };

  // Save edited user
  const handleSaveEdit = async () => {
    try {
      // Send updated data to the backend
      const response = await axios.put(`${API_BASE_URL}/${editUserId}`, newUser);
  
      // Update the state with the updated user data
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editUserId ? response.data : user
        )
      );
  
      // Reset the form after saving
      resetForm();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Search users by name or email
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset the form
  const resetForm = () => {
    setNewUser({
      role: "Passenger",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      contactDetails: { phone: "", emergencyContact: "" },
      status: "Active",
      booking: "",
    });
    setIsEditing(false);
    setEditUserId(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-700 min-h-[600px] text-white">
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* User Form Section */}
        <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? "Edit User" : "Add New User"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              className="w-full p-3 border rounded-md text-black"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              className="w-full p-3 border rounded-md text-black"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full p-3 border rounded-md text-black"
            />
            {!isEditing && (
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="w-full p-3 border rounded-md text-black"
              />
            )}
            <input
              type="text"
              placeholder="Phone"
              value={newUser.contactDetails.phone}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  contactDetails: {
                    ...newUser.contactDetails,
                    phone: e.target.value,
                  },
                })
              }
              className="w-full p-3 border rounded-md text-black"
            />
            <input
              type="text"
              placeholder="Emergency Contact"
              value={newUser.contactDetails.emergencyContact}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  contactDetails: {
                    ...newUser.contactDetails,
                    emergencyContact: e.target.value,
                  },
                })
              }
              className="w-full p-3 border rounded-md text-black"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-3 border rounded-md text-black"
            >
              <option value="Passenger">Passenger</option>
              <option value="Crew">Crew</option>
            </select>
            <input
              type="text"
              placeholder="Booking"
              value={newUser.booking}
              onChange={(e) =>
                setNewUser({ ...newUser, booking: e.target.value })
              }
              className="w-full p-3 border rounded-md text-black"
            />
            <button
              onClick={isEditing ? handleSaveEdit : handleAddUser}
              className="w-full bg-yellow-500 py-3 rounded-md hover:bg-yellow-600 transition-colors"
            >
              {isEditing ? "Save Changes" : "Add User"}
            </button>
          </div>
        </div>

        {/* User List Table Section */}
        <div className="w-full md:w-2/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <input
            type="text"
            placeholder="Search Users"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 border rounded-md mb-4 text-black"
          />
          <div className="overflow-x-auto max-h-[400px]">
            <table className="table-auto w-full border-collapse border border-gray-600">
              <thead className="sticky top-0 bg-gray-700 z-10">
                <tr>
                  <th className="p-4 border border-gray-600 text-left">
                    First Name
                  </th>
                  <th className="p-4 border border-gray-600 text-left">
                    Last Name
                  </th>
                  <th className="p-4 border border-gray-600 text-left">Email</th>
                  <th className="p-4 border border-gray-600 text-left">
                    Role
                  </th>
                  <th className="p-4 border border-gray-600 text-left">
                    Booking
                  </th>
                  <th className="p-4 border border-gray-600 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-700">
                      <td className="p-4 border border-gray-600">
                        {user.firstName}
                      </td>
                      <td className="p-4 border border-gray-600">
                        {user.lastName}
                      </td>
                      <td className="p-4 border border-gray-600">
                        {user.email}
                      </td>
                      <td className="p-4 border border-gray-600">
                        {user.role}
                      </td>
                      <td className="p-4 border border-gray-600">
                        {user.booking}
                      </td>
                      <td className="p-4 border border-gray-600 flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleEditUser(user._id)}
                          className="bg-yellow-500 p-2 rounded-md hover:bg-yellow-600 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-500 p-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
