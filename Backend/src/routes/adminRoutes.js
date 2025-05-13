import { Router } from "express";
import { getAdmin } from "../controllers/adminController.js";

const router = Router();

router.get("/", getAdmin);

export default router;