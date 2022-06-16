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

const INSERT_INTO_ORDERS = "INSERT INTO orders SET ?";
const INSERT_INTO_ORDER_DETAILS = "INSERT INTO orderdetails SET ?";
const SELECT_ORDERS_BY_USER_ID = "SELECT * FROM orders WHERE orderCustomerId = ";
const SELECT_ORDER_DETAILS_BY_ORDER_ID = "SELECT * FROM orderdetails WHERE detailOrderId = ";

function Order(order) {
  // this.orderId = order.orderId;
  this.orderNumber = order.orderNumber;
  this.orderCustomerId = order.orderCustomerId;
  this.orderAmount = order.orderAmount;
  this.orderAddres = order.orderAddres;
}

// CREATE
Order.createNewOrder = (req, res) => {
  const newOrder = req.body.order;
  const products = req.body.products;

  db.query(INSERT_INTO_ORDERS, newOrder, (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
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
          INSERT_INTO_ORDER_DETAILS,
          orderDetails,
          (detailsErr, detailsResults) => {
            if (detailsErr) {
              console.log("orderDetails error: ", detailsErr);
              // res.send({ status: "orderDetails fail" });
            } else {
              console.log(
                "New orderDetails added, id: " + detailsResults.insertId
              );
              // res.status(200).send({ message: "success" });
            }
          }
        );
      });
      res.status(200).send({ message: "success" });
    }
  });
};

// READ
Order.showUserOrders = (req, res) => {
  const userId = req.params.userId;
  db.query(SELECT_ORDERS_BY_USER_ID + userId, (err, results)=> {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log(results);
      // res.status(200).send({ message: "success" });
      res.status(200).send(results);
      // res.json(results);
    }
  })
}

Order.showOrderDetails = (req, res) => {
  const orderId = req.params.orderId;
  db.query(SELECT_ORDER_DETAILS_BY_ORDER_ID + orderId, (err, results)=> {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log(results);
      // res.status(200).send({ message: "success" });
      res.status(200).send(results);
      // res.json(results);
    }
  })
}
module.exports = Order;
