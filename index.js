import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import tasksRouter from './routes/tasksRouter.js';

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Error de cors'));
    }
  },
};

app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT);
console.log('Servidor ejecutandose en el puerto ' + PORT);
