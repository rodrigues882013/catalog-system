import IOperation from './db.operation';
import pool from '../middlewares/database/config';
import Disc from "../models/disc";
import log from "../../common/logger";

export class DiscDAO implements IOperation<Disc> {

    public async create(elem: Disc): Promise<any> {
        return await pool
            .getConnection()
            .then(conn => {
                let res;
                try {
                    conn.beginTransaction();
                    res = conn.execute('INSERT INTO `pb`.`disc` (title, text, collection_id) VALUE (?, ?, ?)',
                        [elem.title, elem.text, elem.collection.id]);
                    conn.commit();

                } catch (e) {
                    conn.rollback();
                } finally {
                    conn.release();
                }
                return res;
            })
            .catch(err => log.error(err));
    }

    public async delete(id: number): Promise<any> {
        return await pool
            .getConnection()
            .then(conn => {
                let res;
                try {
                    conn.beginTransaction();
                    res = conn.execute('DELETE FROM `pb`.`disc` WHERE id=?', [id]);
                    conn.commit();
                } catch (e) {
                    conn.rollback();

                } finally {
                    conn.release();
                }

                return res;
            })
            .catch(err => log.error(err));
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

    public async update(id: number, elem: Disc): Promise<any> {

        return await pool
            .getConnection()
            .then(conn => {
                let res;
                try {
                    conn.beginTransaction();
                    res = conn.execute('UPDATE `pb`.`disc` SET title=?, text=?, collection_id=? WHERE id=?',
                        [elem.title, elem.text, elem.collection.id, id]);
                    conn.commit();
                } catch (e) {
                    conn.rollback();
                } finally {
                    conn.release();
                }

                return res;

            })
            .catch(err => log.error(err));
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
                const pttr = `%${text}%`;
                const res = conn.execute('SELECT d.id disc_id, d.title disc_title, d.text disc_text, d.collection_id collection_id, c.title collection_title, c.description collection_description FROM `pb`.`disc` d INNER JOIN `pb`.`collection` c ON d.collection_id = c.id WHERE d.text LIKE ?', [pttr]);
                conn.release();
                return res;
            })
            .catch( err => log.error(err));
        return rows
    }

    public async findByTextAndCollectionId(text: string, collectionId: number): Promise<Disc[]> {
        const [rows]: [Disc[]] = await pool
            .getConnection()
            .then(conn => {
                const pttr = `%${text}%`;
                const res = conn.execute('SELECT d.id disc_id, d.title disc_title, d.text disc_text, d.collection_id collection_id, c.title collection_title, c.description collection_description FROM `pb`.`disc` d INNER JOIN `pb`.`collection` c ON d.collection_id = c.id WHERE d.collection_id=? AND d.text LIKE ?', [collectionId, pttr]);
                conn.release();
                return res;
            })
            .catch( err => log.error(err));
        return rows
    }

}

export default new DiscDAO();
