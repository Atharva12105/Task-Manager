// import express from "express";
// import "./config/env.js";
// import authRoutes from "./routes/auth.routes.js";
// import taskRoutes from "./routes/task.routes.js";
// import adminRoutes from "./routes/admin.routes.js";
// import userRoutes from "./routes/user.routes.js";

// const app = express();
// app.use(express.json());

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/tasks", taskRoutes);
// app.use("/api/v1/admin", adminRoutes);
// app.use("/api/v1/users", userRoutes);

// export default app;
console.log("🚀 app.js LOADED");

import express from "express";
import "./config/env.js";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(cors());              // ✅ ALLOW ALL ORIGINS (DEV)
app.use(express.json()); // ✅ ONLY global middleware

app.use((req, res, next) => {
    console.log("➡️ Incoming request:", req.method, req.originalUrl);
    next();
  });
  
// ✅ PUBLIC ROUTES
app.use("/api/v1/auth", authRoutes);

// 🔒 PROTECTED ROUTES (internally protected in route files)
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", userRoutes);

export default app;
