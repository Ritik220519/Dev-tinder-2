const express = require("express");
const { validateSignupData, validateLoginData } = require("../utils/validate");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, password, age, skills } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      skills,
    });
    await user.save();
    res.send("User created successfully ");
  } catch (error) {
    res.status(500).send("Error creating user: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    validateLoginData(req);
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      const token = await user.getJWT();

      res.cookie("token", token);
      res.send("User logged in successfully ");
    }

  
  } catch (error) {
    res.status(500).send("Error in Login user: " + error.message);
  }
});


module.exports = authRouter;