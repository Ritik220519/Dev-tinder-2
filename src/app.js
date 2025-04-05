const express = require("express");
const app = express();

// order of the routes matters a lot

// this will handle the GET call /user
app.get('/user' , (req , res)=>{
    res.send({name: "Ritik" , lastName : "srivastava"}).status(200)
})
// this will handle the POST call /user
app.post("/user" , async(req , res) =>{
res.send("successfully send data to database.");
})

// this will handle the DELETE call /user
app.delete('/user' , (req, res) =>{
    res.send("successfully deleted data from database.")
})








// this will match all the http methods API call to this path
app.use("/node/express", (req, res) => {
    res.send("hello express js ");
  });

app.listen(7777, () => {
  console.log("server is listining on port 7777");
});
