import registerModel from "../models/register.model.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return req.status(401).json({
      message: "Token not Found",
    });
  }

  let data = jwt.verify(token, process.env.JWT_SECRET);
  const user = await registerModel.findById(data.id);

  req.user = user;
  next();
};
