import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
  port: number;
  mongodbUri: string;
  jwtSecret: string;
  jwtExpire: string;
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

  return {
    port: parseInt(process.env.PORT!, 10),
    mongodbUri: process.env.MONGODB_URI!,
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpire: process.env.JWT_EXPIRE || '7d',
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




