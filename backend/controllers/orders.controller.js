const db = require("../config/db.config");
const dbCommands = require("../config/dbCommands.config");
const c = dbCommands.ordersCommands;
const ifDbErr = dbCommands.ifDbErr;

const checkOrderProductsProvided = (data, res) => {
  if (!data.order || !data.products) {
    res.status(403).send({
      message: "No order and/or products provided!",
    });
    throw console.log("No order and/or products provided!");
  }
};

exports.createNewOrder = (req, res) => {
  const newOrder = req.body.order;
  const products = req.body.products;
  checkOrderProductsProvided(req.body, res);

  db.query(c.INSERT_INTO_ORDERS, newOrder, (err, results) => {
    
    ifDbErr(err, res);

    if (results) {
      console.log("New order added, id: " + results.insertId);
      
      products.forEach((product) => {
        const orderDetails = {
          detailOrderId: results.insertId,
          detailProductId: product.productId,
          detailName: product.productName,
          detailPrice: product.productPrice,
          detailQuantity: product.quantity,
        };
        db.query(
          c.INSERT_INTO_ORDER_DETAILS,
          orderDetails,
          (detailsErr, detailsResults) => {
            ifDbErr(detailsErr, res);
            if (detailsResults) {
              console.log(
                "New orderDetails added, id: " + detailsResults.insertId
              );
            }
          }
        );
      });
      res.status(200).send({ message: "New order successfully created!" });
    }
  });
};

// READ (GET)
// /:userId
exports.showUserOrders = (req, res) => {
  const userId = req.params.userId;
  db.query(c.SELECT_ORDERS_BY_USER_ID + userId, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      res.status(200).send(results);
    }
  });
};

// /details/:orderId
exports.showOrderDetails = (req, res) => {
  const orderId = req.params.orderId;
  db.query(c.SELECT_ORDER_DETAILS_BY_ORDER_ID + orderId, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      res.status(200).send(results);
    }
  });
};

// UPDATE (PATCH)

// DELETE (DELETE)
