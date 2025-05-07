// Models/comment.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../Db.js';

const Comment = sequelize.define('comment', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Comment;

