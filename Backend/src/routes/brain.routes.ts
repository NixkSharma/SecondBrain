import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getSharedBrain, shareBrain } from "../controllers/brain.controller";
import AsyncHandler from "express-async-handler";

const router = Router();

router.use(authMiddleware);
router.post('/share', AsyncHandler(shareBrain));
router.get('/:shareLink', AsyncHandler(getSharedBrain));

export default router;