const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/auth.config");

exports.createToken = (userLogin) => {
  return jwt.sign({ login: userLogin }, jwtConfig.secret, jwtConfig.expiresIn);
};

exports.verifyToken = (req, res) => {
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
    if (decoded) {
      return res.status(200).send({
        message: "Authorized!",
      });
    }
  });
};
