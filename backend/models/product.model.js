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
const formidable = require("formidable");

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products";
const DESCRIBE_TABLE = "DESCRIBE products";
const INSERT_INTO_PRODUCTS = "INSERT INTO products SET ?";
const DELETE_FROM_PRODUCTS_ID = "DELETE FROM products WHERE productId = ";
const SELECT_PRODUCT_BY_ID = "SELECT * FROM products WHERE productId = ";
const UPDATE_PRODUCT = "UPDATE products SET ? WHERE productId = ";

const formidableOptions = {
  // multiples: true,
  uploadDir: "uploads/",
};
const form = formidable(formidableOptions);

function Product(product) {
  // this.productId = product.productId;
  this.productName = product.productName;
  this.productPrice = product.productPrice;
  this.productStock = product.productStock;
  this.productImage = product.productImage;
  this.productDesc = product.productDesc;
}
// CREATE
Product.createProduct = (req, res) => {
  form
    .on("fileBegin", (name, file) => {
      //rename the incoming file to the file's name
      if (file.name !== "") {
        file.path = form.uploadDir + file.name;
        // file.path = __dirname + '/uploads/'+ file.name;
      }
    })
    .parse(req, (err, fields, files) => {
      if (err) {
        res.write({ status: "upload fail" });
        console.log("upload error", err);
      } else {
        fields.productImage = files.productImage.path;
        db.query(INSERT_INTO_PRODUCTS, fields, (error, results) => {
          if (error) {
            console.log("mySQL error: ", error);
            res.write({ status: "sql fail" });
          } else {
            console.log("New product added, id: " + results.insertId);
            res.write({ status: "success" });
            // res.end();
          }
        });
      }
    });
  res.end();
};

Product.createProductNoImage = (req, res) => {
  console.log(req.body);
  const newProduct = req.body;
  db.query(INSERT_INTO_PRODUCTS, newProduct, (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log("New product added, id: " + results.insertId);
      res.send({ status: "success" });
    }
  });
};

// READ
Product.showAllProducts = (req, res) => {
  db.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

Product.showProductById = (req, res) => {
  const productId = req.params.id;
  // console.log(SELECT_PRODUCT_BY_ID + productId);
  db.query(SELECT_PRODUCT_BY_ID + productId, (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      res.json(results[0]);
    }
  });
};

Product.describeProductsTable = (req, res) => {
  db.query(DESCRIBE_TABLE, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// UPDATE
Product.updateProduct = (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  console.log(updatedProduct);
  db.query(UPDATE_PRODUCT + productId, updatedProduct, (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log("Product updated, id: " + productId, results.message);
      res.send({ status: "success" });
    }
  });
};

// DELETE
Product.deleteProduct = (req, res) => {
  const productId = req.params.id;
  console.log(DELETE_FROM_PRODUCTS_ID + productId);
  db.query(DELETE_FROM_PRODUCTS_ID + productId, (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log("Product deleted: " + results.affectedRows);
      res.send({ status: "success" });
    }
  });
};

module.exports = Product;