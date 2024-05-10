import getUserDataFromCookie from "../lib/getUserDataFromCookie.js";

export const profile = async (req, res) => {
  const cookie = req.cookies._auth_chathub;
  if (!cookie) return res.status(400).json({ message: "cookie is invalid" });

  const verifyCookie = await getUserDataFromCookie(cookie);
  if (!verifyCookie) {
    return res.status(400).json({ message: "Invalid cookie", user: false });
  }
  const { id, username } = verifyCookie;
  return res.status(200).json({ message: "profile", user: { id, username } });
};
