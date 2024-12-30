import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createContent, deleteContent, fetchAllContent } from "../controllers/content.controller";
const router = Router();

router.use(authMiddleware);
router.post('/', createContent);
router.delete('/', deleteContent);
router.get('/', fetchAllContent);
export default router;