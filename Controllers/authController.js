import userModel from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({ success: false, message: "Crendentials are required" });
  }
  try {
    let existuser = await userModel.findOne({
      where: { email: email },
    });

    if (existuser) {
      return res.json({ success: false, message: "User already exists" });
    }

    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(password, salt);

    let user = await userModel.create({
       username,
       email,
      password: hashed,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", // Required for cross-origin cookies
    });

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
