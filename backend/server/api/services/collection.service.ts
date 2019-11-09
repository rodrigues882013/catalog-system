import log from '../../common/logger';
import db from '../dao/collection.dao';
import {HttpCode} from "../models/http.code";
import errorHandler from "../middlewares/error.handler";
import {Utils} from "./utils";

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
    db.findById(id)
        .then(res => response.status(HttpCode.OK).json(Utils.toCollectionEntity(res)))
        .catch(err => errorHandler(err, response));
  }

  findAll(response) {
    log.info('Trying to retrieve all collections');
    db.findAll()
        .then( res => response.status(HttpCode.OK).json(res.map(x => Utils.toCollectionEntity(x))))
        .catch(err => errorHandler(err, response));
  }
}

export default new CollectionService();
