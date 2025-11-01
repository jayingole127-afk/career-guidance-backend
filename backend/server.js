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
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import assessmentRoutes from "./routes/assessment.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
connectDB();

const app = express();

// === CORS SETUP: ADD BOTH LOCAL + DEPLOYED FRONTEND URLS ===
app.use(cors({
  origin: [
    "http://localhost:3000", // local React dev server
    "https://career-guidance-backend-chi.vercel.app",  // your deployed frontend - change to your real frontend URL if different!
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));