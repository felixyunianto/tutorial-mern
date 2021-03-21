const postRoutes = require("express").Router();
const postController = require("../controllers/postController");
const authMiddlewares = require("../helpers/middleware/authMiddleware");

postRoutes.get("/", postController.getAllPost);
postRoutes.get(
  "/my-post",
  authMiddlewares.authenticateToken,
  postController.getPostByUser
);
postRoutes.post(
  "/",
  authMiddlewares.authenticateToken,
  postController.createNewPost
);

module.exports = postRoutes;
