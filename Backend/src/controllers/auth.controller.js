import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/User.model.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashed, "user");

  res.status(201).json(user);
};

export const login = async (req, res) => {
    const { email, password, loginAs } = req.body;
  
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    // 🔥 ROLE VALIDATION
    if (loginAs !== user.role) {
      return res.status(403).json({
        message: `You are not allowed to login as ${loginAs}`
      });
    }
  
    const token = generateToken({
      id: user.id,
      role: user.role,
      email: user.email
    });
  
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  };
  
