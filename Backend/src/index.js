import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import songsRoutes from './routes/songsRoutes.js';
import albumsRoutes from './routes/albumsRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import { connectDB } from './lib/db.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({ origin:"localhost:5173",credentials:true})); // Enable CORS for all routes 


app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songsRoutes);
app.use("/api/albums",albumsRoutes);
app.use("/api/stats",statsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});