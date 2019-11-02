import pool from '../../common/database/config';

class CollectionDatabase {

  findAll() {
    pool.query('SELECT * FROM collection', (error, result) => {
      if (error) throw error;
      return Promise.resolve(result);
    });
  }

  findBy(id) {
    pool.query('SELECT * FROM collection WHERE ?', id, (error, result) => {
      if (error) throw error;
      return Promise.resolve(result);
    });
  }

  create(collection) {
    pool.query('INSERT INTO collection SET ?', collection, (error, result) => {
      if (error) throw error;
      return Promise.resolve(result.insertId);
    });
  }
}

export default new CollectionDatabase();
