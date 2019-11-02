import log from '../../common/logger';
import db from './collection.db.service';

class CollectionService {
  all() {
    log.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  byId(id) {
    log.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  create(name) {
    return db.insert(name);
  }
}

export default new CollectionService();
