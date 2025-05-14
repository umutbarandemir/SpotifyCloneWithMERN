import { Router } from "express";
import { createSong , deleteSong , createAlbum , deleteAlbum , checkAdmin} from "../controllers/adminController.js";
import { protectRoute , requireAdmin} from "../middleware/authMiddleware.js";

const router = Router();

// Middleware to protect routes and require admin access for all routes in this file
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;