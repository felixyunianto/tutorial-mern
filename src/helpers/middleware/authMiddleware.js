const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("Users");

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) {
      return res.status(401).send({
        msg: "You must be logged in",
        status: 401,
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      // console.log("Data ", data);
      if (err) {
        return res.status(403).send({
          msg: "Invalid token",
          status: 403,
        });
      }
      User.findById(data.id).then((users) => {
        req.decodedToken = users;
        next();
      });
    });
  },
};
