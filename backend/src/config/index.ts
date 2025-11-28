import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Valid JWT expiration time format (number of seconds or a string with time unit)
type JwtExpire = number | `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}`;

interface Config {
  port: number;
  mongodbUri: string;
  jwtSecret: string;
  jwtExpire: number | string;  // Can be number (seconds) or string (e.g., '7d')
  frontendUrl: string;
  nodeEnv: string;
}

// Validate required environment variables
const validateEnv = (): Config => {
  const requiredEnvVars = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }

  // Validate JWT_SECRET strength in production
  if (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET!.length < 32) {
    throw new Error(
      'JWT_SECRET must be at least 32 characters long in production environment.'
    );
  }

  // Parse JWT expire time
  let jwtExpire: JwtExpire = '7d'; // default
  if (process.env.JWT_EXPIRE) {
    // If it's a number, parse it
    if (/^\d+$/.test(process.env.JWT_EXPIRE)) {
      jwtExpire = parseInt(process.env.JWT_EXPIRE, 10);
    } 
    // If it's a valid time string (e.g., '1h', '30m', '7d')
    else if (/^\d+[smhdwy]$/.test(process.env.JWT_EXPIRE)) {
      jwtExpire = process.env.JWT_EXPIRE as JwtExpire;
    } else {
      console.warn(`Invalid JWT_EXPIRE format: ${process.env.JWT_EXPIRE}. Using default '7d'`);
    }
  }

  return {
    port: parseInt(process.env.PORT!, 10),
    mongodbUri: process.env.MONGODB_URI!,
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpire,
    frontendUrl: process.env.FRONTEND_URL!,
    nodeEnv: process.env.NODE_ENV || 'development',
  };
};

// Export validated configuration
export const config = validateEnv();

// Export individual config values for convenience
export const {
  port,
  mongodbUri,
  jwtSecret,
  jwtExpire,
  frontendUrl,
  nodeEnv,
} = config;

// Type export
export type { Config };




