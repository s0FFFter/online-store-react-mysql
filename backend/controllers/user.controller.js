const db = require("../config/db.config");
const jwtController = require("./auth.controller"); // .createToken
const bcrypt = require("bcrypt");
const dbCommands = require("../config/dbCommands.config");
const c = dbCommands.userCommands;
const ifDbErr = dbCommands.ifDbErr;

const saltRounds = 4;

const checkLoginPasswordProvided = (data, res) => {
  if (!data.login || !data.password) {
    res.status(403).send({
      message: "No login and/or password provided!",
    });
    throw console.log("No login and/or password provided!");
  }
};

// CREATE (POST)
// /register
exports.singup = (req, res) => {
  const newUser = req.body;
  checkLoginPasswordProvided(newUser, res);
  /* hash and salt password */
  bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
    if (err) {
      console.log("bcrypt error:", err);
      return res.status(500).send({
        message: "Hashing password error.",
      });
    } else {
      newUser.password = hash;
      /* create new user in mySQL DB */
      db.query(c.INSERT_INTO_USERS, newUser, (err, results) => {
        ifDbErr(err, res);
        if (results) {
          console.log("New user created, id: " + results.insertId);
          res.status(201).send({
            message: "New user created, login: " + newUser.login,
          });
        }
      });
    }
  });
};
// /login
exports.login = (req, res) => {
  const user = req.body;
  checkLoginPasswordProvided(user, res);
  db.query(c.SELECT_USER_BY_LOGIN, [user.login], (err, results) => {
    ifDbErr(err, res);
    // looks for req login
    if (results.length < 1) {
      console.log("There is no such login: " + req.body.login);
      return res.status(404).send({
        message: "Wrong Login!",
      });
    }
    // login correct, compare password (req with db):
    bcrypt.compare(user.password, results[0].password, (error, result) => {
      if (error) {
        console.log("bcrypt error:", error);
        return res.status(400).send({
          message: "Hashing password error.",
        });
      }
      if (!result) {
        console.log("Wrong password.");
        return res.status(401).send({
          message: "Wrong password!",
        });
      }
      // correct password, create and send token:
      if (result) {
        const token = jwtController.createToken(user.login);
        console.log("Successfully logged in: " + user.login);
        return res.status(200).send({
          login: user.login,
          token: token,
        });
      }
    });
  });
};

// READ (GET)
// /

// /authorized
exports.showUserDataByLogin = (req, res) => {
  const user = req.userData; // test it.
  if (!user.login) {
    console.log("No LOGIN provided!");
    return res.status(403).send({
      message: "No LOGIN provided!",
    });
  }
  db.query(c.SELECT_USER_BY_LOGIN, [user.login], (err, results) => {
    ifDbErr(err, res);
    if (results) {
      res.status(200).send(results);
    }
  });
};

// UPDATE (PATCH)
// /authorized
exports.update = (req, res) => {
  const user = req.body;
  if (!user.login) {
    console.log("No LOGIN provided!");
    return res.status(403).send({
      message: "No LOGIN provided!",
    });
  }
  db.query(c.UPDATE_USER, [user, user.login], (err, results) => {
    ifDbErr(err, res);
    if (results) {
      console.log("User updated, login: " + user.login, results.message);
      res.status(200).send({
        message: "User updated!",
      });
    }
  });
};

// DELETE (DELETE)
// /authorized
exports.delete = (req, res) => {
  const user = req.body;
  //
  console.log("YOU CAN'T MILK THOSE");
  return res.status(400).send({
    message: "YOU CAN'T MILK THOSE",
  });
};
