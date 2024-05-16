const express = require("express");
const productController = require("../Controllers/product");
const imgUpload = require("../Helpers/Middlewares/imgUpload");

const productRouter = express.Router();

productRouter.get("/", productController.getProduct);
productRouter.get("/:id", productController.getProductById);
productRouter.get(
	"/seller/:id",
	productController.getProductBySellerId
);
productRouter.get(
	"/admin/:id",
	productController.getProductByAdminId
);
productRouter.get(
	"/admincus/:id",
	productController.getCustomerByAdminId
);
productRouter.get(
	"/adminsel/:id",
	productController.getSellerByAdminId
);
productRouter.post("/", imgUpload.multiUpload, productController.addNewProduct);
productRouter.patch(
	"/:id",
	imgUpload.multiUpload,
	productController.updateProduct
);
productRouter.delete("/delete/:id", productController.deleteProduct);

module.exports = productRouter;