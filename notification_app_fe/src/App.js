import React, { useState, useEffect } from "react";
import { Log } from "../../logging_middleware/src/index.js";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initApp = async () => {
      await Log("frontend", "info", "component", "App component mounted");
      fetchNotifications();
    };
    initApp();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      await Log("frontend", "info", "api", "Fetching notifications");
      
      // In a real app, this would be a fetch call to the backend
      // For demo, we simulate it
      const response = await fetch("http://localhost:5000/api/notifications");
      if (!response.ok) throw new Error("Failed to fetch");
      
      const data = await response.json();
      setNotifications(data);
      
      await Log("frontend", "info", "api", "Notifications fetched successfully");
    } catch (err) {
      setError(err.message);
      await Log("frontend", "error", "api", `Notification fetch failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    await Log("frontend", "debug", "state", `Marking notification ${id} as read`);
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Notification Application</h1>
      <button onClick={fetchNotifications} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh Notifications"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul style={{ marginTop: "20px" }}>
        {notifications.map(n => (
          <li key={n.id} style={{ marginBottom: "10px", listStyle: "none", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <span style={{ fontWeight: n.read ? "normal" : "bold" }}>
              {n.message} {n.read ? "(Read)" : "(Unread)"}
            </span>
            {!n.read && (
              <button 
                onClick={() => handleMarkAsRead(n.id)} 
                style={{ marginLeft: "10px" }}
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;