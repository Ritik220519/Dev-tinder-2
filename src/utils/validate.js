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

module.exports = {
    validateSignupData
}