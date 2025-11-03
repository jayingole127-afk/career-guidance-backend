// Import dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import authRoutes from "./routes/auth.js";
import assessmentRoutes from "./routes/assessment.js";
import aiRoutes from "./routes/aiRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://career-guidance-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Root route (basic test)
app.get("/", (req, res) => {
  res.send("Career Guidance Backend is running successfully 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/ai", aiRoutes);

// Export app for Vercel
export default app;

// ✅ Only start the server locally (NOT on Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}
