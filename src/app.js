const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./model/user");
const app = express();
const { validateSignupData, validateLoginData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const { userAuth } = require("./middleware/auth.js");

// Middleware to convert JSON data to JS object
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validate the data
    validateSignupData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      skills,
      about,
      photoUrl,
    } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // create the new Instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      skills,
      about,
      photoUrl,
    });

    await user.save();
    res.send("User created successfully ");
  } catch (error) {
    res.status(500).send("Error creating user: " + error.message);
  }
});

// login API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // validate the data
    validateLoginData(req);

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // compare the password
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      // create a JWT token here
      const token = await user.getJWT();

      // Add the Token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful ");
    }
  } catch (error) {
    res.status(500).send("Error  : " + error.message);
  }
});

// get profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

// sending connection request

app.post("/sendingconnectionrequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sent request ");
  } catch (error) {
    res.send("Error : " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("database connected successfully...");
    app.listen(7777, () => {
      console.log("server is listining on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database connection failed..." + err);
  });
