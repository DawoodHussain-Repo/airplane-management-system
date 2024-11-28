import React, { useState } from "react";
import { Trash2, Edit } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Passenger", status: "Active", booking: "NYC123" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Crew", status: "Active", booking: "LON456" },
    { id: 3, name: "Mary Johnson", email: "mary.johnson@example.com", role: "Passenger", status: "Inactive", booking: "PAR789" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Passenger", status: "Active", booking: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Add a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Please fill in all required fields");
      return;
    }
    const newUserObj = { ...newUser, id: Date.now() };
    setUsers((prevUsers) => [...prevUsers, newUserObj]);
    resetForm();
  };

  // Edit an existing user
  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setNewUser(userToEdit);
    setIsEditing(true);
    setEditUserId(id);
  };

  // Save edited user
  const handleSaveEdit = () => {
    const updatedUsers = users.map((user) =>
      user.id === editUserId ? { ...user, ...newUser } : user
    );
    setUsers(updatedUsers);
    resetForm();
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Search users by name or email
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset the form
  const resetForm = () => {
    setNewUser({ name: "", email: "", role: "Passenger", status: "Active", booking: "" });
    setIsEditing(false);
    setEditUserId(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-700 min-h-[600px] text-white">
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* User Form Section */}
        <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit User" : "Add New User"}</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-3 border rounded-md text-black"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
            <select
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              className="w-full p-3 border rounded-md text-black"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              type="text"
              placeholder="Booking"
              value={newUser.booking}
              onChange={(e) => setNewUser({ ...newUser, booking: e.target.value })}
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
          <div className="overflow-x-auto max-h-[400px] mb-4">
            <input
              type="text"
              placeholder="Search Users"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 border rounded-md mb-4 text-black"
            />
            <table className="table-auto w-full border-collapse border border-gray-600">
              <thead className="sticky top-0 bg-gray-700 z-10">
                <tr className="bg-gray-700">
                  <th className="p-4 border border-gray-600 text-left">Name</th>
                  <th className="p-4 border border-gray-600 text-left">Email</th>
                  <th className="p-4 border border-gray-600 text-left">Role</th>
                  <th className="p-4 border border-gray-600 text-left">Status</th>
                  <th className="p-4 border border-gray-600 text-left">Booking</th>
                  <th className="p-4 border border-gray-600 text-center">Actions</th>
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
                    <tr key={user.id} className="hover:bg-gray-700">
                      <td className="p-4 border border-gray-600">{user.name}</td>
                      <td className="p-4 border border-gray-600">{user.email}</td>
                      <td className="p-4 border border-gray-600">{user.role}</td>
                      <td className="p-4 border border-gray-600">{user.status}</td>
                      <td className="p-4 border border-gray-600">{user.booking}</td>
                      <td className="p-4 border border-gray-600 text-center">
                        <button
                          onClick={() => handleEditUser(user.id)}
                          className="text-yellow-500 mx-2"
                        >
                          <Edit className="inline w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 mx-2"
                        >
                          <Trash2 className="inline w-5 h-5" />
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
