import { Router } from "express";
import { checkAuth, signin, signout, signup,  } from "../controllers/user.controller";
import AsyncHandler from "express-async-handler";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post('/signup', AsyncHandler(signup));
router.post('/signin', AsyncHandler(signin));
router.get('/signout', authMiddleware, AsyncHandler(signout));
router.get('/checkAuth', authMiddleware, AsyncHandler(checkAuth));
export default router;