const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(400).send("Invalid token");
    }
    const decoded = await jwt.verify(token, "DevTinder@SecretKey");

    const { _id } = decoded;

    const user = await User.findById(_id);
    if (!user) {
      res.status(400).send("Id does not exist");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).send("Error : " + err.mssage);
  }
};

module.exports = { userAuth };
