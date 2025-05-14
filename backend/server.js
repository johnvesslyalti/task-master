import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
connectDB();

const app = express();

// ✅ CORS Setup
const allowedOrigins = [
    'https://task-master-tau-five.vercel.app'  // Ensure no trailing slash
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // If using cookies or authentication headers
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
