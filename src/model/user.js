const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required: true,
        minLength : 3,
        maxLength : 25,
    },
    lastName : {
        type : String,
    },
    emailId : {
        type : String,
        required: true,
        lowercase : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required: true,
    },
    age : {
        type : Number,
        min : [18 , "You should be minimum 18 years old"],
    },
    about : {
        type : String,
        default : "Hey there! I am using this DevTinder app" 
    },
    gender : {
        type : String,
        lowercase : true,
        validate(value){
            if(!["male" , "female" , "other"].includes(value)){
                throw new Error("gender data is not valid");
                
            }

        }
       
    },
    photoUrl : {
        type : String,
        default : "https://www.w3schools.com/howto/img_avatar.png"
    },
    skills : {
        type : [String]
    }
} , {timestamps : true});

module.exports = mongoose.model("User" , userSchema);