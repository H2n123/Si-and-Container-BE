// app/controllers/user.controller.js
const db = require("../models");
const Op = require("sequelize").Op;
const User = db.user;
const Role = db.role;
const bcrypt = require("bcryptjs");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken." });
    }

    // Create a new user
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single user by username
exports.getUserByusername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a user by username
exports.updateUser = async (req, res) => {
  try {
    let { username, password, email, roles, newPassword } = req.body;

    const user = await User.findOne({ where: { username } });
    
    if (password) {
      validatePassword = bcrypt.compareSync(password, user.password)
      if (!validatePassword) {
        return res.status(200).json({message: "Invalid password!"})  
      }
    } else {
      return res.status(400).json({ message: "Password is required." });
    } 

    // Find the user
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    
    // update with newPassword
    } if(newPassword.length > 0) {
      user.password = bcrypt.hashSync(newPassword, 8);
    }

    // Update email ini perlu konfirmasi by email dulu.
    // if (email) {
    //   user.email = email;
    // }

    // Update Roles
    if (roles) {
      const newRoles = await Role.findAll({
        where: {
          name: {
            [Op.or]: roles,
          },
        },
      });

      if (newRoles.length > 0) {
        await user.setRoles(newRoles);
      } else {
        res.status(400).json({ message: "Invalid role names provided." });
      }
    }

    await user.save();

    res.status(200).json({ 
      message: "User updated successfully.",
      username: username,
      email: email,
      roles: roles,
   });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a user by username
exports.deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user
    await user.destroy();

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public response.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User response.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin response.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator response.");
};