import Service from '../../services/collection.service';
import { Request, Response } from 'express';

export class CollectionController {

  findAll(req: Request, res: Response): void {
    Service.findAll(res);
  }

  findById(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id'])
    Service.findById(id, res);
  }

  create(req: Request, res: Response): void {
    Service.create(req.body, res)
  }
}
export default new CollectionController();
