import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Request, Response, NextFunction } from "express";

export const signUpNewUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      res
        .status(200)
        .json({ message: `${userCredential.user} successfully signed up` });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      res.status(500).json({ message: `${email} failed to sign up` });
    });
};

export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      res
        .status(200)
        .json({ message: `${userCredential.user} successfully signed in` });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({ message: `${email} failed to sign in` });
    });
};
