import collectionService from '../../services/collection.service';

export default class CollectionController {
  static findAll(req, res) {
    collectionService.findAll()()
      .then(r => res.json(r));
  }

  static findById(req, res) {
    collectionService
      .findById(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      });
  }

  static create(req, res) {
    collectionService
      .create(req)
      .then(r => res
        .status(201)
        .location(`/api/v1/collections/${r.id}`)
        .json(r));
  }
}
