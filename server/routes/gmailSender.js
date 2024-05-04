const nodemailer = require('nodemailer');

// Create a reusable transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_APP_EMAIL,
  },
});

// Define a function to send an email
function sendEmail(req, res) {
  const { to, subject, text } = req.body; 

  // Set up the email options
  const mailOptions = {
    from: '"Amine" <amine.gafsi.2002@gmail.com>',
    to: to,
    subject: subject,
    text: text,
  };

  // Send the email
  transporter.sendMail(mailOptions)
    .then(info => {
      console.log({ info });
      res.status(200).json({ message: 'Email sent successfully!' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email.' });
    });
}

module.exports = sendEmail;