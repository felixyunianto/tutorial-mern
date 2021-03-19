const mongoose = require("mongoose");
const User = mongoose.model("Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: (req, res) => {
    const { body } = req;

    const saltRounds = 10;

    bcrypt.hash(body.password, saltRounds, (err, hashPassword) => {
      const users = new User({
        name: body.name,
        email: body.email,
        password: hashPassword,
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
    });
  },

  signIn: (req, res) => {
    const { body } = req;

    User.findOne({ email: body.email })
      .then((userSaved) => {
        if (!userSaved) {
          res.status(422).send({
            msg: "Error Sign In",
            status: 422,
            error: "Email is not available on our records",
          });
        }

        const isValidPassword = bcrypt.compareSync(
          body.password,
          userSaved.password
        );
        if(!isValidPassword){
          res.status(422).send({
            msg : 'Sign In Error',
            status : 422,
            error: 'Password is wrong'
          })
        }

        const payload = {
          id: userSaved._id,
          name: userSaved.name,
          email: userSaved.email,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 86400
        });

        delete userSaved._doc.password;

        const newData = {
          ...userSaved._doc,
          token
        }

        res.status(200).send({
          msg : 'Success Sign In',
          status: 200,
          data: newData
        })

      })
      .catch((error) => {
        res.status(500).send({
          msg: "Sign in is failed",
          status: 500,
          error,
        });
      });
  },
};
