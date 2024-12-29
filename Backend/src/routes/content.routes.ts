import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createContent, deleteContent } from "../controllers/content.controller";
const router = Router();

router.post('/', authMiddleware, createContent);
router.delete('/', authMiddleware, deleteContent);
export default router;