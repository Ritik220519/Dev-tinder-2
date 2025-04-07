const express = require("express");
const app = express();

// multiple Routes handler
// app.use('/user' , rh1 , [rh2] , [rh3 , rh4])

app.use(
  "/user",
  [(req, res , next) => {
    console.log("1st Response");
    next();
    // res.send("Response 1st");
   
  },
  (req, res , next) => {
    console.log(" Response 2nd");
    // res.send("2nd Response");
    next();
  }],
  (req, res , next) => {
    console.log(" Response 3rd");
    next()
    // res.send("3rd Response");
  },
  (req, res) => {
    console.log(" Response 4th");
    res.send("4th Response");
  }
);

app.listen(7777, () => {
  console.log("server is listining on port 7777");
});
