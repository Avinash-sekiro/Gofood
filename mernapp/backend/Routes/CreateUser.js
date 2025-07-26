const express = require('express'); 
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const  jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "thisisjustaexampletocheck";

// Route to create a new user
router.post(
  "/createuser" ,
  [
    body('email', 'Invalid email').isEmail(),
    body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, email, password, location } = req.body;

      // Prevent duplicate user creation
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, error: "User already exists" });
      }

      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user in DB
      await User.create({
        name,
        email,
        password: hashedPassword,
        location
      });

      res.json({ success: true, message: "User created successfully" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);

// Route to login user
router.post(
  "/loginuser",
  [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      // Compare hashed passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }
      const data = {
        users:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret)
      res.json({ success: true,authToken:authToken, message: "Login successful" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);

module.exports = router;
