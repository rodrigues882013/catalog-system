import collectionService from '../../services/collection.service';

export class CollectionController {
  all(req, res) {
    collectionService.all()
      .then(r => res.json(r));
  }

  byId(req, res) {
    collectionService
      .byId(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      });
  }

  create(req, res) {
    collectionService
      .create(req.body.name)
      .then(r => res
        .status(201)
        .location(`/api/v1/examples/${r.id}`)
        .json(r));
  }
}

export default new CollectionController();
