const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err.message);

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: errors.join(", ") });
    }

    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res
        .status(500)
        .json({ message: "Server configuration error: JWT secret missing." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({
      status: true,
      token
    });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// Get User Details By ID
const getUserDetailsById = async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await User.findById(userID).lean().exec();
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error getting user:", error.message);
    res.status(500).json({ message: "Error getting user", error: error.message });
  }
};

const getAllHrs = async (req, res) => {
  try {
    const getAllHr = await User.find(
      {
        role: "hr",
      },
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
      }
    );

    if (!getAllHr) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      status: true,
      data: getAllHr,
    });

  } catch (error) {
    console.error("Error fetching Hr list:", error);

    return res.status(500).json({
      status: false,
      message: "Error fetching Hr list.",
      error: error.message,
    });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["admin", "hr"] } }, { password: 0 }).lean().exec();
    if (!users) return res.status(404).json({ message: "No users found." });

    res.status(200).json({ status: true, data: users });
  } catch (error) {
    console.error("Error getting users:", error.message);
    res.status(500).json({ message: "Error getting users", error: error.message });
  }
}


module.exports = { registerUser, loginUser, getUserDetailsById, getAllHrs, getAllUsers };
