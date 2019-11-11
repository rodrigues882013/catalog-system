import { Application } from 'express';
import discRouter from './api/controllers/discs/router';
import collectionRouter from './api/controllers/collections/router';

export default function routes(app: Application): void {
  app.use('/api/v1/discs', discRouter);
  app.use('/api/v1/collections', collectionRouter);
};
