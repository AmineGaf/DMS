const express = require('express');
const UserRouter = express.Router();
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');

const UserModel = require('../models/user');

//ADD USER
UserRouter.post('/post', async (req, res) => {
    const {fullname, image, email, role, password, phoneNumber, startDate, description, resume, contract} = req.body;
    try{
        //Uploading image to cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: "users"
        });

        const savedresume = await cloudinary.uploader.upload(resume, {
            folder: "resumes"
        });

        const savedcontract = await cloudinary.uploader.upload(contract, {
            folder: "contracts"
        });

        const existUser = await UserModel.findOne({ email: email });
        if (existUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new UserModel({
            fullname,
            image:{
                public_id: result.public_id,
                url: result.secure_url
            },
            email,
            role,
            password: hashedPassword,
            phoneNumber,
            startDate,
            description,
            resume: {
                public_id: savedresume.public_id,
                url: savedresume.secure_url 
            },
            contract: {
                public_id: savedcontract.public_id,
                url: savedcontract.secure_url 
            }
        });
        const savedUser = await user.save()
        res.status(200).json(savedUser);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

//GET ALL USERS
UserRouter.get('/getAll', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 4; // Number of users per page
      const skip = (page - 1) * limit;
  
      const users = await UserModel.find().select("-password").skip(skip).limit(limit);
      const totalUsers = await UserModel.countDocuments();
  
      const totalPages = Math.ceil(totalUsers / limit);
  
      res.json({
        users,
        totalPages
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
//GET USER BY Email
UserRouter.get('/get/:userEmail', async (req, res) => {
    try {
        const userEmail = req.params.userEmail;

        const user = await UserModel.findOne({email: userEmail});

        if (!user) {
            // Handle the case where the user is not found
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}); 

//GET by ID method
UserRouter.get('/getbyid/:id', async (req, res) => {
    try{
        const user = await UserModel.findById(req.params.id);
        res.json(user);
    }
    catch(error){
        
        res.status(500).json({message: error.message})
    }

})


//UPDATE USER BY ID
UserRouter.patch('/update/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updateData = req.body;
        const options = {new: true};

        const result = await UserModel.findByIdAndUpdate(
            id, updateData, options
        );
        res.send(result);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

//Delete BY ID
UserRouter.delete('/delete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const user = await UserModel.findByIdAndDelete(id);
        res.send(`User with ${user.fullname} has been deleted`);
    }catch(error){
        res.status(400).json({message: error.message});
    }

})

module.exports = UserRouter;

