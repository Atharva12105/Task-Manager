import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/task.controller.js";
import { isOwnerOrAdmin } from "../middlewares/ownership.middleware.js";

const router = express.Router();
router.use(verifyToken);

router.post("/", controller.createTask);
router.get("/", controller.getTasks);
router.put("/:id", isOwnerOrAdmin, controller.updateTask);
router.delete("/:id", isOwnerOrAdmin, controller.deleteTask);

export default router;
