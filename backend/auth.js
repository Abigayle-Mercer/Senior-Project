import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import Student from "./models/studentModel.js";
import Teacher from "./models/teacherModel.js";
import credentialModel from "./models/credentialsModel.js"; // Import the credential model

// JWT Secret
const JWT_SECRET = process.env.TOKEN_SECRET || "your_jwt_secret";

// Function to send verification email
async function sendVerificationEmail(email, verificationToken) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Click the following link to verify your email: http://yourwebsite.com/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}

// Authenticate user middleware
export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

// Register student function
export async function registerStudent(req, res) {
  const { name, email, password, username } = req.body;

  try {
    if (!name || !email || !password || !username) {
      return res.status(400).send("Bad request: Invalid input data.");
    }

    const existingUser = await Student.findOne({ email });
    const existingUsername = await credentialModel.findOne({ username });
    if (existingUser || existingUsername) {
      return res.status(409).send("Email or username already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = uuidv4();

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verified: false,
    });

    const newCredential = new credentialModel({
      username,
      hashedPassword,
    });

    await newStudent.save();
    await newCredential.save();
    await sendVerificationEmail(email, verificationToken);
    res
      .status(201)
      .send("Verification email sent. Please verify your email address.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
}

// Register teacher function
export async function registerTeacher(req, res) {
  const { name, email, district, password, username } = req.body;

  try {
    if (!name || !email || !district || !password || !username) {
      return res.status(400).send("Bad request: Invalid input data.");
    }

    const existingUser = await Teacher.findOne({ email });
    const existingUsername = await credentialModel.findOne({ username });
    if (existingUser || existingUsername) {
      return res.status(409).send("Email or username already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = uuidv4();

    const newTeacher = new Teacher({
      name,
      email,
      district,
      password: hashedPassword,
      verificationToken,
      verified: false,
    });

    const newCredential = new credentialModel({
      username,
      hashedPassword,
    });

    await newTeacher.save();
    await newCredential.save();
    await sendVerificationEmail(email, verificationToken);
    res
      .status(201)
      .send("Verification email sent. Please verify your email address.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
}

// Verification endpoint
export async function verifyEmail(req, res) {
  const { token } = req.params;

  try {
    const student = await Student.findOne({ verificationToken: token });
    const teacher = await Teacher.findOne({ verificationToken: token });

    const user = student || teacher;

    if (!user) {
      return res.status(404).send("Invalid verification token");
    }

    user.verified = true;
    user.verificationToken = null; // Optionally, clear the token
    await user.save();

    res.send("Email verified successfully");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Internal server error");
  }
}

// Login function
export async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const credential = await credentialModel.findOne({ username });

    if (!credential) {
      return res.status(401).send("Invalid username or password.");
    }

    const validPassword = await bcrypt.compare(
      password,
      credential.hashedPassword
    );
    if (!validPassword) {
      return res.status(401).send("Invalid username or password.");
    }

    const student = await Student.findOne({ email: credential.username });
    const teacher = await Teacher.findOne({ email: credential.username });

    const user = student || teacher;

    if (!user.verified) {
      return res
        .status(401)
        .send("Email not verified. Please check your inbox.");
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.send({ token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
}

export default router;
