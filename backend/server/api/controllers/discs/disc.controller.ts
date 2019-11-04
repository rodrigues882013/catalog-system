import Service from '../../services/disc.service';
import {Request, Response} from 'express';

export class DiscController {
  findAll(req: Request, res: Response) {
    Service.findAll({text: req.query.text, collectionId: req.query.collectionId}, res);
  }

  findById(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id']);
    Service.findById(id, res);
  }

  create(req: Request, res: Response): void {
    Service.create(req.body, res)
  }

  update(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id']);
    Service.update(id, req.body).then(r =>
      res
        .status(200)
        .location(`/api/v1/discs/${r.id}`)
        .json(r),
    );
  }

  delete(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id']);
    Service.delete(id).then(r => res.json(r));
  }
}

export default new DiscController();
