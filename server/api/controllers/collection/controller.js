import CollectionService from '../../services/collection.service';

export class CollectionController {
  findAll(req, res) {
    CollectionService.findAll()()
      .then(r => res.json(r));
  }

  findById(req, res) {
    CollectionService
      .findById(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      });
  }

  create(req, res) {
    CollectionService
      .create(req)
      .then(r => res
        .status(201)
        .location(`/api/v1/collections/${r.id}`)
        .json(r));
  }
}

export default new CollectionController();
