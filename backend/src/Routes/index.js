const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");
const transactionRouter = require("./transaction");
const adminRouter = require("./admin");
// const chatRouter = require("./chat");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
// router.use("/chat",chatRouter);
router.use("/product", productRouter);
router.use("/order", transactionRouter);

module.exports = router;
