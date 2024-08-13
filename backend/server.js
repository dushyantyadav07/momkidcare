const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const otpRoutes = require("./routes/otp");
const sessionRoutes = require("./routes/sessionRoutes");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Route imports
app.use("/api/v1", sessionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
