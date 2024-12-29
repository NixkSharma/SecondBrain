import { Request } from 'express';

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: string;  // Add the userId property (you can also specify a more specific type)
    }
  }
}
