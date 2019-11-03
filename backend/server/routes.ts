import { Application } from 'express';
import discRouter from './api/controllers/discs/router';
export default function routes(app: Application): void {
  app.use('/api/v1/discs', discRouter);
};
