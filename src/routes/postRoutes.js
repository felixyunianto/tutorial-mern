const postRoutes = require('express').Router();
const postController = require('../controllers/postController');
const authMiddlewares = require('../helpers/middleware/authMiddleware');

postRoutes.post('/', authMiddlewares.authenticateToken, postController.createNewPost);

module.exports = postRoutes;