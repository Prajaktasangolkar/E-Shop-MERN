import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateUser } from "../middleware/validateUser";
const User=require('../model/user')
const cloudinary=require('cloudinary')


const router=express.Router()

router.get("/", validateUser, async (req, res) => {
    return res.status(200).json({ user: req.user });
  });
  // Register route
  router.post("/register", validateUser,async (req, res) => {
    try {
        const { name,email ,password,avatar } = req.body;
        console.log(req.body);
        const isUserExists = await User.findOne({ email: email });
    
        if (isUserExists) {
          return res.status(400).json({ error: "user already exists" });
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const newUser = new User({
            username,
            password: hashedPassword,
          });
          const savedUser = await newUser.save();
          console.log("User created successfully:", savedUser.username);
          res.status(201).json(savedUser);
        }
      } catch (err) {
        res.status(500).json(err);
      }
})


  export default router;