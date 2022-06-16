const db = require("../config/db.config");
const dbCommands = require("../config/dbCommands.config");
const c = dbCommands.ordersCommands;

// if product is in orderDetails (foreign key conflict)
module.exports = (req, res, next) => {
  const productId = req.params.productId;
  db.query(c.SELECT_ORDER_DETAILS_BY_PRODUCT_ID + productId, (err, results) => {
    if (err) {
      console.log("mySQL error:", err);
      return res.status(400).send({
        message: "Backend/DB error",
      });
    }
    if (results.length >= 1) {
      console.log("Product is in Orders (orderDetails), can't delete it!");
      return res.status(409).send({
        message: "Product is in Orders (orderDetails), can't delete it!",
      });
    }
    next();
  });
};
