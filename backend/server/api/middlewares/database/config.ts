import log from '../../../common/logger';
import * as mysql from "mysql2";

const config = {
  host: '192.168.99.100',
  user: 'user',
  password: 'password',
  database: 'db',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      log.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      log.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      log.error('Database connection was refused.');
    }
  }
  if (connection) {
    connection.release();
  }
});

export default pool;
