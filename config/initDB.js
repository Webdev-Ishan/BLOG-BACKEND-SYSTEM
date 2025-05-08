import sequelize from "./Db.js";

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database is connected successfully.");

    await sequelize.sync(); // Sync models with the database
    console.log("The databases are synced with the latest state.");
  } catch (error) {
    console.error("Unable to connect with the database:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export default initializeDatabase;
