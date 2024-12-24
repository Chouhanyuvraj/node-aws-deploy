const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const isValidPassword = bcrypt.compareSync(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login Successful",
      token: token,
      data: {
        id: existingUser._id,
        name: existingUser.name,
        role: existingUser.role,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
