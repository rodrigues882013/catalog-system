import IOperation from './db.operation';
import pool from '../middlewares/database/config';
import Collection from "../models/collection";

export class CollectionDAO implements IOperation<Collection> {

  public async create(elem: Collection): Promise<Collection> {
     const [rows] = await pool.query('INSERT INTO `pb`.`collection` (title, description) VALUE (?, ?)',
         [elem.title, elem.description]);
     return rows[0];
  }

  public async delete(id: number) {
  }

  public async findAll(): Promise<Collection[]> {
    const [rows]: [Collection[]] = await pool.query('SELECT * FROM `pb`.`collection`');
    return rows;
  }

  public async findById(id: number): Promise<Collection> {
    const [rows]: [Collection[]] = await pool.query('SELECT * FROM `pb`.`collection` WHERE id=?', [id]);
    return rows[0]
  }

  public async update(id: number, elem: Collection): Promise<Collection> {
    const [rows]: [Collection] =
        await pool.query('UPDATE `pb`.`collection` SET title=?, description=?',
            [elem.title, elem.description]);
    return rows[0]
  }

}

export default new CollectionDAO();
