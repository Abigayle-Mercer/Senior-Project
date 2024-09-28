import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    adminId: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Class", classSchema);
