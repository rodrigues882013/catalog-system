import collectionRouter from './api/controllers/collection/router';

export default function routes(app) {
  app.use('/api/v1/collections', collectionRouter);
}
