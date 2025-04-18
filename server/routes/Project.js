const express = require("express");
const cloudinary = require("../utils/cloudinary");
const ProjectRouter = express.Router();

const ProjectModel = require("../models/project");

// ADD PROJECT
ProjectRouter.post("/addProject", async (req, res) => {
  const {
    userId,
    title,
    projectType,
    logo,
    ProjectManager,
    team,
    CreationDate,
    description,
    challenges,
    solution,
    documentation,
  } = req.body;

  try {
    const result = await cloudinary.uploader.upload(logo, {
      folder: "projects",
    });

    const saveDocumentation = await cloudinary.uploader.upload(documentation, {
      folder: "projects",
    });

    const existProject = await ProjectModel.findOne({ title: title });
    if (existProject) {
      return res.status(409).json({ message: "Project already exists" });
    }

    const project = new ProjectModel({
      userId,
      title,
      projectType,
      logo: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      team,
      ProjectManager,
      CreationDate,
      description,
      challenges,
      solution,
      documentation: {
        public_id: saveDocumentation.public_id,
        url: saveDocumentation.secure_url,
      },
    });

    const savedProject = await project.save();
    res.status(200).json(savedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the project" });
  }
});

//get all projects
ProjectRouter.get("/getAll", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;
    const userId = req.query.userId; // User ID from the query parameters

    const projectsSum = await ProjectModel.countDocuments(); 
    const allprojects = await ProjectModel.find();
    const query = { userId }; // Filter tasks by user ID

    const projects = await ProjectModel.find(query).skip(skip).limit(limit).exec();
    const totalProjects = await ProjectModel.countDocuments(query);
    const totalpages = Math.ceil(totalProjects / limit);

    res.json({ projects, totalpages, projectsSum, allprojects });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get project by id
ProjectRouter.get("/getProject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const project = ProjectModel.findById(id);

    if (!project) {
      res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
});

//UPADATE Project BY ID
ProjectRouter.patch("/updateproject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true };

    const result = await ProjectModel.findByIdAndUpdate(
      id,
      updateData,
      options
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE Project

ProjectRouter.delete("/deleteproject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const project = await ProjectModel.findByIdAndDelete(id);
    res.send(`Project with ${project.title} has been deleted`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = ProjectRouter;
