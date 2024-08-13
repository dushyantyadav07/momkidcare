import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SessionPopup = ({ session, onClose }) => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setHasToken(!!token); // Check if token exists
  }, []);

  const handleBookNow = () => {
    // Implement booking logic here
    alert("Booking functionality is not implemented yet.");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-2xl font-bold mb-4">
          {session.title || "No Title"}
        </h3>
        <p>
          <strong>Start Time:</strong>{" "}
          {new Date(session.startTime).toLocaleString()}
        </p>
        <p>
          <strong>End Time:</strong>{" "}
          {session.endTime
            ? new Date(session.endTime).toLocaleString()
            : "Not set"}
        </p>
        <p>
          <strong>Duration:</strong> {session.sessionDuration} minutes
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {session.description || "No Description"}
        </p>
        <p>
          <strong>Preferred Days:</strong> {session.preferredDays.join(", ")}
        </p>
        <p>
          <strong>Session Interval:</strong> {session.sessionInterval} days
        </p>
        {hasToken && (
          <button
            onClick={handleBookNow}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Book Now
          </button>
        )}
        <button
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

SessionPopup.propTypes = {
  session: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SessionPopup;
