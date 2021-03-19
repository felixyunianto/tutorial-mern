const mainRoutes = require("express").Router();

const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");

mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/post", postRoutes);

module.exports = mainRoutes;
