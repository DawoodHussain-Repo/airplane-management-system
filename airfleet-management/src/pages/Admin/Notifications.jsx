import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    message: "",
    type: "Important",
    _id: "",
  });
  const [alertSettings, setAlertSettings] = useState({ enableNotifications: true });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const apiUrl = "http://localhost:5000/api/notifications";
  const usersApiUrl = "http://localhost:5000/api/users";

  // Fetch users to populate the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(usersApiUrl);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch notifications for the selected user
  useEffect(() => {
    if (selectedUserId) {
      const fetchNotifications = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${apiUrl}/${selectedUserId}`);
          setNotifications(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching notifications", error);
          setLoading(false);
        }
      };

      fetchNotifications();
    }
  }, [selectedUserId]);

  // Handle notification creation or editing
  const handleSendNotification = async () => {
    if (!selectedUserId) {
      alert("Please select a user.");
      return;
    }

    if (!newNotification.message) {
      alert("Please enter a notification message.");
      return;
    }

    try {
      if (newNotification._id) {
        // Update the existing notification
        const response = await axios.put(`${apiUrl}/${newNotification._id}`, {
          userId: selectedUserId,
          message: newNotification.message,
          type: newNotification.type,
        });
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === newNotification._id ? response.data.notification : notification
          )
        );
      } else {
        // Create a new notification
        const response = await axios.post(apiUrl, {
          userId: selectedUserId,
          message: newNotification.message,
          type: newNotification.type,
        });
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          response.data.notification,
        ]);
      }
      setNewNotification({ message: "", type: "Important", _id: "" });
    } catch (error) {
      console.error("Error sending notification", error);
    }
  };

  // Handle editing a notification
  const handleEditNotification = (notificationId) => {
    const notificationToEdit = notifications.find(
      (notification) => notification._id === notificationId
    );
    if (notificationToEdit) {
      setNewNotification({ ...notificationToEdit });
    }
  };

  // Handle notification deletion
  const handleDeleteNotification = async (notificationId) => {
    try {
      await axios.delete(`${apiUrl}/${notificationId}`);
      setNotifications(notifications.filter((notification) => notification._id !== notificationId));
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  // Handle changes in notification settings (turning notifications on/off)
  const handleAlertSettingsChange = (e) => {
    const { name, checked } = e.target;
    setAlertSettings({ ...alertSettings, [name]: checked });
  };

  // Function to return color based on notification type
  const getNotificationColor = (type) => {
    switch (type) {
      case "Important":
        return "bg-yellow-600 text-gray-900";
      case "Info":
        return "bg-blue-600 text-white";
      case "Critical":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="h-full">
          <div className="flex items-center justify-between px-6 py-4 bg-secondary">
    <h1 className="text-xl font-bold">Airline Management</h1>
  
  </div>
    <div className="p-0 h-full bg-gradient-to-br from-gray-00 to-gray-700 min-h-[600px] rounded-none flex flex-col md:flex-row">
      {/* Notification Form */}
      <div className="w-full md:w-1/3 bg-white p-6 border border-gray-300 shadow-lg md:mb-0">
        <h2 className="text-2xl font-semibold mb-4 text-accent-orange-light">Send Notification</h2>
        <div className="space-y-6">
          {/* Dropdown for selecting user */}
          <div>
            <label htmlFor="user-select" className="text-lg text-gray-800">Select User:</label>
            <select
              id="user-select"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-accent-orange-light"
            >
              <option value="">--Select User--</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {`${user.firstName} (${user.role})`}
                </option>
              ))}
            </select>
          </div>

          {/* Notification Message and Type */}
          <textarea
            name="message"
            value={newNotification.message}
            onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
            placeholder="Enter notification message"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-accent-orange-light"
          />
          <div>
            <label htmlFor="notification-type" className="text-lg text-gray-800">Notification Type:</label>
            <select
              id="notification-type"
              name="type"
              value={newNotification.type}
              onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-accent-orange-light"
            >
              <option value="Important">Important</option>
              <option value="Info">Info</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Send/Update Button */}
          <button
            onClick={handleSendNotification}
            className="w-full py-3 text-xl text-white bg-accent-orange-light rounded-lg focus:ring-2 focus:ring-accent-orange-light"
          >
            {newNotification._id ? "Update Notification" : "Send Notification"}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="w-full md:w-2/3 ml-0 md:ml-0 bg-orange-100 p-6">
        {loading ? (
          <p className="text-center text-gray-800">Loading...</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`flex justify-between items-center p-4 rounded-lg ${getNotificationColor(
                  notification.type
                )}`}
              >
                <div>
                  <p className="text-lg font-semibold">{notification.message}</p>
                  <p className="text-sm">{new Date(notification.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditNotification(notification._id)}
                    className="text-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNotification(notification._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>

  );
};

export default NotificationManagement;
