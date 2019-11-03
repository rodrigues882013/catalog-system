import log from '../../common/logger';
import db from '../dao/disc.dao';
import Disc from '../models/disc';

class DiscService {
  findAll(parameter=null): Promise<Disc[]> {
    log.info(`${this.constructor.name}.all()`);

    if (parameter.text && parameter.collectionId) return db.findAll();
    if (parameter.text) return db.findDiscsByText(parameter.text);
    if (parameter.collectionId) return db.findDiscsByCollectionId(parameter.collectionId);

    return db.findAll();
  }

  findById(id): Promise<Disc> {
    log.info(`${this.constructor.name}.byId(${id})`);
    return db.findById(id);
  }

  create(disc: Disc): Promise<Disc> {
    log.info('Creating collection');
    return db.create(disc);
  }

  findByTest(text: string): Promise<Disc[]> {
      return db.findDiscsByText(text);
  }

  findByCollectionId(collectionId: number): Promise<Disc[]> {
      return db.findDiscsByCollectionId(collectionId);
  }

  update(id: number, disc: Disc): Promise<Disc> {
      return db.update(id, disc);
  }

   delete(id: number): Promise<void> {
      return db.delete(id);
  }
}

export default new DiscService();
