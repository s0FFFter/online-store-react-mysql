const router = require("express").Router();

const ProductsController = require("../controllers/products.controller");
const isAdmin = require("../middleware/verifyRole"); // todo, right now always next();
const upload = require("../middleware/fileUpload"); // upload file/image middleware
const isInOrders = require("../middleware/verifyProduct"); // check product in orders middleware
//
const onlyGetRequest = require("../middleware/onlyGet");
//

router
  .route("/")
  .get(ProductsController.showAllProducts)
  .post(
    onlyGetRequest,
    upload.single("productImage"),
    ProductsController.createProduct
  );

router
  .route("/noimage")
  .post(onlyGetRequest, ProductsController.createProductNoImage);

router
  .route("/:productId")
  .get(ProductsController.showProductById)
  .patch(isAdmin, onlyGetRequest, ProductsController.updateProduct)
  .delete(
    isAdmin,
    isInOrders,
    onlyGetRequest,
    ProductsController.deleteProduct
  );

module.exports = router;
