const express = require("express");
const app = express();

// order of the routes matters a lot

app.get('/user/:userId/:number/:age' , (req , res)=>{
    console.log(req.params) // this will give the params in the url
    res.send({name: "Ritik" , lastName : "srivastava"}).status(200)
})

app.listen(7777, () => {
  console.log("server is listining on port 7777");
});
