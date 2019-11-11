import log from '../../../common/logger';
import * as mysql from "mysql2/promise";

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
};

// Create a MySQL pool
const pool = mysql.createPool(config);
export default pool;
