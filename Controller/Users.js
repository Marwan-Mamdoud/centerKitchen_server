import { OAuth2Client } from "google-auth-library";
import User from "../Model/UserWithGoogle.js";
import UserNormal from "../Model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
export const LoginWithGoogle = async (req, res, next) => {
  try {
    const client = new OAuth2Client(
      "141679186178-cr0q9mjrvv3rki27v784imbfh8j2b3km.apps.googleusercontent.com"
    );

    const token = req.body.token;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "141679186178-cr0q9mjrvv3rki27v784imbfh8j2b3km.apps.googleusercontent.com", // يجب أن يكون هو نفس الـ Client ID
    });
    const payload = await ticket.getPayload();
    if (!payload.email_verified) {
      return res.status(400).json({
        status: false,
        error: `Error With Login With Google Account!`,
      });
    }
    const existUser = await User.findOne({ email: payload.email });
    if (existUser) {
      const payload = { userId: existUser._id, role: existUser.role };
      const secretKey = process.env.SECRETKEY; // Keep this secret and secure!
      const options = { expiresIn: "6h" }; // Token expires in 1 hour
      const token = await jwt.sign(payload, secretKey, options);
      res.cookie("token", token, {
        httpOnly: true, // تجعل الـ cookie غير قابلة للوصول عبر JavaScript
        secure: process.env.NODE_ENV === "production", // تأكد من استخدام HTTPS في بيئة الإنتاج
        maxAge: 3600000, // مدة صلاحية الـ cookie (ساعة واحدة)
        sameSite: "None", // تسمح بإرسال الـ cookies عبر المواقع المختلفة
      });
      return res.status(200).json({
        status: true,
        message: "Done Done Login Successfully.",
        user: existUser,
        token,
      });
    }
    const user = await new User({
      name: payload.name,
      email: payload.email,
    });
    await user.save();

    const secretKey = process.env.SECRETKEY; // Keep this secret and secure!
    const options = { expiresIn: "6h" }; // Token expires in 1 hour
    const Token = await jwt.sign({ userId: user._id }, secretKey, options);
    res.cookie("token", token, {
      httpOnly: true, // تجعل الـ cookie غير قابلة للوصول عبر JavaScript
      secure: process.env.NODE_ENV === "production", // تأكد من استخدام HTTPS في بيئة الإنتاج
      maxAge: 3600000, // مدة صلاحية الـ cookie (ساعة واحدة)
      sameSite: "None", // تسمح بإرسال الـ cookies عبر المواقع المختلفة
    });
    return res.status(200).json({
      status: true,
      message: "Done Login Successfully.",
      user,
      token: Token,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Sign In With Google Account Controller:${error.message}`,
    });
  }
};

export const LoginWithEmailAndPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await UserNormal.findOne({ email: email });
    if (!existUser) {
      return res.status(400).json({
        status: false,
        error: `No User With That Email`,
      });
    }
    const rightpassword = await bcrypt.compare(password, existUser.password);
    if (!rightpassword) {
      return res.status(400).json({
        status: false,
        error: `Wrong Password!`,
      });
    }
    const payload = { userId: existUser._id, role: existUser.role };
    const secretKey = process.env.SECRETKEY; // Keep this secret and secure!
    const options = { expiresIn: "6h" }; // Token expires in 1 hour
    const token = await jwt.sign(payload, secretKey, options);
    res.cookie("token", token, {
      httpOnly: true, // تجعل الـ cookie غير قابلة للوصول عبر JavaScript
      secure: process.env.NODE_ENV === "production", // تأكد من استخدام HTTPS في بيئة الإنتاج
      maxAge: 3600000, // مدة صلاحية الـ cookie (ساعة واحدة)
      sameSite: "None", // تسمح بإرسال الـ cookies عبر المواقع المختلفة
    });
    return res.status(200).json({
      status: true,
      message: "Done Login Succesfully.",
      user: existUser,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Sign In Controller:${error.message}`,
    });
  }
};

