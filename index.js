import express from 'express';
import cors from 'cors';
{/*update routes into server as created*/}
import authRouter from './routes/auth.js';
import employeeRouter from './routes/employee.js';
import connectionToDatabase from "./db/db.js";

connectionToDatabase().then(r => {})
const app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(express.static('public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/employee', employeeRouter);

// Use a default port if not specified
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
