import IOperation from './db.operation';
import pool from '../middlewares/database/config';
import Disc from "../models/disc";

export class DiscDAO implements IOperation<Disc> {

  public async create(elem: Disc): Promise<Disc> {
    const [rows] = await pool.query('INSERT INTO `pd`.`disc` (title, description, collection_id) VALUE (?, ?, ?)',
        [elem.title, elem.description, elem.collection.id]);

    return rows[0];
  }

  public async delete(id: number): Promise<void> {
      const [rows] =  await pool.query('DELETE FROM `pd`.`disc` WHERE id=?', [id]);
      return rows[0];
  }

  public async findAll(): Promise<Disc[]> {
    const [rows]: [Disc[]] = await pool.query('SELECT * FROM `pd`.`disc`');
    return rows
  }

  public async findById(id: number): Promise<Disc> {
    const [rows]: [Disc[]] = await pool.query('SELECT * FROM `pd`.`disc` WHERE ?', [id]);
    return rows[0]
  }

  public async update(id: number, elem: Disc): Promise<Disc> {
    return pool.query('UPDATE `pd`.`disc` SET title=?, description=?',
        [elem.title, elem.description]);
  }

  public async findDiscsByCollectionId(collectionId: number): Promise<Disc[]> {
      const [rows]: [Disc[]] =  await pool.query('SELECT * FROM `pd`.`disc` WHERE collection_id=?', [collectionId]);
      return rows;
  }

  public async findDiscsByText(text: string): Promise<Disc[]> {
      const [rows]: [Disc[]] =  await pool.query('SELECT * FROM pd.disc WHERE description LIKE %?%', [text]);
      return rows
  }

}

export default new DiscDAO();
