const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new Schema(
  {
    studentId: {
      type: String,
    },
    date: {
      type: Date,
    },
    surveyId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);
