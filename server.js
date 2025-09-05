import express from "express";
import { sequelize, User, Post, Comment } from "./models/Index.js";

const app = express();
app.use(express.json());

// Synchronisation DB
sequelize.sync().then(() => console.log("Base synchronisée !"));

//  s====================== ROUTES ======================

//  Utilisateurs
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ include: [Post, Comment] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Posts
app.post("/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ["username", "email"] },
        { model: Comment, include: [User] },
      ],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Commentaires
app.post("/comments", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [User, Post],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====================== LANCEMENT ======================
app.listen(3000, () => console.log("Serveur opérationnel sur http://localhost:3000"));
