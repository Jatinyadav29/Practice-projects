import { randomInt } from "crypto";

let mainString =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateCode = () => {
  let shortCode = "";

  for (let i = 0; i < 6; i++) {
    shortCode += mainString[randomInt(0, mainString.length)];
  }

  return shortCode;
};

export default generateCode;
