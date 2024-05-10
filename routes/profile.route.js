import express from "express";
import { profile } from "../controllers/profile.controller.js";
const router = express.Router();
router.get("/", profile);
export default router;
