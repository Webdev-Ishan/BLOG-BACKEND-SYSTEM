import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import { configDotenv } from "dotenv";
configDotenv();
import initializeDatabase from './config/initDB.js' 

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

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`)

});
