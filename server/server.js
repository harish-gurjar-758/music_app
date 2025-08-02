import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';


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


// Connect to MongoDB
db();


// API Routes


// Server Listen
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});