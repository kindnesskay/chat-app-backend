import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRET;
export default async function generateToken(data) {
  if (!secret) return false;
  const token = jwt.sign(data, secret, {
    expiresIn: "15d",
  });
  return token;
}
