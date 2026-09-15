import jwt from "jsonwebtoken";
import registerModel from "../model/register.model.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      message: "Token not Found!",
    });
  }

  const data = jwt.verify(token, process.env.JWT_SECRET);

  let user = await registerModel.findById(data.id);

  req.user = user;
  next();
};
