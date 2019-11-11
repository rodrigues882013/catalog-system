import express from 'express';
import controller from './collection.controller'

export default express.Router()
    .post('/', controller.create)
    .get('/', controller.findAll)
    .get('/:id', controller.findById);
