import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRET;
export default async function getUserDataFromCookie(token) {
  if (!secret || !token) return false;
  return jwt.verify(token, secret);
}
