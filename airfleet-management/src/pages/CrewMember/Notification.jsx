import React, { useState } from "react";

const NotificationsAndAlerts = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Flight AF123 has been delayed by 2 hours.", type: "alert", read: false },
    { id: 2, message: "Your flight AF456 is scheduled for check-in.", type: "update", read: false },
    { id: 3, message: "Critical weather alert in New York airport.", type: "critical", read: false },
  ]);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map((notification) => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Handle response to notification (for example, acknowledge)
  const respondToNotification = (id, response) => {
    // Here you can send the response to the backend (like acknowledging the alert)
    console.log(`Response to notification ${id}: ${response}`);
    markAsRead(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Notifications and Alerts</h2>

      {/* Display Notifications */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Important Notifications</h3>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-400 text-center">No notifications available.</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${notification.read ? "bg-gray-700" : "bg-gray-600"} hover:bg-gray-500`}
              >
                <div className="flex justify-between">
                  <p className="text-lg">{notification.message}</p>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={() => respondToNotification(notification.id, "Acknowledge")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => respondToNotification(notification.id, "Dismiss")}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsAndAlerts;
