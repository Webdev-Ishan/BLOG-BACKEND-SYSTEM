import User from "./user.model.js";
import Blog from "./blog.model.js";
import Comment from "./comment.model.js";


User.hasMany(Blog, { foreignKey: "userId", onDelete: "CASCADE" });
Blog.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId" });

Blog.hasMany(Comment, { foreignKey: "blogId", onDelete: "CASCADE" });
Comment.belongsTo(Blog, { foreignKey: "blogId" });

export { User, Blog, Comment };