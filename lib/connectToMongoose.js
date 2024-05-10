import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const databeseUri = process.env.DATABASE_URI;
export default async function connectToMongoose() {
  if (!databeseUri) return "invalid address";
  try {
    await mongoose.connect(databeseUri);
    console.log("connected");
    return "Connected to databae";
  } catch (error) {
    console.log(error);
    return error;
  }
}
