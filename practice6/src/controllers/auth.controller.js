import registerModel from "../models/register.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      message: "User registered successfully!",
      data: {
        name,
        email,
      },
      token,
    });
  } catch (error) {
    console.log("Erron in register controller - ", error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

const getUserController = (req, res) => {
  try {
    let user = req.user;

    return res.status(201).json({
      message: "User found successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("GGet user controller error - ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { registerController, getUserController };
