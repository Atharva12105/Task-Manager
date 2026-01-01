import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { listUsers, deleteUser } from "../controllers/admin.controller.js";

const router = express.Router();
router.use(verifyToken, requireRole("admin"));

router.get("/users", listUsers);
router.delete("/users/:id", deleteUser);

export default router;
