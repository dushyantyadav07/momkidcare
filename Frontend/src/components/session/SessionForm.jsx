import React, { useState } from "react";
import axios from "axios";

const SessionForm = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");
  const [preferredDays, setPreferredDays] = useState([]);
  const [sessionInterval, setSessionInterval] = useState("");
  const [title, setTitle] = useState(""); // Add state for title
  const [description, setDescription] = useState(""); // Add state for description

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate session duration if endTime is provided
    let calculatedDuration = sessionDuration;
    if (endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      if (end > start) {
        const durationMs = end - start;
        calculatedDuration = Math.floor(durationMs / (1000 * 60)); // Convert milliseconds to minutes
      } else {
        alert("End time must be after start time.");
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/sessions",
        {
          startTime,
          endTime,
          sessionDuration: calculatedDuration, // Use calculated duration
          preferredDays,
          sessionInterval: parseInt(sessionInterval, 10),
          title,
          description,
        }
      );

      if (response.data.success) {
        alert("Session created successfully!");
      } else {
        alert("Failed to create session.");
      }
    } catch (error) {
      console.error("Error creating session:", error);
      alert("An error occurred while creating the session.");
    }
  };

  const handlePreferredDaysChange = (e) => {
    const value = e.target.value;
    setPreferredDays((prevDays) =>
      prevDays.includes(value)
        ? prevDays.filter((day) => day !== value)
        : [...prevDays, value]
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Create Session</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="sessionDuration"
            className="block text-sm font-medium text-gray-700"
          >
            Session Duration (minutes)
          </label>
          <input
            type="number"
            id="sessionDuration"
            value={sessionDuration}
            onChange={(e) => setSessionDuration(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Preferred Days
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <label key={day} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={day}
                  checked={preferredDays.includes(day)}
                  onChange={handlePreferredDaysChange}
                  className="form-checkbox"
                />
                <span className="ml-2">{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="sessionInterval"
            className="block text-sm font-medium text-gray-700"
          >
            Session Interval (days)
          </label>
          <input
            type="number"
            id="sessionInterval"
            value={sessionInterval}
            onChange={(e) => setSessionInterval(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Session
        </button>
      </form>
    </div>
  );
};

export default SessionForm;
