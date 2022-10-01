import { Router } from "express";

// Routers
import { userRouter, authRouter, categoryRouter,productRouter } from "./routes/";

// Middlewares
import { authenticate } from "./middlewares";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", authenticate, userRouter);
router.use("/category", authenticate,categoryRouter);

router.use("/product", authenticate,productRouter);
export { router };
