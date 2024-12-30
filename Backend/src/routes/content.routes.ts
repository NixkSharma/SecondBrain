import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createContent, deleteContent, fetchAllContent } from "../controllers/content.controller";
import AsyncHandler from "express-async-handler";
const router = Router();

router.use(authMiddleware);
router.post('/', AsyncHandler(createContent));
router.delete('/', AsyncHandler(deleteContent));
router.get('/', AsyncHandler(fetchAllContent));
export default router;