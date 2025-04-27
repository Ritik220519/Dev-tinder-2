const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

// Middleware to convert JSON data to JS object
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request")
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
