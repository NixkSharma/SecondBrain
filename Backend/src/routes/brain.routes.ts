import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { shareLink } from "../controllers/brain.controller";
import AsyncHandler from "express-async-handler";

const router = Router();

router.use(authMiddleware);
router.post('/share', AsyncHandler(shareLink));

export default router;