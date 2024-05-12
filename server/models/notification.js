const mongoose = require("mongoose");

const notificationShema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notification", notificationShema);
