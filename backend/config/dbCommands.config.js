const userTableName = "customers";
const productsTableName = "products";
const ordersTableName = "orders";
const orderDetailsTableName = "orderdetails";

const allowCreateUpdate = true;

const ifDbErr = (err, res) => {
  if (err) {
    res.status(400).send({
      message: "Backend/DB error",
    });
    console.log("mySQL error:", err);
    return err;
  }
};

const userCommands = {
  INSERT_INTO_USERS: `INSERT INTO ${userTableName} SET ?`,
  SELECT_USER_BY_LOGIN: `SELECT * FROM ${userTableName} WHERE login = ?`,
  UPDATE_USER: `UPDATE ${userTableName} SET ? WHERE login = ?`,
};
const productsCommands = {
  INSERT_INTO_PRODUCTS: `INSERT INTO ${productsTableName} SET ?`,
  SELECT_ALL_PRODUCTS: `SELECT * FROM ${productsTableName}`,
  SELECT_PRODUCT_BY_ID: `SELECT * FROM ${productsTableName} WHERE productId = `,
  UPDATE_PRODUCT: `UPDATE ${productsTableName} SET ? WHERE productId = `,
  DELETE_FROM_PRODUCTS_ID: `DELETE FROM ${productsTableName} WHERE productId = `,
};
const ordersCommands = {
  INSERT_INTO_ORDERS: `INSERT INTO ${ordersTableName} SET ?`,
  SELECT_ORDERS_BY_USER_ID: `SELECT * FROM ${ordersTableName} WHERE orderCustomerId = `,
  INSERT_INTO_ORDER_DETAILS: `INSERT INTO ${orderDetailsTableName} SET ?`,
  SELECT_ORDER_DETAILS_BY_ORDER_ID: `SELECT * FROM ${orderDetailsTableName} WHERE detailOrderId = `,
  SELECT_ORDER_DETAILS_BY_PRODUCT_ID: `SELECT * FROM ${orderDetailsTableName} WHERE detailProductId = `,
};

const dbCommands = {
  ifDbErr: ifDbErr,
  userCommands: userCommands,
  productsCommands: productsCommands,
  ordersCommands: ordersCommands,
  allowCreateUpdate: allowCreateUpdate,
};

module.exports = dbCommands;
