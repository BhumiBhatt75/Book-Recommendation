const express = require("express");
const connectDB = require("./config/db"); // Your MongoDB connection function
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware

app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: "http://localhost:5173" })); // Enable CORS for all routes

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


// Basic root endpoint
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
