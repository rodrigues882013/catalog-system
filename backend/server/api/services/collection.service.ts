import log from '../../common/logger';
import db from '../dao/collection.dao';
import {HttpCode} from "../models/http.code";
import errorHandler from "../middlewares/error.handler";
import {Utils} from "./utils";
import redis from "../middlewares/cache/config";

const TTL = process.env.CACHE_TTL;


class CollectionService {

    create(collection, response) {
        log.info('Creating collection');
        db.create(collection)
            .then(res => {
                collection.id = res.insertedId;
                response.status(HttpCode.Created).json(collection);
                log.info('Collection created.');
            })
            .catch(err => errorHandler(err, response))
    }

    findById(id, response) {
        log.info(`Trying to retrieve collection of id ${id}`);
        let cacheKey = `Collection#findById:${id}`;
        redis
            .get(cacheKey)
            .then( cache => {
                if (cache !== null) {
                    response.status(HttpCode.OK).json(JSON.parse(cache));

                } else {
                    db.findById(id)
                        .then(res => {
                            if (!res) {
                                errorHandler(null, response);

                            } else {
                                const transformed = Utils.toCollectionEntity(res);
                                redis.set(cacheKey, JSON.stringify(transformed), 'EX', TTL);
                                response.status(HttpCode.OK).json(transformed)
                            }
                        })
                        .catch(err => errorHandler(err, response));
                }
            })

    }

    findAll(response) {
        log.info('Trying to retrieve all collections');
        let cacheKey = 'Collection#findAll';
        redis
            .get(cacheKey)
            .then(cache => {
                if (cache != null) {
                    response.status(HttpCode.OK).json(JSON.parse(cache));

                } else {
                    db.findAll()
                        .then(res => {
                            let transformed = res.map(x => Utils.toCollectionEntity(x));
                            redis.set(cacheKey, JSON.stringify(transformed), 'EX', TTL);
                            response.status(HttpCode.OK).json(transformed)
                        })
                        .catch(err => errorHandler(err, response));
                }
            })
    }
}

export default new CollectionService();
