const express = require("express");
const TaskRouter = express.Router();

const TaskModel = require("../models/task");

//ADD task
TaskRouter.post("/addTask", async (req, res) => {
  const {TaskName, ProjectName, Status, ResponsibleUser, DueDate} = req.body;
  try {
    const task = new TaskModel({
      TaskName, 
      ProjectName, 
      Status, 
      ResponsibleUser, 
      DueDate
    })
    const savedTask = await task.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get All tasks
TaskRouter.get("/getAllTasks", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // Number of users per page
    const skip = (page - 1) * limit;

    const tasks = await TaskModel.find().skip(skip).limit(limit);
    const totalTasks = await TaskModel.countDocuments();

    const totalPages = Math.ceil(totalTasks / limit);

    res.json({tasks, totalPages});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET TASK BY ID
TaskRouter.get("/gettask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findById(id).exec();

    if (!task) {
      return res.status(404).json({ message: "Task not found " });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//UPADATE TASK BY ID
TaskRouter.patch("/updatetask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true };

    const result = await TaskModel.findByIdAndUpdate(id, updateData, options);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE TASK

TaskRouter.delete("/deletetask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndDelete(id);
    res.send(`Task with ${task.title} has been deleted`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = TaskRouter;
