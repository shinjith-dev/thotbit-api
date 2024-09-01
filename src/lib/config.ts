import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3001;

export const DB = {
  BASE: process.env.D1_BASE || "",
  API_KEY: process.env.D1_API_KEY || "",
  DB_ID: process.env.D1_DB_ID || "",
  ACCOUNT_ID: process.env.D1_ACCOUNT_ID,
};
