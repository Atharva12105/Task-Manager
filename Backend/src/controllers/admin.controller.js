import { getAllUsers, deleteUserById } from "../models/User.model.js";

export const listUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};

export const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    return res.status(400).json({ message: "Cannot delete self" });
  }
  await deleteUserById(req.params.id);
  res.json({ message: "User deleted" });
};
