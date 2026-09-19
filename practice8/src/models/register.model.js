import mongoose from "mongoose";

const registerSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  name: {
    type: String,
    required: true,
    minlength: [3, "Atleast 3 letters are required"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Minimum lenth for password is 8 character"],
  },
  refreshToken: {
    type: String,
  },
});

const registerModel = mongoose.model("register", registerSchema);

export default registerModel;
