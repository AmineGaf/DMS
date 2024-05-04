const express = require('express');

const Login = require('./Login');
const Register = require('./Register');
const User = require('./User');
const task = require('./task.js');
const Project = require('./Project.js');
const messages = require('./messages.js');
const conversation = require('./conversation.js');

// const emailSender = require('./gmailSender.js');



const {forgetPassword, resetPassword} = require('../controllers/forgotPassword.controller..js');



const routes = express.Router();
routes.use('/login', Login);
routes.use('/register', Register);

routes.post("/forgetPassword", forgetPassword);
routes.post("/reset-password/:token", resetPassword);


routes.use('/user', User);
routes.use('/task', task);
routes.use('/project', Project);

//Messages
routes.use('/messages', messages);
routes.use('/conversation', conversation);



module.exports = routes;