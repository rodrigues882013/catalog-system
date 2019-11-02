import mysql from 'mysql';

const config = {
  host: 'localhost',
  user: 'root',
  password: 'dasd',
  database: 'api',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

export default pool;
