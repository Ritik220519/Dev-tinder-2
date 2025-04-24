const mongoose = require("mongoose")
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        trim : true,
        validate(value){
            if(! validator.isEmail(value)){
                throw new Error("Email is not valid" + value)

            }
        }

    },
    password : {
        type : String,
        required: true,
        validate(value){
            if(! validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough" + value)

            }
        }
        
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
        default : "https://www.w3schools.com/howto/img_avatar.png",
        validate(value){
            if(! validator.isURL(value)){
                throw new Error("URL is not correct" + value)

            }
        }
    },
    skills : {
        type : [String],
        validate(value){
            if(value.length > 10){
                throw new Error("You can add only 10 skills")
            }
        }
    }
} , {timestamps : true});

userSchema.methods.getJWT = async function(){

    const user = this;

    const token = await jwt.sign({ _id: user._id }, "DevTinder@SecretKey" , { expiresIn: '7d' });
    console.log("token are :", token);

    return token;

}

userSchema.methods.validatePassword = async function(passwordInputByUser){

    const user = this;
    const passwordHash = user.password

 const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

 return isPasswordValid;
}

module.exports = mongoose.model("User" , userSchema);