const express = require("express");
const router = express.Router();
const {
  createSession,
  getSession,
  getAllSessions,
} = require("../controllers/sessionController.js");

// Route to create a new session
router.post("/sessions", createSession);

// Route to get a specific session by ID
router.get("/sessions/:id", getSession);

// Route to get all sessions
router.get("/session", getAllSessions);

module.exports = router;
