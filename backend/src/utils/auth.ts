import bcrypt from 'bcrypt';
import { sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';
import { jwtSecret, jwtExpire } from '../config';

interface TokenPayload extends JwtPayload {
  id: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (id: string): string => {
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured');
  }
  
  const payload: TokenPayload = { id };

  const options: SignOptions = {
    algorithm: 'HS256',
  };

  if (typeof jwtExpire === 'number' || typeof jwtExpire === 'string') {
    options.expiresIn = jwtExpire as SignOptions['expiresIn'];
  }
  
  return sign(payload, jwtSecret, options);
};

export const verifyToken = (token: string): TokenPayload => {
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured');
  }
  
  try {
    return verify(token, jwtSecret) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
