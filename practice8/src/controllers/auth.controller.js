import bcrypt from "bcryptjs";
import registerModel from "../models/register.model.js";
import {
  generateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.util.js";

const registerController = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const userAlreadyExist = await registerModel.findOne({ email });

    if (userAlreadyExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await registerModel.create({
      email,
      name,
      password: await bcrypt.hash(password, 10),
    });

    const { accessToken, refreshToken } = generateToken({ userId: user._id });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    return res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.log(`Error in register controller - ${error}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const userInfoController = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.staus(401).json({
      message: "Unauthorized, access token not found",
    });
  }

  try {
    const decode = verifyAccessToken(accessToken);

    const user = await registerModel.findById(decode.id);

    return res.status(200).json({
      message: "User found successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(`Error in user information controller - ${error}`);
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired access token",
    });
  }
};

const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refresh token not found",
    });
  }

  try {
    const decode = verifyRefreshToken(refreshToken);

    const user = await registerModel.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();

      return res.status(401).json({
        message: "Unauthorized, refresh token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken({
      userId: user._id,
    });

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    user.refreshToken = newRefreshToken;
    await user.save();

    return res.status(201).json({
      message: "Tokens refreshed successfully",
      accessToken,
    });
  } catch (error) {
    console.log(`REfresh token controller error - ${error}`);

    return res.status(401).json({
      message: "Unauthorized, expired or invalid refresh token",
    });
  }
};

export { registerController, userInfoController, refreshTokenController };
