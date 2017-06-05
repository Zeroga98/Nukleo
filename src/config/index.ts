import 'dotenv/config';

export const Config = {
  PORT: process.env.PORT,
  SECRET: process.env.JWT_SECRET,
  MQTT_PORT: process.env.MQTT_PORT,
  SOCKET_PORT: process.env.SOCKET_PORT,
  DB:{
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'user': process.env.DB_USER,
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME
  }
}