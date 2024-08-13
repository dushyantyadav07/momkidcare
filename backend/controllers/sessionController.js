const Session = require("../models/sessions.js");

// Create a new session
exports.createSession = async (req, res) => {
  try {
    const {
      startTime,
      endTime,
      sessionDuration,
      preferredDays,
      sessionInterval,
      title,
      description,
    } = req.body;

    // Validate input
    if (
      !startTime ||
      !sessionDuration ||
      !preferredDays ||
      !sessionInterval ||
      !title
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are not provided",
      });
    }

    // Calculate duration if endTime is provided
    let calculatedDuration = sessionDuration;
    if (endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      if (end > start) {
        const durationMs = end - start;
        calculatedDuration = Math.floor(durationMs / (1000 * 60)); // Convert milliseconds to minutes
      } else {
        return res.status(400).json({
          success: false,
          message: "End time must be after start time.",
        });
      }
    }

    const newSession = await Session.create({
      startTime,
      endTime,
      sessionDuration: calculatedDuration, // Use calculated duration
      preferredDays,
      sessionInterval,
      title,
      description,
    });

    return res.status(201).json({
      success: true,
      session: newSession,
      message: "Session created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating session: " + error.message,
    });
  }
};

// Get session details
exports.getSession = async (req, res) => {
  try {
    const sessionId = req.params.id;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    return res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching session: " + error.message,
    });
  }
};

// Get all sessions
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    return res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching sessions: " + error.message,
    });
  }
};
