import { Router } from 'express';
import { Activity } from '../models';
import { createResourceRouter } from './resourceRouter';

const baseRouter = createResourceRouter(Activity);

// Override the list endpoint to populate user details so the frontend can
// display names instead of raw ObjectIds.
const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    const records = await Activity.find().populate('user', 'name email').lean();
    response.json(records);
  } catch (error) {
    next(error);
  }
});

// Delegate everything else (GET /:id, POST, PUT, DELETE) to the base router.
activitiesRouter.use('/', baseRouter);

export { activitiesRouter };