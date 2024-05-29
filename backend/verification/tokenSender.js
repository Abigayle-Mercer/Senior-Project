import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // This will load variables from your .env file

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abigaylemercer@gmail.com",
    pass: "Dragonfly67!",
  },
});

const token = jwt.sign(
  {
    data: "Token Data",
  },
  "ourSecretKey",
  { expiresIn: "10m" }
);

const mailConfigurations = {
  from: "abigaylemercer@gmail.com",
  to: "abmercer@calpoly.edu",
  subject: "Email Verification",
  text: `Hi! There, You have recently visited
        our website and entered your email.
        Please follow the given link to verify your email
        http://localhost:3000/verify/${token}
        Thanks`,
};

transporter.sendMail(mailConfigurations, function (error, info) {
  if (error) throw Error(error);
  console.log("Email Sent Successfully");
  console.log(info);
});
