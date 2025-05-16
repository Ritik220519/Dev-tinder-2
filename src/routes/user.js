const express = require("express");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");

const userSafeData = ["firstName", "lastName", "photoUrl"];
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "photoUrl"]);

    if (connectionRequests.length < 0) {
      return res.status(400).send("User does not Connection Request");
    }
    res.json({
      message: `${loggedInUser.firstName} Data fetched succcessfully : `,
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", userSafeData)
      .populate("toUserId", userSafeData);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  // User should see all the user cards except
  //  0. his own card
  // 1. his connections
  // 2. ignored people
  // 3. already sent connection requests

  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hideUsersFromFeed = new Set();

    connectionRequest.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId._id.toString()),
        hideUsersFromFeed.add(request.toUserId._id.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $ne: loggedInUser._id } },
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
      ],
    }).select(userSafeData);
    res.send(users);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = userRouter;
