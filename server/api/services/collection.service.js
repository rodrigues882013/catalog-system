import log from '../../common/logger';
import db from './collection.db.service';

class CollectionService {
  findAll() {
    log.info(`${this.constructor.name}.all()`);
    return db.findAll();
  }

  findById(id) {
    log.info(`${this.constructor.name}.byId(${id})`);
    return db.findBy(id);
  }

  create(collection) {
    log.info('Creating collection');
    return db.create(collection);
  }
}

export default new CollectionService();
