import { User, Post, Comment } from "./models/Index.js";

const testDisplay = async () => {
  try {
    // OPTIONNEL : créer des données si elles n'existent pas
    const user = await User.findOrCreate({
      where: { email: "fariss2@example.com" },
      defaults: { username: "fariss", password: "123456" },
    });

    const post = await Post.findOrCreate({
      where: { title: "Mon premier article" },
      defaults: { content: "Ceci est un test", UserId: user[0].id },
    });

    await Comment.findOrCreate({
      where: { content: "Bravo !", PostId: post[0].id, UserId: user[0].id },
      defaults: { content: "Bravo !", PostId: post[0].id, UserId: user[0].id },
    });

    // Récupérer tous les posts avec leurs relations
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ["username", "email"] },
        { model: Comment, include: [User] },
      ],
    });

    // Afficher le résultat en JSON formaté
    console.log(JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error("Erreur :", err);
  }
};

testDisplay();
