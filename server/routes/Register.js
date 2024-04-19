const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');

const Register = express.Router();

Register.post('/', async (req, res) => {
    try{
    const {fullname, email, role, password} = req.body;

    const existingUser = await userModel.findOne({email});

    if(existingUser){
        res.status(400).json({message: 'Email is already exist'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
        fullname,
        email,
        role,
        password: hashedPassword,
    })

    const savedUser = await user.save()
    res.status(200).json(savedUser)

    }catch(error){
        res.status(500).status({message: error.message});
    }

});


module.exports = Register;