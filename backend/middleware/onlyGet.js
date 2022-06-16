const dbCommands = require("../config/dbCommands.config");

module.exports = (req, res, next) => {
  if (dbCommands.allowCreateUpdate) {
    next();
  } else {
    console.log(
      "You dont have permission to POST, PUT, PATCH or DELETE. Only GET, sorry!"
    );
    return res.status(406).send({
      message:
        "You dont have permission to POST, PUT, PATCH or DELETE. Only GET, sorry!",
    });
  }
};
