const mongoose = require("mongoose");
const User = mongoose.model("Users");

module.exports = {
  signUp: (req, res) => {
    const { body } = req;

    const users = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    users
      .save()
      .then((user) => {
        res.status(200).send({
          msg: "Sign up is Successful",
          status: 200,
          data: user,
        });
      })
      .catch((error) => {
        res.status(500).send({
          msg: "Sign up is failed",
          status: 500,
          error,
        });
      });
  },
};
