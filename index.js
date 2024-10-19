import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import connectionToDatabase from "./db/db.js";

// Connect to the database
connectionToDatabase().then(r => {});

// Create an Express app
const app = express();

// CORS configuration
const corsOptions = {
    origin: "https://rekcianf.vercel.app", // Ensure this matches exactly
    credentials: true, // Allows credentials (like cookies) to be sent
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Explicitly declare allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight across all routes

app.use(express.json());
app.use('/public', express.static('public'));
app.use(express.static('public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);

// Start the server
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
