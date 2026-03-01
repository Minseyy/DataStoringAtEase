import express from 'express';
import { googleAuth, googleCallback } from '../controllers/google.controller';
import {authMiddleware} from "../middleware/auth.middleware"

const router = express.Router();

router.get("/auth", googleAuth);
router.get("/callback", googleCallback);

router.get("/auth", authMiddleware, googleAuth);
router.get("/callback", authMiddleware, googleCallback);

export default router;