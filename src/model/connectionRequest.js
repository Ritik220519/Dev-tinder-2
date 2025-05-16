const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    toUserId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored","interested" , "accepted" , "rejected"],
        message: `{VALUE} is incorrect status type !`,
      },
      ref : "User"
    },
  },
  { timestamps: true }
);

connectionRequestSchema.pre("save" ,function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You can not send request to yourself");
        
    }
    next()
} )

const connectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);



module.exports = connectionRequestModel;
