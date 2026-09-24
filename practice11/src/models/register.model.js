import mongoose from "mongoose";

const registerSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const registerModel = mongoose.model("register", registerSchema);

export default registerModel;
