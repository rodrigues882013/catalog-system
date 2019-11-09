import log from '../../common/logger';
import db from '../dao/disc.dao';
import Disc from '../models/disc';
import {Utils} from "./utils";
import errorHandler from "../middlewares/error.handler";
import {HttpCode} from "../models/http.code";
import redis from "../middlewares/cache/config";

const TTL = process.env.CACHE_TTL;

class DiscService {
    findByText(text, response) {
        let cacheKey = `Disc#findDiscsByText#text=${text}`;
        redis
            .get(cacheKey)
            .then( cache => {
                if (cache !== null) {
                    response.status(HttpCode.OK).json(JSON.parse(cache));

                } else {
                    db.findDiscsByText(text)
                        .then(res => this.successCallback(res, response, cacheKey))
                        .catch(err => errorHandler(err, response))
                }
            });
    }

    findByCollectionId(collectionId, response) {
        let cacheKey = `Disc#findDiscsByCollectionId#collectionId=${collectionId}`;

        redis
            .get(cacheKey)
            .then( cache => {
                if (cache !== null) {
                    response.status(HttpCode.OK).json(JSON.parse(cache));
                } else {
                    db.findDiscsByCollectionId(collectionId)
                        .then(res => this.successCallback(res, response, cacheKey))
                        .catch(err => errorHandler(err, response))
                }
            });
    }

    findByCollectionIdAndText(collectionId, text, response) {
        let cacheKey = `Disc#findByTextAndCollectionId#text=${text}&collectionId=${collectionId}`;
        redis
            .get(cacheKey)
            .then( cache => {
                if (cache !== null) {
                    response.status(HttpCode.OK).json(JSON.parse(cache));
                } else {
                    db.findByTextAndCollectionId(text, collectionId)
                        .then(res => this.successCallback(res, response, cacheKey))
                        .catch(err => errorHandler(err, response))
                }
            });

    }

    findAll(response) {
        let cacheKey = 'Disc#findAll';
        redis
            .get(cacheKey)
            .then( cache => {
                if (cache !== null) {
                    response.status(HttpCode.OK).json(JSON.parse(cache));
                } else {
                    db.findAll()
                        .then(res => this.successCallback(res, response, cacheKey))
                        .catch(err => errorHandler(err, response))
                }
            });
    }

    findById(id, response) {
        let cacheKey = `Disc#findById:${id}`;
        redis
            .get(cacheKey)
            .then( cache => {
                if (cache !== null) response.status(HttpCode.OK).json(JSON.parse(cache));
                else {
                    db.findById(id)
                        .then(res => {
                            if (!res) errorHandler(null, response);
                            else {
                                const transformed = Utils.toDiscEntity(res);
                                redis.set(cacheKey, JSON.stringify(transformed), 'EX', TTL);
                                response.status(HttpCode.OK).json(transformed);
                            }
                        })
                        .catch(err => errorHandler(err, response))
                }
            });
    }

    create(disc: Disc, response) {
        log.info('Creating disc');
        db.create(disc)
            .then( res => {
                disc.id = res.insertedId;
                response.status(HttpCode.Created).json(disc)
                log.info('Disc created.');
            })
            .catch(err => errorHandler(err, response))

    }

    update(id: number, disc: Disc, response) {
        log.info('Updating disc');
        let cacheKey = `Disc#findById:${id}`;

        db.update(id, disc)
            .then( res => {
                disc.id = id;
                response.status(HttpCode.OK).json(disc);
                redis.del(cacheKey);
                log.info('Disc updated.');
            })
            .catch(err => errorHandler(err, response))
    }

    delete(id: number, response) {
        log.info(`Deleting disc with id: ${id}`);
        let cacheKey = `Disc#findById:${id}`;
        db.delete(id)
            .then( () => {
                log.info('Deleted with success');
                response.status(HttpCode.NoContent).json({'message': 'Entity was deleted with success'})
                redis.del(cacheKey)
            })
            .catch(err => errorHandler(err, response));
    }

    private successCallback(res, response, cacheKey) {
        const transformed = res.map(x => Utils.toDiscEntity(x));
        redis.set(cacheKey, JSON.stringify(transformed), 'EX', TTL);
        response.status(HttpCode.OK).json(transformed);
    }
}

export default new DiscService();
