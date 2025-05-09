import express from "express";
import * as paymentController from "../Controllers/paymentcontroller.js";
import { usermid } from "../Middleware/user.middleware.js";
//import { authuser } from '../Middleware/auth.middleware.js'
const paymentRouter = express.Router();

paymentRouter.post("/donate", usermid, paymentController.donate);

export default paymentRouter;
