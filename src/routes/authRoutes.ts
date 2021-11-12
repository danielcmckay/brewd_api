import express from "express";
import { loginUser, signUpNewUser } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/signup", signUpNewUser);

authRouter.post("/login", loginUser);
