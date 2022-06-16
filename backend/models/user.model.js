// old file, to delete or update with sequelize
// old file, to delete or update with sequelize
// old file, to delete or update with sequelize
// old file, to delete or update with sequelize
// old file, to delete or update with sequelize
// old file, to delete or update with sequelize
// old file, to delete or update with sequelize
// old file, to delete or update with sequelize
// old file, to delete or update with sequelize
// old file, to delete or update with sequelize
// old file, to delete or update with sequelize
// old file, to delete or update with sequelize

const db = require("../config/db.config");
const jwt = require("jsonwebtoken");

const INSERT_INTO_CUSTOMERS = "INSERT INTO customers SET ?";
const SELECT_USER_BY_NAME_LASTNAME =
  "SELECT * FROM customers WHERE customerName = ? AND customerLastname = ?";
  const SELECT_USER_BY_LOGIN =
  "SELECT * FROM customers WHERE login = ?";
const CHECK_LOGIN_PASSWORD =
  "SELECT * FROM customers WHERE login = ? AND password = BINARY ?";
const CHECK_LOGIN = "SELECT * FROM customers WHERE login = ?";
const UPDATE_USER = "UPDATE customers SET ? WHERE login = ?";

// session and auth
const jwtConfig = {
  secret: "myLittleTestSecret",
};
function User(customer) {
  // this.customerId = customer.customerId;
  this.customerName = customer.customerName;
  this.customerLastname = customer.customerName;
  this.customerAddress = customer.customerAddress;
  this.login = customer.login;
  this.password = customer.password;
}

// CREATE - Check if user exist
User.createUser = (req, res) => {
  const user = req.body;
  db.query(CHECK_LOGIN, [user.login], (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log(results.length);
      // res.json(results.length);
      if (results.length > 0) {
        console.log("user exist ");
        res.send({ status: "user exist" });
      } else {
        db.query(INSERT_INTO_CUSTOMERS, user, (err, results) => {
          if (err) {
            console.log("error: ", err);
            res.send({ status: "fail" });
          } else {
            console.log("New user created, id: " + results.insertId);
            res.send({
              status: "success",
              login: user.login,
              password: user.password,
            });
          }
        });
      }
    }
  });
};

// READ
User.loginByLoginPassword = (req, res) => {
  const user = req.body;
  db.query(
    CHECK_LOGIN_PASSWORD,
    [user.login, user.password],
    (err, results) => {
      if (err) {
        console.log("error: ", err);
        res.send({ status: "fail" });
      } else {
        if (results.length > 0) {
          // success login
          console.log(results);
          // create json web token
          let token = jwt.sign({ login: user.login }, jwtConfig.secret, {
            expiresIn: 3600, // 1 hour
          });
          res.status(200).send({
            login: user.login,
            accessToken: token,
            message: "Success Login",
          });
          //
          // res.send({ status: "Success Login" });
        } else {
          res.send({ status: "Wrong login or password" });
        }
      }
    }
  );
};

User.showUserByNameLastname = (req, res) => {
  const user = req.body;
  db.query(
    SELECT_USER_BY_NAME_LASTNAME,
    [user.customerName, user.customerLastname],
    (err, results) => {
      if (err) {
        console.log("error: ", err);
        res.send({ status: "fail" });
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
};

User.showUserByLogin = (req, res) => {
  const user = req.body;
  db.query(
    SELECT_USER_BY_LOGIN,
    [user.login],
    (err, results) => {
      if (err) {
        console.log("error: ", err);
        res.send({ status: "fail" });
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
};

User.checkToken = (req, res, next) => {
  console.log(req.headers);
  let token = req.headers["x-access-token"];
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
    console.log(decoded);
    req.login = decoded.login; // ? do I even need this?
    // next();
    db.query(
      SELECT_USER_BY_LOGIN,
      [decoded.login],
      (err, results) => {
        if (err) {
          console.log("error: ", err);
          res.send({ status: "fail" });
        } else {
          console.log(results);
          res.status(200).send(results[0]);
        }
      }
    );

    // res.sendStatus(200);
  });
};

// UPDATE
User.updateUserData = (req, res) => {
  const user = req.body;
  db.query(UPDATE_USER, [user, user.login], (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log("Product updated, id: " + user.login, results.message);
      res.status(200).send({ message: "success" });
    }
  })

}

module.exports = User;