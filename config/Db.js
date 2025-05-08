import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();
// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, // Database name
  process.env.MYSQL_USER, // Username
  process.env.MYSQL_PASSWORD, // Password
  {
    host: process.env.MYSQL_HOST, // Host
    dialect: "mysql", // Database dialect
  }
);

export default sequelize;
