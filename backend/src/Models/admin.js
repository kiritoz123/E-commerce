const db = require("../Configs/dbMysql");
const _ = require("underscore");

const adminModel = {
  viewCustomersById: (id) => {
    let queryStr = "SELECT * FROM customer WHERE customer.id = ?";
    return new Promise((resolve, reject) => {
      db.query(queryStr, [id], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  viewVendorsById: (id) => {
    let queryStr = "SELECT * FROM seller WHERE seller.id = ?";
    return new Promise((resolve, reject) => {
      db.query(queryStr, [id], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  viewAllCustomers: () => {
    let queryStr = "SELECT * FROM customer";
    return new Promise((resolve, reject) => {
      db.query(queryStr, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  viewAllVendors: () => {
    let queryStr = "SELECT * FROM seller";
    return new Promise((resolve, reject) => {
      db.query(queryStr, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};

module.exports = adminModel;
