import {Router} from "express";
import userRouter from "./user.routes"
import contentRouter from "./content.routes"
import brainRouter from "./brain.routes"
const router = Router();

router.use('/user', userRouter);
router.use('/content', contentRouter);
router.use('/brain', brainRouter);
export default router;

