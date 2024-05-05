import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reflectionResponseSchema = new Schema(
  {
    reflectionId: {
      type: String,
    },
    responseId: {
      type: String,
    },
    input: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ReflectionResponse", reflectionResponseSchema);

