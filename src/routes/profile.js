const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData, validateForgetPasswordData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("Error in fetching profile: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;
    // console.log("patch" + loggedInUser);

    //  loggedInUser.firstName = req.body.firstName;
    //  loggedInUser.lastName = req.body.lastName;
    // or
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your profile updated successfuly.`,
      data: loggedInUser,
    });
  } catch (error) {
    res.send("Error :" + error.message);
  }
});

profileRouter.patch("/forgetpassword" ,userAuth , async (req , res)=>{
 try {
  const {password} = req.body;
  if(! validator.isStrongPassword(password)){
 
   throw new Error("Password is not strong enough")
  }
  const passwordHash = await bcrypt.hash(password , 10)
  const user = req.user;
  user.password = passwordHash;

  await user.save();
  res.send("Password updated successfully")
    
  
}catch(error){
  res.status(500).send("Error : " + error.message)
}


  
})

module.exports = profileRouter;
