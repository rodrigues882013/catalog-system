import IOperation from './db.operation';
import pool from '../middlewares/database/config';
import Disc from "../models/disc";
import log from "../../common/logger";

export class DiscDAO implements IOperation<Disc> {

    public async create(elem: Disc): Promise<Disc> {

        const [rows]: [Disc[]] = await pool
            .getConnection()
            .then(conn => {
                const res = conn.execute('INSERT INTO `pd`.`disc` (title, description, collection_id) VALUE (?, ?, ?)',
                    [elem.title, elem.text, elem.collection.id]);
                conn.release();
                return res;
            })
            .catch( err => log.error(err));


        return rows[0];
    }

    public async delete(id: number): Promise<void> {
        const [rows] =  await pool.execute('DELETE FROM `pd`.`disc` WHERE id=?', [id]);
        return rows[0];
    }

    public async findAll(): Promise<Disc[]> {
        const [rows]: [Disc[]] = await pool
            .getConnection()
            .then(conn => {
                const res = conn.execute('SELECT d.id disc_id, d.title disc_title, d.text disc_text, d.collection_id collection_id, c.title collection_title, c.description collection_description FROM `pb`.`disc` d INNER JOIN `pb`.`collection` c ON d.collection_id = c.id');
                conn.release();
                return res;
            })
            .catch( err => log.error(err));
        return rows
    }

    public async findById(id: number): Promise<Disc> {
        const [rows]: [Disc[]] = await pool
            .getConnection()
            .then(conn => {
                const res = conn.execute('SELECT d.id disc_id, d.title disc_title, d.text disc_text, d.collection_id collection_id, c.title collection_title, c.description collection_description FROM `pb`.`disc` d INNER JOIN `pb`.`collection` c ON d.collection_id = c.id WHERE d.id=?', [id]);
                conn.release();
                return res;
            })
            .catch( err => log.error(err));
        return rows[0]
    }

    public async update(id: number, elem: Disc): Promise<Disc> {
        return pool.execute('UPDATE `pd`.`disc` SET title=?, description=?',
            [elem.title, elem.text]);
    }

    public async findDiscsByCollectionId(collectionId: number): Promise<Disc[]> {
        const [rows]: [Disc[]] = await pool
            .getConnection()
            .then(conn => {
                const res = conn.execute('SELECT d.id disc_id, d.title disc_title, d.text disc_text, d.collection_id collection_id, c.title collection_title, c.description collection_description FROM `pb`.`disc` d INNER JOIN `pb`.`collection` c ON d.collection_id = c.id WHERE d.collection_id=?', [collectionId]);
                conn.release();
                return res;
            })
            .catch( err => log.error(err));

        return rows
    }

    public async findDiscsByText(text: string): Promise<Disc[]> {
        const [rows]: [Disc[]] = await pool
            .getConnection()
            .then(conn => {
                const res = conn.execute('SELECT d.id disc_id, d.title disc_title, d.text disc_text, d.collection_id collection_id, c.title collection_title, c.description collection_description FROM `pb`.`disc` d INNER JOIN `pb`.`collection` c ON d.collection_id = c.id WHERE d.disc_text LIKE %?%', [text]);
                conn.release();
                return res;
            })
            .catch( err => log.error(err));
        return rows
    }

}

export default new DiscDAO();
