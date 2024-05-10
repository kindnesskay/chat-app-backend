import generateToken from "../lib/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
export const signUp = async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username)
    return res.status(401).json({ message: "Invalid credentials" });
  try {
    // check if username exist
    const user = await User.findOne({ username });
    if (user)
      return res.status(401).json({ message: "Username already exist" });
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      password: hash,
    });
    await newUser.save();
    const token = await generateToken({
      id: newUser._id,
      username: newUser.username,
    });
    if (!token) throw Error;
    return res
      .cookie("_auth_chathub", token, {
        MaxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(201)
      .json({ message: "user created " });
  } catch (e) {
    console.log(e);
    return res.status(e.response.status).json(e.response.data);
  }
};

export const sigIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json({ message: "invalid credentials" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "user does not exist" });
    const compare_password = await bcrypt.compare(password, user.password);
    if (!compare_password) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const { _id } = user;
    const token = await generateToken({ _id, username });
    if (!token) throw Error;
    res
      .cookie("_auth_chathub", token, {
        MaxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ message: "Logged in", user: { id: _id, username } });
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
};
export const signOut = (req, res) => {
  res.json({ message: "Sign out" });
};
