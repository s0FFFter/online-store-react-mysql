const db = require("../config/db.config");
const dbCommands = require("../config/dbCommands.config");
const c = dbCommands.productsCommands;
const ifDbErr = dbCommands.ifDbErr;

// CREATE (POST)
// /
exports.createProduct = (req, res) => {
  const newProduct = req.body;
  if (req.file) {
    newProduct.productImage = req.file.path;
  } else {
    // wrong file-type or no file at all
    newProduct.productImage = null;
  }
  db.query(c.INSERT_INTO_PRODUCTS, newProduct, (error, results) => {
    ifDbErr(error, res);
    if (results) {
      console.log("New product created, id: " + results.insertId);
      res.status(201).send({
        message: "New product created, name: " + newProduct.productName,
      });
    }
  });
};

// /noimage
exports.createProductNoImage = (req, res) => {
  const newProduct = req.body;
  db.query(c.INSERT_INTO_PRODUCTS, newProduct, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      console.log("New product created, id: " + results.insertId);
      res.status(201).send({
        message: "New product created, name: " + newProduct.productName,
      });
    }
  });
};

// READ (GET)
// /
exports.showAllProducts = (req, res) => {
  db.query(c.SELECT_ALL_PRODUCTS, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      res.status(200).send(results);
      // res.json(results);
    }
  });
};
// /:productId
exports.showProductById = (req, res) => {
  const productId = req.params.productId;
  db.query(c.SELECT_PRODUCT_BY_ID + productId, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      res.status(200).send(results[0]);
      // res.json(results);
    }
  });
};

// UPDATE (PATCH)
// /:productId
exports.updateProduct = (req, res) => {
  const productId = req.params.productId;
  const updatedProduct = req.body;
  db.query(c.UPDATE_PRODUCT + productId, updatedProduct, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      console.log("Product updated, id: " + productId, results.message);
      res.status(200).send({
        message: "Product updated! id: " + productId,
      });
    }
  });
};

// DELETE (DELETE)
// /:productId
exports.deleteProduct = (req, res) => {
  const productId = req.params.productId;
  db.query(c.DELETE_FROM_PRODUCTS_ID + productId, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      console.log("Products deleted, affectedRows: " + results.affectedRows);
      res.status(200).send({
        message: "Product deleted! id: " + productId,
      });
    }
  });
};
