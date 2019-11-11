import IOperation from './db.operation';
import pool from '../middlewares/database/config';
import Collection from "../models/collection";
import Disc from "../models/disc";
import log from "../../common/logger";

export class CollectionDAO implements IOperation<Collection> {
    public async create(elem: Collection): Promise<any> {
        return await pool
            .getConnection()
            .then(conn => {
                let res;
                try {
                    conn.beginTransaction();
                    res = conn.execute('INSERT INTO `pb`.`collection` (title, description) VALUE (?, ?)',
                        [elem.title, elem.description]);
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

    delete(id: number): Promise<any> {
        return undefined;
    }

    public async findAll(): Promise<Collection[]> {
        const [rows]: [Collection[]] = await pool
            .getConnection()
            .then(conn => {
                const res = conn.execute('SELECT * FROM `pb`.`collection`');
                conn.release();
                return res;
            })
            .catch( err => log.error(err));
        return rows
    }

    public async findById(id: number): Promise<Collection> {
        const [rows]: [Collection[]] = await pool
            .getConnection()
            .then(conn => {
                const res = conn.execute('SELECT * FROM `pb`.`collection` WHERE id=?', [id]);
                conn.release();
                return res;
            })
            .catch( err => log.error(err));
        return rows[0]
    }

    update(id: number, elem: Collection): Promise<any> {
        return undefined;
    }
}

export default new CollectionDAO();
