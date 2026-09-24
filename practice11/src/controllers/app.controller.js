import registerModel from "../models/register.model.js";

const demo = (req, res) => {
  return res.status(200).json({
    message: "Hello world",
  });
};

const registerController = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const user = await registerModel.create({
      email,
      phone,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: {
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.log(`Error in register controller - ${error}`);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { demo, registerController };
