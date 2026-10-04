import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDBConnection } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: "Hello from server!"
    });
});

// API routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await testDBConnection();
});