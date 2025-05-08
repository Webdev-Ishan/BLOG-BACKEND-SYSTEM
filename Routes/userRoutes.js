import express from "express";
import * as userController from "../Controllers/userController.js";
import { usermid } from "../Middleware/user.middleware.js";
//import { authuser } from '../Middleware/auth.middleware.js'
const userRouter = express.Router();

userRouter.post("/createBlog", usermid, userController.createBlog);
userRouter.post("/deleteBlog/:id", usermid, userController.deleteBlog);
userRouter.get("/getBlog/:id", userController.getBlog);
userRouter.post("/comment/:id", usermid, userController.comment);
userRouter.post("/deletecomment/:id", usermid, userController.deletecomment);
userRouter.get("/allBlogs", userController.allBlogs);
userRouter.get("/allcomments/:id", userController.allcomments);
export default userRouter;
