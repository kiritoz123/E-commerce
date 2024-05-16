const adminModel = require("../Models/admin");
const formResponse = require("../Helpers/Forms/formResponse");

const adminController = {
  viewCustomersById: (req, res) => {
    adminModel
      .viewCustomersById(req.params.id)
      .then((data) => {
        formResponse.success(res, data);
      })
      .catch((err) => {
        formResponse.error(res, err);
      });
  },
  viewVendorsById: (req, res) => {
    adminModel
      .viewVendorsById(req.params.id)
      .then((data) => {
        formResponse.success(res, data);
      })
      .catch((err) => {
        formResponse.error(res, err);
      });
  },
  viewAllCustomers: (req, res) => {
    adminModel
      .viewAllCustomers(req.params.id)
      .then((data) => {
        formResponse.success(res, data);
      })
      .catch((err) => {
        formResponse.error(res, err);
      });
  },
  viewAllVendors: (req, res) => {
    adminModel
      .viewAllVendors(req.params.id)
      .then((data) => {
        formResponse.success(res, data);
      })
      .catch((err) => {
        formResponse.error(res, err);
      });
  },
};

module.exports = adminController;