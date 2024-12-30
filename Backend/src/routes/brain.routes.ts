import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { shareLink } from "../controllers/brain.controller";
const router = Router();

router.use(authMiddleware);
router.post('/share', shareLink);

export default router;