const express = require("express");
const {connectDB} = require("./config/database");
const User = require("./model/user")
const app = express();

// Middleware to convert JSON data to JS object
app.use(express.json());


app.post("/signup" , async(req,res)=>{
  console.log(req.body);
  const user = new User(req.body)
//   const user = new User({
//     firstName : "Ritik",
//     lastName : "Srivastava",
//     emailId : "Ritik@gmail.com",
//     password : "password",
//     age : 25,
//     gender : "Male",

//   })

  try {
    await user.save();
    res.send("User created successfully ")
  } catch (error) {
    res.status(500).send("Error creating user: " + error.message);
    
  }
 
})




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

