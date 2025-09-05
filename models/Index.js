// models/index.js
import { Sequelize, DataTypes } from "sequelize";
import UserModel from "./User.js";
import PostModel from "./Post.js";
import CommentModel from "./Comment.js";

// Connexion SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

// Définition des modèles
const User = UserModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);

// Associations
User.hasMany(Post, { foreignKey: "UserId" });
Post.belongsTo(User, { foreignKey: "UserId" });

Post.hasMany(Comment, { foreignKey: "PostId" });
Comment.belongsTo(Post, { foreignKey: "PostId" });

User.hasMany(Comment, { foreignKey: "UserId" });
Comment.belongsTo(User, { foreignKey: "UserId" });

export { sequelize, User, Post, Comment };
