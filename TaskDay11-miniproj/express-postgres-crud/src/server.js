// src/server.js - application entry
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { PORT } from './config/config.js';

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
});
