import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';

// Custom modules
import db from './src/config/db.js'
import musicRoutes from './src/routes/musicRoutes.js'

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;


// Middlewares
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
db();


// API Routes
app.use('/api/music', musicRoutes);

// Server Listen
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});