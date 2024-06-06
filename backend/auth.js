import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import credentialModel from "./models/credentialsModel.js";

// jwt-decode runs on either front or backend, takes a token, and returns the plain text json obejfct
function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export async function registerUser(req, res) {
  const { username, pwd } = req.body; // from form
  try {
    if (!username || !pwd) {
      res.status(400).send("Bad request: Invalid input data.");
    } else {
      const existingUser = await credentialModel.findOne({ username });
      if (existingUser) {
        res.status(409).send("Username already taken");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pwd, salt);
        const token = await generateAccessToken(username);
        console.log("Token:", token);
        const newUser = await credentialModel.create({
          username,
          hashedPassword,
        });
        res.status(201).send({ token: token });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
}

export async function loginUser(req, res) {
  const { username, pwd } = req.body; // from form
  try {
    const retrievedUser = await credentialModel.findOne({ username });
    if (!retrievedUser) {
      res.status(401).send("Unauthorized");
    } else {
      const matched = await bcrypt.compare(pwd, retrievedUser.hashedPassword);
      if (matched) {
        const token = await generateAccessToken(username);
        res.status(200).send({ token: token });
      } else {
        res.status(401).send("Unauthorized");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
}

export const authenticateUser = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
};

