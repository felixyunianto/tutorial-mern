const authRoutes = require("express").Router();
const authController = require("../controllers/AuthController");

authRoutes.post("/sign-up", authController.signUp);

module.exports = authRoutes;
