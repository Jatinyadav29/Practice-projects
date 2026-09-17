import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";

const authRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "User already exists",
        errors: [
          {
            path: "email",
            message: "User already exists",
          },
        ],
      });
    }

    const user = await userModel.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });

    const { accessToken, refreshToken } = generateTokens({ userId: user._id });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    return res.status(201).json({
      message: "User registered Successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.log(`Error in auth register controller - ${error}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSingleUserController = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized, access token not found",
    });
  }

  try {
    const decoded = verifyAccessToken(accessToken);

    const user = await userModel.findById(decoded.id);

    return res.status(200).json({
      message: "User fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired access token",
    });
  }
};

const refreshAuthTokensController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refresh token not found",
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await userModel.findById(decoded.id);

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

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: user._id,
    });

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken,
    });
  } catch (error) {
    console.log("Refresh token error:", error);

    return res.status(401).json({
      message: "Unauthorized, Invalid or expired refresh token",
    });
  }
};

export {
  authRegisterController,
  getSingleUserController,
  refreshAuthTokensController,
};
