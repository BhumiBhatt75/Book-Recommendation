const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
console.log("Auth routes initialized");

exports.register = async (req, res) => {
  const { name, email, password, username, favoriteGenres } = req.body; // Include favoriteGenres

  try {
    // Validate input fields
    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with favoriteGenres
    user = new User({
      name,
      email,
      password: hashedPassword,
      username,
      favoriteGenres: favoriteGenres || [], // Include favorite genres (default to empty array)
    });

    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  // Log the incoming request body
  console.log("Login request body:", req.body);

  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
