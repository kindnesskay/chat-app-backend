import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.route.js";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoose from "./lib/connectToMongoose.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
dotenv.config();
app.use(cookieParser());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.listen(port, () => {
  connectToMongoose();
  console.log("running on port :", port);
});
