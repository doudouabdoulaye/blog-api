import express from "express";
import { Post, User, Comment } from "../models/Index.js";

const router = express.Router();

// GET /posts : retourne tous les posts avec commentaires et auteur
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ["id", "username", "email"] },
        { 
          model: Comment,
          include: [{ model: User, attributes: ["id", "username"] }]
        }
      ]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
