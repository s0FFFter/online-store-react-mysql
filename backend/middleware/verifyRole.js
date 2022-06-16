// todo in the future
const isAdmin = (req, res, next) => {
  if (false) {
    return res.status(401).send({
      message: "No permission, Admin only!",
    });
  }
  next();
};

module.exports = isAdmin;