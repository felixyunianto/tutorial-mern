require("dotenv").config({});
require('./src/models');
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL;


const mainRoutes = require("./src/routes");

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`Connection is Successfull`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Connection is Error ${err}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", mainRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
