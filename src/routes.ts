import { Router } from "express";

// Routers
import { userRouter, authRouter, categoryRouter,productRouter,cartRouter ,reivewRouter} from "./routes/";

// Middlewares
import { authenticate } from "./middlewares";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", authenticate, userRouter);
router.use("/category", authenticate,categoryRouter);
router.use("/cart", authenticate,cartRouter);
router.use("/product", authenticate,productRouter);
router.use("/review", authenticate,reivewRouter);
export { router };
