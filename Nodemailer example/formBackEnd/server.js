const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS)
app.use(express.static('public'));

// POST route to handle sending emails
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your email id', // Your Gmail address
            pass: 'your password' // Your Gmail password
        }
    });

    // Setup email data
    const mailOptions = {
        from: email,
        to: 'email id to send email', // Email address where you want to receive messages
        subject: 'New Message from Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
