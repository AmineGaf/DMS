const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_APP_EMAIL
  }
});

// Route to send email
router.post('/', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Email options
    const mailOptions = {
      from: 'amine.gafsi.2002@gmail.com', 
      to, 
      subject,
      text
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

module.exports = router;
