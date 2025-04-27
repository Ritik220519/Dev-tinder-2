const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post("/sendconnectionrequest" , userAuth , async (req, res) =>{
    const user = req.user
    res.send( user.firstName + " Connection request sent ")
})




module.exports = requestRouter;