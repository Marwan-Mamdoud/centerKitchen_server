import { Router } from "express";
import {
  EditUserInfo,
  LoginWithEmailAndPassword,
  LoginWithGoogle,
  Logout,
  PasswordReset,
  Protect,
  RegisterWithEmailandPassword,
  SendEmailToResetPassword,
  VerifyUser,
} from "../Controller/Users.js";

const router = Router();

router.post("/login/google", LoginWithGoogle);

router.post("/login/WithEmailAndPassword", LoginWithEmailAndPassword);

router.post("/register", RegisterWithEmailandPassword);

router.post("/verify", VerifyUser, Protect);

router.put("/edit", EditUserInfo);

router.post("/logout", Logout);

router.post("/ForgetPass", SendEmailToResetPassword);

router.post("/ResetPass", PasswordReset);

export default router;
