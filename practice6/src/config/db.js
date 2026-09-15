import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected successfully!`);
  } catch (error) {
    console.log("Error in Database connection - ", error);
  }
};

export default connectDB;
