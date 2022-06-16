const router = require("express").Router();

const UserController = require("../controllers/user.controller");
const authJwt = require("../middleware/authJwt");
const verifySingup = require("../middleware/verifySingup");
const AuthController = require("../controllers/auth.controller");
//
const onlyGetRequest = require("../middleware/onlyGet")
//

router.route("/register")
.post(verifySingup, onlyGetRequest, UserController.singup);
router.route("/login")
.post(UserController.login);
router.route("/authorized")
.get(authJwt, UserController.showUserDataByLogin)
.patch(authJwt, onlyGetRequest, UserController.update);
router.route("/auth")
.get(AuthController.verifyToken);

module.exports = router;