const { express } = require("../../sharedVariable");
const adminRouter = express.Router();

const adminController = require("../Controllers/admin");

adminRouter.get("/customers/:id", adminController.viewCustomersById);
adminRouter.get("/customers/all", adminController.viewAllCustomers);
adminRouter.get("/vendors/:id", adminController.viewVendorsById);
adminRouter.get("/vendors/all", adminController.viewAllVendors);

module.exports = adminRouter;