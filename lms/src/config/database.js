import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pg;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to Postgres DB");
  } catch (error) {
    console.log("Error connecting to Postgres DB", error);
  }
};

export default client;
