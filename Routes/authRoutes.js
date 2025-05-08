import express from "express";
import * as authController from "../Controllers/authController.js";
import multer from "../Middleware/multer.js";
import { authuser } from "../Middleware/auth.middleware.js";
import passport from "passport";
const authrouter = express.Router();

authrouter.post(
  "/register",
  multer.single("profilepic"),
  authController.register
);
authrouter.post("/login", authController.login);
authrouter.get("/profile", authuser, authController.profile);
authrouter.post("/logout", authuser, authController.logout);

export default authrouter;
