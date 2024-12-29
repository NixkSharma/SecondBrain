import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createContent } from "../controllers/content.controller";
const router = Router();

router.post('/', authMiddleware, createContent);
export default router;