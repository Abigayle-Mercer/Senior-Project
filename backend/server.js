
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
/*  
  TODO: 
    1.) change all of the requires 
    2.) change the auth.js file 
    3.) do user sign up 

    Questions: 
    1.) where do i add the authenticateUser function? 
    2.) which endpoints need it? Probably not students since they're recieving a secure email?
    3.) Should teachers have usernames as well as emails?  districts should be a drop down, with other, distrcits hvae to contact to be addd 

*/


import express from "express";
import mongoose from "mongoose";
import  {surveyRoutes}  from "./routes/surveys.js";

import {classRoutes} from "./routes/class.js";
import {teacherRoutes} from "./routes/teacher.js";
import {categoryRoutes} from "./routes/category.js";
import {promptRoutes} from "./routes/prompt.js";
import {responseRoutes} from "./routes/response.js";
import {promptResponseRoutes} from "./routes/promptResponse.js";
import {reflectionRoutes} from "./routes/reflection.js";
import {reflectionResponseRoutes} from "./routes/reflectionResponse.js";
import {studentRoutes} from "./routes/student.js";

import {
  registerStudent,
  registerTeacher,
  loginStudent,
  loginTeacher,
  loginUser,

} from "./auth.js";


// express app

const app = express();
app.use(cors())

// middle ware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/surveys", surveyRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/promptResponses", promptResponseRoutes);
app.use("/api/reflections", reflectionRoutes);
app.use("/api/reflectionResponses", reflectionResponseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);

// Authentication
app.post("/signup/student", registerStudent); 
app.post("/signup/teacher", registerTeacher); 
app.post("/login/teacher", loginTeacher);
app.post("/login/student", loginStudent);



// connect to DB
console.log("HELLO")
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
