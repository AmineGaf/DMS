const mongoose = require("mongoose");

const projectShema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    required: true,
  },
  logo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  ProjectManager: {
    type: String,
    required: true,
  },
  team: [
    {
      MemberEmail: { type: String },
      MemberRole: { type: String },
    },
  ],
  CreationDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  challenges: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  documentation: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("project", projectShema);
