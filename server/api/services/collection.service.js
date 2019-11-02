import log from '../../common/logger';
import db from './collection.db.service';

class CollectionService {

  static findAll() {
    log.info(`${this.constructor.name}.all()`);
    return db.findAll();
  }

  static findById(id) {
    log.info(`${this.constructor.name}.byId(${id})`);
    return db.findBy(id);
  }

  static create(collection) {
    return db.create(collection);
  }
}

export default CollectionService;
