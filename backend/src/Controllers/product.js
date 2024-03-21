const productModel = require("../Models/product");
const formResponse = require("../Helpers/Forms/formResponse");
const { DateTime } = require("luxon");

const productController = {
	getProduct: (req, res) => {
		productModel
			.getProduct(req.query)
			.then((data) => {
				formResponse.pagination(req, res, data);
			})
			.catch((err) => {
				formResponse.error(res, err);
			});
	},
	getProductById: (req, res) => {
		productModel
			.getProductById(req.params.id)
			.then((data) => {
				formResponse.success(res, data);
			})
			.catch((err) => {
				formResponse.error(res, err);
			});
	},
	getProductBySellerId: function (req, res) {
		productModel
			.getProductBySellerId(req.params.id)
			.then((data) => {
				formResponse.success(res, data);
			})
			.catch((err) => {
				formResponse.error(res, err);
			});
	},
	getProductByAdminId: function (req, res) {
		productModel
			.getProductBySellerId(req.params.id)
			.then((data) => {
				formResponse.success(res, data);
			})
			.catch((err) => {
				formResponse.error(res, err);
			});
	},
	addNewProduct: (req, res) => {
		productModel
			.addNewProduct(req.body)
			.then((data) => {
				const responseData = {
					...req.body,
					id: data.insertId,
					added_at: DateTime.local().toISODate(),
					msg: "Add Product Sucessfull",
				};
				formResponse.success(res, responseData, 201);
			})
			.catch((err) => {
				formResponse.error(res, err, 500);
			});
	},
	updateProduct: (req, res) => {
		productModel
			.updateProduct(req.body)
			.then((data) => {
				const responseData = {
					...req.body,
					msg: "Update Sucessfull",
				};
				formResponse.success(res, responseData, data, 201);
			})
			.catch((err) => {
				formResponse.error(res, err, 500);
			});
	},
	deleteProduct: (req, res) => {
		productModel
			.deleteProduct(req.params.id)
			.then((data) => {
				const responseData = {
					id: data.insertId,
					...req.body,
					msg: `Delete Product with id: ${req.params.id} was Successful`,
				};
				formResponse.success(res, responseData, data, 200);
			})
			.catch((err) => {
				formResponse.error(res, err, 500);
			});
	},
};

module.exports = productController;
