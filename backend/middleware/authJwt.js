const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/auth.config");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userData = decoded; // in future request we could extract decoded userData
    next();
  });
};