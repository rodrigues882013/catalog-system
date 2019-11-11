import Service from '../../services/disc.service';
import {Request, Response} from 'express';

export class DiscController {

    findAll(req: Request, res: Response) {

        const text = req.query.text;
        const collectionId = req.query.collectionId;

        if (text && collectionId) {
            Service.findByCollectionIdAndText(collectionId, text, res);

        } else if (text) {
            Service.findByText(text, res);

        } else if (collectionId) {
            Service.findByCollectionId(collectionId, res)

        } else {
            Service.findAll(res);
        }
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
        Service.update(id, req.body, res);
    }

    delete(req: Request, res: Response): void {
        const id = Number.parseInt(req.params['id']);
        Service.delete(id, res);
    }
}

export default new DiscController();
