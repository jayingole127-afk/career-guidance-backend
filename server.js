// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// import assessmentRoutes from "./routes/assessment.js";
// import aiRoutes from "./routes/aiRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/assessment", assessmentRoutes);
// app.use("/api/ai", aiRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import assessmentRoutes from "./routes/assessment.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/ai", aiRoutes);

// Simple test GET endpoint for /api/users
app.get('/api/users', (req, res) => {
  res.json({ message: "Users endpoint working!" });
});

// Optional health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));