import axios from "axios";
import { DB } from "./config";

const DB_BASE = `${DB.BASE}/accounts/${DB.ACCOUNT_ID}/d1/database/${DB.DB_ID}`

const db = axios.create({
  baseURL: DB_BASE,
  headers: {
    Authorization: `Bearer ${DB.API_KEY}`
  }
})

export default db
