import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";
configDotenv();
export const authuser = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.json({ success: false, message: "Log in first" });
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    
    if (decoded.id) {
      req.body = req.body || {}; // Ensure req.body is defined
      req.body.id = decoded.id;
      next();
    } else {
      return res.json({ success: false, message: "Something went wrong" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


