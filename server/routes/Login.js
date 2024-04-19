const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();

const UserModel = require('../models/user');


// LOGIN ROUTE
authRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials!' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred during password comparison' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});




module.exports = authRouter;