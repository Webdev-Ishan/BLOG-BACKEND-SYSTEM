import express from "express";
import * as authController from "../Controllers/authController.js";
const authrouter = express.Router();

authrouter.post("/register", authController.register);

export default authrouter;
