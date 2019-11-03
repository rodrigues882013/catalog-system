import log from '../../common/logger';
import db from '../dao/collection.dao';

class CollectionService {
  findAll() {
    log.info(`${this.constructor.name}.all()`);
    return db.findAll();
  }

  findById(id) {
    log.info(`${this.constructor.name}.byId(${id})`);
    return db.findById(id);
  }

  create(collection) {
    log.info('Creating collection');
    return db.create(collection);
  }
}

export default new CollectionService();
