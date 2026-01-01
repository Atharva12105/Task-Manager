import * as Task from "../models/Task.model.js";
import {
    getAllTasks,
    getTasksByUser
  } from "../models/Task.model.js";

export const createTask = async (req, res) => {
  const task = await Task.createTask({
    ...req.body,
    userId: req.user.id
  });
  res.status(201).json(task);
};

// export const getTasks = async (req, res) => {
//   const tasks = req.user.role === "admin"
//     ? await Task.getAllTasks()
//     : await Task.getTasksByUser(req.user.id);

//   res.json(tasks);
// };
export const getTasks = async (req, res) => {
    console.log("USER FROM TOKEN:", req.user); // 🔴 ADD THIS
    try {
      let tasks;
  
      if (req.user.role === "admin") {
        // 👑 Admin sees all tasks
        tasks = await getAllTasks();
      } else {
        // 👤 User sees only own tasks
        tasks = await getTasksByUser(req.user.id);
      }
  
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  };

export const updateTask = async (req, res) => {
  const task = await Task.updateTask(req.params.id, req.body);
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.deleteTask(req.params.id);
  res.json({ message: "Task deleted" });
};
