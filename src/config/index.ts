import 'dotenv/config';

export const Config = {
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  db:{
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'user': process.env.DB_USER,
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME
  }
}