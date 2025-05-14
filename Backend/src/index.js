import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { clerkMiddleware } from '@clerk/express'
import {fileUpload} from 'express-fileupload';
import path from 'path';

// Import routes
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
const __dirname = path.resolve(); // Get the current directory name

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({ origin:"localhost:5173",credentials:true})); // Enable CORS for all routes 

app.use(clerkMiddleware()); // Use Clerk middleware for authentication, req.auth will be populated with user info
app.use(fileUpload({
  useTempFiles: true, // Use temporary files for uploads
  tempFileDir: path.join(__dirname, 'tmp'), // Temporary directory for file uploads
  createParentPath: true,// Create parent directories if they don't exist
  limits: { fileSize: 50 * 1024 * 1024 }, // Set file size limit to 50MB
})); // Enable file upload handling


app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songsRoutes);
app.use("/api/albums",albumsRoutes);
app.use("/api/stats",statsRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: process.env.NODE_ENV ==="production" ? 'Internal server error' : err.message }); // Send a generic error response
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});