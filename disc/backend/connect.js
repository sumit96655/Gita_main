import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "./config.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL");
    process.exit(1);
  }
};

export default connectDB;
