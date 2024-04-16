require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const surveyRoutes = require('./routes/surveys')
const teacherRoutes = require('./routes/teacher')
const categoryRoutes = require('./routes/category')

// express app
const app = express()

// middle ware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/surveys', surveyRoutes)
app.use("/api/teachers", teacherRoutes);
app.use("/api/categories", categoryRoutes);


// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      // listen for requests
      app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port 4000");
      });
    })
    .catch((error) => {
        console.log(error)
    })




