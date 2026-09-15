import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const registerModel = mongoose.model("register", registerSchema);

export default registerModel;
