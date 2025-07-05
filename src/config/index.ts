import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  DB_URI: process.env.DB_URI || '',
  DB_NAME: process.env.DB_NAME || 'test',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};

export default config;
