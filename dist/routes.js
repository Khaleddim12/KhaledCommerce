"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Routers
const routes_1 = require("./routes/");
// Middlewares
const middlewares_1 = require("./middlewares");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/auth", routes_1.authRouter);
router.use("/user", middlewares_1.authenticate, routes_1.userRouter);
router.use("/category", middlewares_1.authenticate, routes_1.categoryRouter);
router.use("/product", middlewares_1.authenticate, routes_1.productRouter);
