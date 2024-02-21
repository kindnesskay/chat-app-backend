import dotenv from "dotenv";
dotenv.config();
const Private_key = process.env.SECRET_KEY;
const project_id = process.env.PROJECT_id;
import axios from "axios";
export const signUp = async (req, res) => {
  const { username, secret } = req.body;

  // Store a user-copy on Chat Engine!
  try {
    const response = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret },
      { headers: { "Private-Key": `${Private_key}` } }
    );
    return res.status(response.status).json(response.data);
  } catch (e) {
    console.log(e);
    return res.status(e.response.status).json(e.response.data);
  }
};
export const signOut = (req, res) => {
  res.json({ message: "Sign out" });
};
export const sigIn = async (req, res) => {
  const { username, secret } = req.body;

  // Fetch this user from Chat Engine in this project!
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": `${project_id}`,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
};
