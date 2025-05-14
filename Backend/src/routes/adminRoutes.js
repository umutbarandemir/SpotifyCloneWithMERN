import { Router } from "express";
import { createSong } from "../controllers/adminController.js";
import { protectRoute , requireAdmin} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/songs",protectRoute, requireAdmin ,createSong);

export default router;