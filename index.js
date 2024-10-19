import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import connectionToDatabase from "./db/db.js";

// Load environment variables
dotenv.config();

// Connect to the database
connectionToDatabase();

// Create an Express app
const app = express();

// CORS configuration
const corsOptions = {
    origin: "https://snazzy-starburst-740f5a.netlify.app",
    credentials: true,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use('/public', express.static('public'));
app.use(express.static('public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);

// Use a default port if not specified
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
