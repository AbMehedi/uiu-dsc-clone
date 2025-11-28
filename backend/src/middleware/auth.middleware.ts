import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload, JsonWebTokenError } from 'jsonwebtoken';
import { Admin } from '../models/Admin';
import { jwtSecret } from '../config';

// Extend JwtPayload to include our custom fields
interface CustomJwtPayload extends JwtPayload {
  id: string;
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
    }
  }
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
    }
  }
}

// Extend Express Request to include user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header or cookie
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.token;

    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }

    // Verify token with proper type assertion
    const decoded = verify(token, jwtSecret) as CustomJwtPayload;

    if (!decoded.id) {
      throw new Error('Invalid token payload');
    }

    // Get admin from database
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    // Attach user to request
    req.user = {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ error: 'Token expired' });
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
      return;
    }
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
