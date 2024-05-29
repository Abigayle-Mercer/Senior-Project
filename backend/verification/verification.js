import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

// Inside your registerUser function
const verificationToken = uuidv4();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abigaylemercer@gmail.com",
    pass: "Dragonfly67!",
  },
});

// Define email options
const mailOptions = {
  from: "your-email@gmail.com",
  to: "user@example.com",
  subject: "Email Verification",
  text: `Click the following link to verify your email: http://yourwebsite.com/verify/${verificationToken}`,
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
