import log from '../../common/logger';
import db from '../dao/disc.dao';
import Disc from '../models/disc';
import {Utils} from "./utils";
import errorHandler from "../middlewares/error.handler";
import {HttpCode} from "../models/http.code";

class DiscService {
  findAll(parameter=null, response) {

    let result = null;

    if (parameter.text && parameter.collectionId)
      result = db.findAll();
    else if (parameter.text)
      result = db.findDiscsByText(parameter.text);
    else if (parameter.collectionId)
      result = db.findDiscsByCollectionId(parameter.collectionId);
    else
      result = db.findAll();

    result
        .then( res => response.status(HttpCode.OK).json(res.map(x => Utils.toDiscEntity(x))))
        .catch(err => errorHandler(err, response));
  }

  findById(id, response) {
    log.info(`${this.constructor.name}.byId(${id})`);
    db.findById(id)
        .then(res => response.status(HttpCode.OK).json(Utils.toDiscEntity(res)))
        .catch(err => errorHandler(err, response));
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
    db.update(id, disc)
        .then( res => {
          disc.id = id;
          response.status(HttpCode.OK).json(disc);
          log.info('Disc updated.');
        })
        .catch(err => errorHandler(err, response))
  }

  delete(id: number, response) {
    log.info(`Deleting disc with id: ${id}`);
    db.delete(id)
        .then( () => {
          log.info('Deleted with success');
          response.status(HttpCode.NoContent).json({'message': 'Entity was deleted with success'})
        })
        .catch(err => errorHandler(err, response));
  }
}

export default new DiscService();
