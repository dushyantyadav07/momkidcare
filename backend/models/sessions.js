const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date, // Add endTime field
  },
  sessionDuration: {
    type: Number, // Duration in minutes
    required: true,
  },
  preferredDays: {
    type: [String], // Array of day names, e.g., ["Monday", "Wednesday"]
    required: true,
  },
  sessionInterval: {
    type: Number, // Interval in days
    required: true,
  },
  title: {
    type: String, // Title of the session
    required: true,
  },
  description: {
    type: String, // Description of the session
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

sessionSchema.virtual("totalSessions").get(function () {
  const now = new Date();
  const totalDays = Math.floor((now - this.startTime) / (1000 * 60 * 60 * 24));
  const intervalDays = this.sessionInterval;
  return Math.floor(totalDays / intervalDays);
});

// Optional: Add a method to calculate the next session
sessionSchema.methods.getNextSessionDate = function () {
  const nextSessionDate = new Date(this.startTime);
  const intervalDays = this.sessionInterval;
  nextSessionDate.setDate(
    nextSessionDate.getDate() + this.totalSessions * intervalDays
  );
  return nextSessionDate;
};

module.exports = mongoose.model("Session", sessionSchema);
