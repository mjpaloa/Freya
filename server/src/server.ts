import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { errorMiddleware } from './middleware/errorMiddleware';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Security Middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: isProduction 
    ? (process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : true) 
    : true, 
  credentials: true,
};
app.use(cors(corsOptions));

// Rate Limiting (Disabled in production for now to avoid serverless storage issues)
if (!isProduction) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api/', limiter);
}


// Optimization & Logging
app.use(compression());
app.use(morgan(isProduction ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Freya Server is running!',
    version: '1.0.0',
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api', routes);

// Centralized Error Handling (Must be after routes)
app.use(errorMiddleware);

// Export app for Vercel
export default app;

// Start Server locally
if (!isProduction) {
  app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

