// src/app.js - express app config
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { requestLoggerMiddleware } from './middleware/requestLogger.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' })); // limit JSON body
app.use(morgan('dev'));                    // HTTP request logger
app.use(requestLoggerMiddleware);          // optional request-level logging

// Routes
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Express + Postgres CRUD API' }));
app.use('/api/v1/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Not Found' });
});

// Centralized error handler
app.use(errorHandler);

export default app;
