import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDBConnection } from './config/db.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        message: "Hello from server!"
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await testDBConnection();
});