import { Router } from "express";
import { signin, signup,  } from "../controllers/user.controller";
import AsyncHandler from "express-async-handler";
const router = Router();

router.post('/signup', AsyncHandler(signup));
router.post('/signin', AsyncHandler(signin));
export default router;