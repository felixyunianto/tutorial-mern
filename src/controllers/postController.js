const { decode } = require("jsonwebtoken");
const mongoose = require("mongoose");
const Post = mongoose.model("Posts");

module.exports = {
  getAllPost: (req, res) => {
    Post.find()
      .populate("postedBy")
      .then((data) => {
        res.status(200).send({
          msg: "Get All Post Data is Successful",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          msg: "Get All Post Data is Error",
          status: 500,
          error,
        });
      });
  },

  createNewPost: (req, res) => {
    const { body } = req;
    const { decodedToken } = req;
    const post = new Post({
      title: body.title,
      content: body.content,
      postedBy: decodedToken,
    });

    post
      .save()
      .then((data) => {
        res.status(200).send({
          msg: "Create Post is Successful",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          msg: "Create Post is Failed",
          status: 500,
          error,
        });
      });
  },

  getPostByUser: (req, res) => {
    const { decodedToken } = req;
    Post.find({ postedBy: decodedToken._id })
      .populate("PostedBy", "_id name")
      .then((data) => {
        res.status(200).send({
          msg: "Get Post By User is Successful",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          msg: "Get Post By User is Error",
          status: 500,
          error,
        });
      });
  },
};
