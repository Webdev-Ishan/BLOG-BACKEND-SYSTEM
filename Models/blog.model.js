// Models/blog.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../Db.js';

const Blog = sequelize.define('blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Blog;

