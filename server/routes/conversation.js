const router = require("express").Router();
const Conversation = require("../models/Conversation");

const UserModel = require("../models/user");

//new conv
router.post("/addconversation", async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  try {
    // Check if conversation already exists
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      // Conversation already exists
      return res.status(200).json(existingConversation);
    }

    // Create a new conversation
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    const savedConversation = await newConversation.save();

    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get conv of a user
router.get("/getconverstion/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET contacts
router.get("/contacts/:currentUserId", async (req, res) => {
  try {
    const currentUserId = req.params.currentUserId;
    const contacts = await UserModel.find({
      _id: { $ne: currentUserId },
    }).select("-password");

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
