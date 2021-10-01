const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

//allow api to use json and url encoding
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set public folder
app.use(express.static(path.join(__dirname, "public")));

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD, //if you have 2 factor authentication on: https://stackoverflow.com/a/49306726/1524210
    },
    secure: true,
});

app.post("/text-email", (req, res) => {
    const { name, email, phoneNumber, message } = req.body;

    const text = `Name: ${name} \n Email: ${email} \n Phone #: ${phoneNumber} \n Message: ${message}`;
    const html = `
    <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Phone #: ${phoneNumber}</li>
        <li>Message: ${message}</li>
    </ul>
    `;

    const mailData = {
        from: process.env.HEROKU_APP_NAME + "@heroku-express.com",
        to: process.env.GMAIL_ADDRESS,
        subject: process.env.HEROKU_APP_NAME + " form submission",
        text: text,
        html: html,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({
            message: "Mail send",
            message_id: info.messageId,
        });
    });
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
