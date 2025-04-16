const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./model/user");
const app = express();

// Middleware to convert JSON data to JS object
app.use(express.json());

app.post("/signup", async (req, res) => {
  // we can see data in the console
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created successfully ");
  } catch (error) {
    res.status(500).send("Error creating user: " + error.message);
  }
});

// get API for one user
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("something went wrong" + error.message);
  }
});

// get API for all the users (feed)
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      res.status(400).send("No users found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("something went wrong" + error.message);
  }
});

// delete API for one user

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      res.status(400).send("user not Available");
    } else {
      res.send("User deleted successfully");
    }
  } catch (error) {
    res.send("something went wrong" + error.message);
  }
});

// update API for one user
app.patch("/user", async (req, res) => {
  
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user =  await User.findByIdAndUpdate({_id: userId }, data , {returnDocument : "before" , runValidators : true});
    // console.log(user);
    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.send("User updated successfully");
    }
  } catch (error) {
    res.send("something went wrong" + error.message);
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
