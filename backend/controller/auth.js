const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateUser = require('../middleware/validateUser');
const User = require('../model/user');
// const { upload } = require('../multer');


const router = express.Router();

router.get("/", validateUser, async (req, res) => {
  return res.status(200).json({ user: req.user });
});

router.post("/register",  async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('req.body', req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const isUserExists = await User.findOne({ email: email });

    if (isUserExists) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

     

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        
      });

      console.log('newUser', newUser);
      const savedUser = await newUser.save();
      console.log("User created successfully:", savedUser.name);
      res.status(201).json(savedUser);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log('Error creating user:', err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  // Validate user credentials
  const { email, password } = req.body;
  console.log(req.body, "heyyy");
    const user = await User.findOne({ email: email });

  // Fetch user from database
  try {

    console.log(user.email, user.password);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password 1" });
    } else {
      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch, "pass");
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password 2" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.user_id, email: email },
        "secret",
        {
          expiresIn: "1h",
        }
      );

      res.cookie("jwt", token);
    //  console.log('token',token);
      // Send token to the client
      res.status(200).json({message:"login successfully"});
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
