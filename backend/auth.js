import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import credentialModel from "./models/credentialsModel.js";
import studentModel from "./models/studentModel.js";
import teacherModel from "./models/teacherModel.js";

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

export async function registerTeacher(req, res) {
  const { username, pwd, name, district, isTeacher } = req.body; // from form
  console.log("isTeacher: ", isTeacher)

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

        // this is where we create the associated teacher or student object 
        try  {
          console.log("HEREERE   1")
          const student = await teacherModel.create({
            name: name,
            email: username,
            district: district
           })
        } catch (error) {
          // should delete the credential object here sometime soon 
          console.error("Error:", error);
          res.status(500).send("Internal server error");
        }
        res.status(201).send({ token: token });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
}

export async function registerStudent(req, res) {
  const { username, pwd, name, district, isTeacher } = req.body; // from form
  console.log("isTeacher: ", isTeacher)

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

        // this is where we create the associated teacher or student object 
        try  {
          console.log("HEREERE   1")
          const student = await studentModel.create({
            name: name,
            email: username,
            district: district
           })
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send("Internal server error");
        }
        res.status(201).send({ token: token });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
}

export async function loginUser(req, res) {
  const { username, pwd, isTeacher  } = req.body; // from form
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


export async function loginTeacher(req, res) {
  const { username, pwd, isTeacher  } = req.body; // from form
  try {
    const retrievedUser = await credentialModel.findOne({ username });
    if (!retrievedUser) {
      res.status(401).send("Unauthorized");
    } else {
      const matched = await bcrypt.compare(pwd, retrievedUser.hashedPassword);
      if (matched) {
        try {
          console.log("username: ", username)
          const user = await teacherModel.findOne({email: username});
          console.log(user)
          if (!user) {
            res.status(401).send("Unauthorized");
          } else {
            const token = await generateAccessToken(username);
            console.log(token)
            res.status(200).send({ token: token });
          }
          
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send("Internal server error");
        }
      } else {
        res.status(401).send("Unauthorized");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
}


export async function loginStudent(req, res) {
  const { username, pwd, isTeacher  } = req.body; // from form
  try {
    const retrievedUser = await credentialModel.findOne({ username });
    if (!retrievedUser) {
      res.status(401).send("Unauthorized");
    } else {
      const matched = await bcrypt.compare(pwd, retrievedUser.hashedPassword);
      if (matched) {
        try {
          const user = await studentModel.findOne({email: username});
          if (!user) {
            res.status(401).send("Unauthorized");
          } else {
            const token = await generateAccessToken(username);
            res.status(200).send({ token: token });
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send("Internal server error");
        }
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

