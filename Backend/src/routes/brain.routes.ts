import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getAllSharedBrains, getSharedBrain, shareBrain } from "../controllers/brain.controller";
import AsyncHandler from "express-async-handler";

const router = Router();

router.post('/share', authMiddleware, AsyncHandler(shareBrain));
router.get('/:shareLink', AsyncHandler(getSharedBrain));
router.get('/allSharedLinks', AsyncHandler(getAllSharedBrains));
export default router;