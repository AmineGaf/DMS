const mongoose = require("mongoose");

const projectShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  logo: {
    public_id:{
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  ProjectManager: {
    type: String,
    required: true
  },
  team: [
    {
      MemberName: { type: String },
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
});

module.exports = mongoose.model("project", projectShema);
