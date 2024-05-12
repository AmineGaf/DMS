const express = require("express");
const notificationRouter = express.Router();

const notificationModel = require("../models/notification");
const Conversation = require("../models/Conversation");

//add notification
notificationRouter.post("/addNotification", async (req, res) => {
  const { senderId, receiverId, text, read } = req.body;
  try {
    // Check if there's an existing notification for the same sender and receiver
    const existingNotification = await notificationModel.findOne({
      senderId,
      receiverId,
    });

    if (existingNotification) {
      // Update the existing notification with the newest message
      existingNotification.text = text;
      existingNotification.read = read;
      const updatedNotification = await existingNotification.save();
      res.status(200).json(updatedNotification);
    } else {
      // Create a new notification
      const notification = new notificationModel({
        senderId,
        receiverId,
        text,
        read,
      });

      // Save the new notification
      const savedNotification = await notification.save();
      res.status(200).json(savedNotification);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all notifications
notificationRouter.get("/getAll", async (req, res) => {
  try {
    const receiverId = req.query.receiverId;
    const notifications = await notificationModel.find({ receiverId }).exec();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE notification
notificationRouter.delete("/deletenotification/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const notification = await notificationModel.findByIdAndDelete(id);
    res.send(`notification has been deleted`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get conversation
notificationRouter.get("/conversation", async (req, res) => {

  const senderId = req.query.senderId;
  const receiverId = req.query.receiverId;

  try {
    const conversation = await Conversation
      .findOne({
        members: { $all: [senderId, receiverId] },
      })
      .exec();
    if (conversation) {
      res.status(200).json(conversation);
    } else {
      res.status(404).json({ message: "Conversation not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = notificationRouter;
