import { Schema, Model, Document, model, mongoose } from "mongoose";


const credentialSchema =
  new Schema({
    username: {
      type: String,
      required: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { collection: "user_credentials" });


export default mongoose.model("credentialModel", credentialSchema);

