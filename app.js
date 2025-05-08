import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import aiRoutes from "./Routes/aiRoutes.js"
import { configDotenv } from "dotenv";
configDotenv();
import initializeDatabase from "./config/initDB.js";
import { redisconnect} from "./config/redis.js";
import cloud from "./config/cloudinary.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Initialize the database
(async () => {
  try {
    await initializeDatabase(); // Call the database initialization function
  } catch (error) {
    console.error("Failed to initialize the database. Exiting...");
    process.exit(1); // Exit the application if the database connection fails
  }
})();
cloud();
 await redisconnect();
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
