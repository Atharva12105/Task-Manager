import { getTaskById } from "../models/Task.model.js";

export const isOwnerOrAdmin = async (req, res, next) => {
  const taskId = req.params.id;

  const task = await getTaskById(taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Admin can access everything
  if (req.user.role === "admin") {
    return next();
  }

  // User can access only own tasks
  if (task.user_id === req.user.id) {
    return next();
  }

  return res.status(403).json({ message: "Access denied" });
};
