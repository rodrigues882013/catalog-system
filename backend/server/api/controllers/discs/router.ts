import express from 'express';
import controller from './disc.controller';

export default express.Router()
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete)
    .get('/', controller.findAll)
    .get('/:id', controller.findById);
