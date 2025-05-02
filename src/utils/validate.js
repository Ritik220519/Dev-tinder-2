const validatior = require("validator");


const validateSignupData = (req) =>{
    const {firstName , lastName  , emailId , password , age , skills , gender} = req.body;

    if(! firstName || !lastName){
        throw new Error("name are required")
    }else if(!validatior.isEmail(emailId)){
        throw new Error("Email is not valid")
    }else if(!validatior.isStrongPassword(password)){
        throw new Error("Password is not strong enough")
    }else if(! age || age < 18){
        throw new Error("You should be minimum 18 years old");
    }else if(! skills ){
        throw new Error("skills are required")
    }else if(! gender){
        throw new Error("gender is required")
    }
}

const validateLoginData = (req) =>{

    const {emailId , password} = req.body;
    if(! emailId || ! password){
        throw new Error("Email and password are required")
    }else if(!validatior.isEmail(emailId)){
        throw new Error("Email is not valid")
    }else if(!validatior.isStrongPassword(password)){
        throw new Error("Password is not strong enough")
    }

}

const validateEditProfileData = (req) =>{
    const allowedEditField = ["firstName" , "lastName" , "emailId" , "age" , "gender" , "skills" , "about" , "photoUrl"];

    const isEditAllowed = Object.keys(req.body).every((field)=> allowedEditField.includes(field))

    return isEditAllowed;

}
const validateForgetPasswordData = (req) => {
    const { passwordInputByUser } = req.body;
    if (!passwordInputByUser) {
        throw new Error("Password is required");
    }
    
   else if(!validatior.isStrongPassword(passwordInputByUser)){
        throw new Error("Password is not strong enough")
    }

}

module.exports = {
    validateSignupData,
    validateLoginData,
    validateEditProfileData,
    validateForgetPasswordData
}