const express = require("express");
const app = express();
const { adminAuth , userAuth } = require("./middleware/auth");

// handle Authntication for all middleware GET , POST .... request
app.use("/admin", adminAuth);

// write again and again  Authntication for all routes is not good thats why we use middleware
app.get("/admin/getAllData", (req, res) => {
  // const token = "abc123";
  // const isAdminAuthenticated = token === "abc123";
  // if (!isAdminAuthenticated) {
  //   res.status(401).send("Unauthorized");
  // } else {
  res.send("all data sent");
  // }
});
app.get("/admin/deleteData", (req, res) => {
  // const token = "abc123";
  // const isAdminAuthenticated = token === "abc123";
  // if (!isAdminAuthenticated) {
  //   res.status(401).send("Unauthorized");
  // } else {
  res.send("All data deleted");
  // }
});

app.get("/user/login" , (req, res)=>{
  res.send("User login page")
});
app.get("/user/data" ,userAuth, (req, res)=>{
  res.send("User data sent successfully");
});  

app.listen(7777, () => {
  console.log("server is listining on port 7777");
});
