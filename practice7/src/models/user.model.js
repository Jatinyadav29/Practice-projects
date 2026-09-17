import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  refreshToken: {
    type: String,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
