import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("🔴 verifyToken CALLED for:", req.method, req.originalUrl);

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token missing" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