export const RegisterWithEmailandPassword = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await new UserNormal({
      name: name,
      email: email,
      password: hashPassword,
    });
    await user.save();
    const payload = { userId: user._id, role: user.role };
    const secretKey = process.env.SECRETKEY; // Keep this secret and secure!
    const options = { expiresIn: "6h" }; // Token expires in 1 hour
    const token = await jwt.sign(payload, secretKey, options);
    res.cookie("token", token, {
      httpOnly: true, // تجعل الـ cookie غير قابلة للوصول عبر JavaScript
      secure: process.env.NODE_ENV === "production", // تأكد من استخدام HTTPS في بيئة الإنتاج
      maxAge: 3600000, // مدة صلاحية الـ cookie (ساعة واحدة)
      sameSite: "None", // تسمح بإرسال الـ cookies عبر المواقع المختلفة
    });
    return res.status(201).json({
      status: 200,
      message: "Done Register Successfully.",
      user,
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        error: `This Email Is Aleady Exist.`,
      });
    }
    return res.status(400).json({
      status: false,
      error: `Error Sign Up Controller:${error.message}`,
    });
  }
};

export const EditUserInfo = async (req, res, next) => {
  try {
    const { name, email, oldPassword, password, passwordConfirm, id } =
      req.body;
    console.log(name, email, password, id);
    const user = await UserNormal.findOne({ _id: id });
    console.log(user);
    if (user == null) {
      return res.status(400).json({
        error: "Can't Edit Information Users That Login With Google Account",
        status: false,
      });
    }
    user.email = email || user.email;
    user.name = name || user.name;
    if (password) {
      if (password != passwordConfirm) {
        return res.status(400).json({
          error: "New Password and Password Comfirm Doesnt Match",
          status: false,
        });
      }
      const rightpassword = await bcrypt.compare(oldPassword, user.password);
      if (!rightpassword) {
        return res.status(400).json({ error: "Wrong Password", status: false });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
    }
    await user.save();
    return res.status(201).json({
      message: "Done Edit Your Information Successfully.",
      status: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Edit User Controller:${error.message}`,
    });
  }
};

export const VerifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token", token);
    console.log(req.cookies, "cookies");

    if (!token || token == undefined) {
      return res.status(401).json({ status: false, error: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.SECRETKEY);
    console.log(decoded);
    if (decoded.role != "Admin") {
      return res.status(400).json({ status: false, error: "nodeodec" });
    }
    if (decoded.role == "Admin") {
      req.user = decoded;
      next();
    }
    return res.status(402).json({ status: false, error: "error" });
  } catch (error) {
    return res.status(403).json({
      status: false,
      error: `Error Verify Controller:${error.message}`,
    });
  }
};

export const Protect = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "Done Verify", status: true });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Verify Controller:${error.message}`,
    });
  }
};

export const Logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true, // تجعل الـ cookie غير قابلة للوصول عبر JavaScript
      secure: process.env.NODE_ENV === "production", // تأكد من استخدام HTTPS في بيئة الإنتاج
      maxAge: 360, // مدة صلاحية الـ cookie (ساعة واحدة)
      sameSite: "None", // تسمح بإرسال الـ cookies عبر المواقع المختلفة
    });
    return res.status(200).json({ status: true, message: "Logout successful" });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Verify Controller:${error.message}`,
    });
  }
};

export const SendEmailToResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existUser = await UserNormal.findOne({ email: email });
    console.log(existUser, email);
    if (!existUser) {
      return res.status(400).json({
        status: false,
        error: `There is no user like this`,
      });
    }
    const token = jwt.sign({ userId: existUser._id }, process.env.SECRETKEY, {
      expiresIn: "1h",
    });

    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "marwanmamdouh159@gmail.com",
        pass: "casa yloo prts fdds",
      },
    });
    const mailOption = {
      from: {
        name: `E-commerce`,
        address: `${email}`,
      },
      to: email,
      // to: "marwanmamdouh159@gmail.com",
      subject: "Reset Password",
      text: `click In This Link to Reset Your Password: https://center-kitchen-frontend.vercel.app/ResetPassword?token=${token} `,
    };
    await transport.sendMail(mailOption);
    return res.status(200).json({
      message: "Done Add Link To Reset The Password",
      status: true,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Forget Pass Controller:${error.message}`,
    });
  }
};

export const PasswordReset = async (req, res, next) => {
  try {
    const { token, password, passwordConfirm } = req.body;
    const decoded = await jwt.verify(token, process.env.SECRETKEY);
    const { userId } = decoded;
    const user = await UserNormal.findById(userId);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    await user.save();
    return res
      .status(201)
      .json({ message: "Done Reset Password Successfully.", status: true });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Reset Pass Controller:${error.message}`,
    });
  }
};
