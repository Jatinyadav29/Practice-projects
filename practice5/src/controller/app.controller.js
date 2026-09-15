import jwt from "jsonwebtoken";
import registerModel from "../model/register.model.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await registerModel.create({
      email,
      name,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      message: "User Registered successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log("Error in register controller - ", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const authenticationCheckController = (req, res) => {
  try {
    let user = req.user;

    return res.status(200).json({
      message: "User found successfully",
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log("Error in authCheck controller - ", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await registerModel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Login Successful",
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.log("Error in Login controller - ", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { registerController, authenticationCheckController, loginController };
