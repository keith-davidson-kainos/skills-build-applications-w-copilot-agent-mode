import { Router } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter<DocumentShape>(model: Model<DocumentShape>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const records = await model.find().lean();
      response.json(records);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const record = await model.findById(request.params.id).lean();

      if (!record) {
        response.status(404).json({ message: 'Record not found' });
        return;
      }

      response.json(record);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const record = await model.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (request, response, next) => {
    try {
      const record = await model.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
      });

      if (!record) {
        response.status(404).json({ message: 'Record not found' });
        return;
      }

      response.json(record);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (request, response, next) => {
    try {
      const record = await model.findByIdAndDelete(request.params.id);

      if (!record) {
        response.status(404).json({ message: 'Record not found' });
        return;
      }

      response.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}