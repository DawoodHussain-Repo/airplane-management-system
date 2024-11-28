import React, { useState } from "react";

// Sample data to represent notification history (in a real app, this would be fetched from an API)
const initialNotifications = [
  { id: 1, message: "Flight AF100 has been delayed by 1 hour.", type: "Important", date: new Date().toLocaleString() },
  { id: 2, message: "Your boarding gate for AF200 has changed.", type: "Info", date: new Date().toLocaleString() },
  { id: 3, message: "Flight AF300 has been cancelled.", type: "Critical", date: new Date().toLocaleString() },
];

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [newNotification, setNewNotification] = useState({ message: "", type: "Important" });
  const [alertSettings, setAlertSettings] = useState({ enableNotifications: true });

  // Handle notification creation
  const handleSendNotification = () => {
    if (!newNotification.message) {
      alert("Please enter a notification message.");
      return;
    }
    const newNotificationObj = { ...newNotification, id: Date.now(), date: new Date().toLocaleString() };
    setNotifications((prevNotifications) => [...prevNotifications, newNotificationObj]);
    setNewNotification({ message: "", type: "Important" });
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
        return "bg-yellow-500 text-white"; // Yellow for important
      case "Info":
        return "bg-blue-500 text-white"; // Blue for info
      case "Critical":
        return "bg-red-500 text-white"; // Red for critical
      default:
        return "bg-gray-500 text-white"; // Default gray
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-700 min-h-[600px] flex flex-col md:flex-row">
      {/* Notification Form */}
      <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg mb-6 md:mb-0">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Send Notification</h2>
        <div className="space-y-6">
          <textarea
            name="message"
            value={newNotification.message}
            onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
            placeholder="Enter notification message"
            className="w-full p-3 border border-gray-600 rounded-md text-black"
          />
          <div>
            <label className="text-lg text-white">Notification Type:</label>
            <select
              name="type"
              value={newNotification.type}
              onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
              className="w-full p-3 border border-gray-600 rounded-md text-black"
            >
              <option value="Important">Important</option>
              <option value="Info">Info</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <button
            onClick={handleSendNotification}
            className="w-full bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 text-lg"
          >
            Send Notification
          </button>
        </div>
      </div>

      {/* Notification History Section */}
      <div className="w-full md:w-2/3 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Notification History</h2>
        
        {/* Alert Settings */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white">Alert Settings</h3>
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              name="enableNotifications"
              checked={alertSettings.enableNotifications}
              onChange={handleAlertSettingsChange}
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Recent Notifications</h3>
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification.id} className="border-b pb-4 border-gray-600">
                <div className="flex justify-between items-center text-white">
                  <span className="font-semibold">{notification.type}</span>
                  <span className="text-gray-400 text-sm">{notification.date}</span>
                </div>
                <p className={`${getNotificationColor(notification.type)} p-3 rounded-md`}>
                  {notification.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationManagement;
