import React, { useEffect, useState } from "react";
import axios from "axios";
import SessionPopup from "./SessionPopup"; // Import the Popup component

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");
  const [selectedSession, setSelectedSession] = useState(null); // State for selected session
  const [userRole, setUserRole] = useState("");
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/session"
        );
        setSessions(response.data.sessions);
      } catch (error) {
        setError("Error fetching sessions: " + error.message);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setHasToken(!!token); // Check if token exists
    setUserRole(role);
  }, []);

  const handleCardClick = (session) => {
    setSelectedSession(session);
  };

  const handleClosePopup = () => {
    setSelectedSession(null);
  };

  const handleBookNow = () => {
    // Implement booking logic here
    alert("Booking functionality is not implemented yet.");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Sessions</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {sessions.length === 0 && !error ? (
        <p>No sessions available</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <li
              key={session._id}
              className="p-4 border rounded-lg shadow-lg bg-gray-500 text-white cursor-pointer hover:bg-gray-800 transition"
              onClick={() => handleCardClick(session)}
            >
              <h3 className="text-lg font-semibold mb-2">
                <b>Title: </b>
                {session.title || "No Title"}
              </h3>
              <p>
                <strong>Start Time:</strong>{" "}
                {new Date(session.startTime).toLocaleString()}
              </p>
              <p>
                <strong>Duration:</strong> {session.sessionDuration} minutes
              </p>
              {hasToken && userRole === "visitor" && (
                <button
                  onClick={handleBookNow}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Book Now
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {selectedSession && (
        <SessionPopup session={selectedSession} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default SessionList;
