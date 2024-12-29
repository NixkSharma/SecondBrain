import {Router} from "express";
import userRouter from "./user.routes"
import contentRouter from "./content.routes"
const router = Router();

router.use('/user', userRouter);
router.use('/content', contentRouter);
export default router;

