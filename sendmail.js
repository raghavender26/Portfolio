const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;
app.use(cors()); 
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST route to handle the form data
app.post('/send-email', (req, res) => {
    const { name, email, comments } = req.body;

    // Configure the email transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email options
    let mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email
        to: 'ragh3662@gmail.com',   // Recipient's email
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${comments}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send email', error });
        }
        res.status(200).json({ message: 'Email sent successfully', info });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
