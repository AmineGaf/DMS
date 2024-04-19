const express = require('express');

const Login = require('./Login');
const Register = require('./Register');
const User = require('./User');
const task = require('./task.js');
const Project = require('./Project.js');

const {forgetPassword, resetPassword} = require('../controllers/forgotPassword.controller..js');



const routes = express.Router();
routes.use('/login', Login);
routes.use('/register', Register);

routes.post("/forgetPassword", forgetPassword);
routes.post("/reset-password/:token", resetPassword);


routes.use('/user', User);
routes.use('/task', task);
routes.use('/project', Project);



module.exports = routes;