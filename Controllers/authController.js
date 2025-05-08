import userModel from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../config/nodemailer.js";
import { v2 as cloudinary } from "cloudinary";
import { client } from "../config/redis.js";

export const register = async (req, res) => {
  const { username, email, password, profilepic } = req.body;

  if (!username || !email || !password) {
    return res.json({ success: false, message: "Crendentials are required" });
  }
  try {
    let cache = client.get(`user:profile:${email}`);

    if (cache) {
      return res.json({
        success: false,
        message: "User already exists in cache",
      });
    }

    let existuser = await userModel.findOne({
      where: { email: email },
    });

    if (existuser) {
      return res.json({ success: false, message: "User already exists" });
    }

    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(profilepic, {
      resource_type: "image",
    });

    let user = await userModel.create(
      {
        username,
        email,
        password: hashed,
        profilepic: imageUpload.secure_url,
      },
      {
        tableName: "users",
      }
    );

    let cacheuser = client.set(`user:profile:${email}`, JSON.stringify(user));

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", // Required for cross-origin cookies
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account is registered",
      text: `Welcome to the Blog App`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Crendentials are required" });
  }
  try {
    let cache = client.get(`user:profile:${email}`);

    if (cache) {
      return res.json({
        success: false,
        message: "User already exists in cache",
      });
    }

    let user = await userModel.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.json({ success: false, message: "Sign up first" });
    }

    let decode = await bcrypt.compare(password, user.password);

    if (!decode) {
      return res.json({
        success: false,
        message: "Email or password is wrong.",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", // Required for cross-origin cookies
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account is logineed",
      text: `Welcome to the Blog App`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Logged in succesfull" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    // Assuming 'id' in the token corresponds to the user's unique identifier
    let user = await userModel.findOne({
      where: { id: req.body.id }, // Use 'id' instead of 'email' if you're using the user ID
    });

    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", // Required for cross-origin cookies
    });
    return res.json({ success: true, message: "Logged out succesfull!!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
