import mongoose from "mongoose";

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);


export default mongoose.model("Teacher", teacherSchema);
