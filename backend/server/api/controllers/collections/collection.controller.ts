import Service from '../../services/collection.service';
import { Request, Response } from 'express';

export class CollectionController {
  findAll(req: Request, res: Response): void {
    Service.findAll().then(r => res.json(r));
  }

  findById(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id'])
    Service.findById(id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    Service.create(req.body.name).then(r =>
      res
        .status(201)
        .location(`/api/v1/collections/${r.id}`)
        .json(r),
    );
  }
}
export default new CollectionController();
