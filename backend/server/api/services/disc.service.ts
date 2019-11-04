import log from '../../common/logger';
import db from '../dao/disc.dao';
import Disc from '../models/disc';
import Collection from "../models/collection";

class DiscService {
  findAll(parameter=null, response) {
    log.info(`${this.constructor.name}.all()`);

    let result = null;

    if (parameter.text && parameter.collectionId)
      result = db.findAll();
    if (parameter.text)
      result = db.findDiscsByText(parameter.text);
    if (parameter.collectionId)
      result = db.findDiscsByCollectionId(parameter.collectionId);
    else
      result = db.findAll();

    result.then( res => response.json(res.map(x => this.toDiscEntity(x))));
  }

  findById(id, response) {
    log.info(`${this.constructor.name}.byId(${id})`);
    const result = db.findById(id);
    result.then(res => response.json(this.toDiscEntity(res)));
  }

  create(disc: Disc, response) {
    log.info('Creating collection');
    const result = db.create(disc);
    result.then( res => {
      response
          .status(201)
          .location(`/api/v1/discs/${res.id}`)
          .json(res)
    })

  }


  update(id: number, disc: Disc): Promise<Disc> {
    return db.update(id, disc);
  }

  delete(id: number): Promise<void> {
    return db.delete(id);
  }

  private toDiscEntity(res): Disc {

    const collection: Collection = {
      id: res.collection_id,
      title: res.collection_title,
      description: res.collection_description,
      discs: null
    };

    return {
      id: res.disc_id,
      title: res.disc_title,
      text: res.disc_text,
      collection: collection
    };
  }
}

export default new DiscService();
