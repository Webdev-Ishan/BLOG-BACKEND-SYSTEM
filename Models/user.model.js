import { DataTypes } from "sequelize";
import sequelize from "../config/Db.js";

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);


//user.hasMany(Blog, { foreignKey: 'userId', onDelete: 'CASCADE' });
//Blog.belongsTo(user, { foreignKey: 'userId' });

export default user;