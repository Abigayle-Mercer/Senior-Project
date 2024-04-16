const { interpolate } = require("d3");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new Schema(
  {
    studentId: {
      type: int,
    },
    date: {
      type: date,
    },
    surveyId: {
      type: int,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);
