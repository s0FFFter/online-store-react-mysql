const db = require("../config/db.config");
const dbCommands = require("../config/dbCommands.config");
const c = dbCommands.userCommands;

// check duplicate login
module.exports = (req, res, next) => {
  const userLogin = req.body.login;
  db.query(c.SELECT_USER_BY_LOGIN, [userLogin], (err, results) => {
    if (err) {
      console.log("mySQL error:", err);
      return res.status(400).send({
        message: "Backend/DB error",
      });
    }
    if (results.length >= 1) {
      console.log("Login exist");
      return res.status(409).send({
        message: "Failed! Username/Login is already in use!",
      });
    }
    next();
  });
};
