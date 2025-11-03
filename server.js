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
      "https://career-guidance-frontend.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Career Guidance Backend is running successfully 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/ai", aiRoutes);

// ✅ Export app for Vercel (no need to app.listen here)
export default app;




// // Import dependencies
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";  // ✅ Correct path

// import authRoutes from "./routes/auth.js";  // ✅ No need for '../backend/...'
// import assessmentRoutes from "./routes/assessment.js";
// import aiRoutes from "./routes/aiRoutes.js";

// // Load environment variables
// dotenv.config(); // ✅ No path needed since .env is in same folder

// // Connect to MongoDB
// connectDB();

// // Create Express app
// const app = express();

// // Middleware
// app.use(cors({
//   origin: [
//     "http://localhost:3000",
//     "https://career-guidance-frontend.vercel.app",
//   ],
//   credentials: true,
// }));

// app.use(express.json());

// // ✅ Root route (add this before other routes)
// app.get("/", (req, res) => {
//   res.send("Career Guidance Backend is running successfully 🚀");
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/assessment", assessmentRoutes);
// app.use("/api/ai", aiRoutes);

// // Port setup
//  const PORT = process.env.PORT || 5001;

//  // Start server/
// app.listen(PORT, () => {
// console.log(`✅ Server running on port ${PORT}`);
// });