const jwt = require("jsonwebtoken");

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
      if (err) {
        return res.status(403).send({
          msg: "Invalid token",
          status: 403
        });
      }

      req.decodedToken = data
      next();
    });
  },
};
