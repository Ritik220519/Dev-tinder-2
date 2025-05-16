const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../model/connectionRequest");
const requestRouter = express.Router();
const User = require("../model/user");

requestRouter.post(                            
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const isAllowedStatus = ["ignored", "interested"];
      // check if status is valid
      if (!isAllowedStatus.includes(status)) {
        throw new Error("Status not valid");
      }
      //   check if fromUserId and toUserId are valid ObjectId
      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(400).send("user not found");
      }

      //   if fromUserId and toUserId are same then return error
      // write schema level
      //   if(fromUserId.equals(toUserId)){
      //     return res.status(400).send("you can not send request to yourself");
      //   }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId : fromUserId , toUserId : toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "connection Request Allready Exists!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
        data,
      });
      res.send("connection request send.");
    } catch (error) {
      res.status(400).send("Error : " + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const logeedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("status not valid");
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: logeedInUser._id,
        status: "interested",
      }).populate("fromUserId" , ["firstName" , "lastName" , "photoUrl"]);

      if (!connectionRequest) {
        return res.status(400).send("connection request not found");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save()
      res.json({
        message: `You ${status} the request`,
        data,
      });
    } catch (error) {
      res.status(400).send("Error : " + error);
    }
  }
);

module.exports = requestRouter;
