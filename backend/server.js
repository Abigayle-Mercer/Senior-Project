require("dotenv").config();
/* 
    Questions: 
    1.) where do i add the authenticateUser function? 
    2.) which endpoints need it? Probably not students since they're recieving a secure email?
    3.) Should teachers have usernames as well as emails?

*/
const express = require("express");
const mongoose = require("mongoose");
const surveyRoutes = require("./routes/surveys");
const teacherRoutes = require("./routes/teacher");
const categoryRoutes = require("./routes/category");
const promptRoutes = require("./routes/prompt");
const responseRoutes = require("./routes/response");
const promptResponseRoutes = require("./routes/promptResponse");
const reflectionRoutes = require("./routes/reflection");
const reflectionResponseRoutes = require("./routes/reflectionResponse");
const studentRoutes = require("./routes/student");

import { registerUser, authenticateUser } from "./auth.js";

// express app
const app = express();

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
// authentication
app.post("/signup", registerUser); 
app.post("/login", registerUser);

// connect to DB
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
