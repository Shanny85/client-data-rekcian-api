import express from 'express';
import cors from 'cors';
{/*update routes into server as created*/}
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import connectionToDatabase from "./db/db.js";

connectionToDatabase().then(r => {})
const app = express();
app.use(cors({
    origin: "https://rekcianf.vercel.app",
    credentials: true
}));
app.use(express.json());
app.use('/public', express.static('public'));
app.use(express.static('public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
})

