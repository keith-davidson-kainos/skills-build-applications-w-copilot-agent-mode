import { Router } from 'express';
import { LeaderboardEntry } from '../models';
import { createResourceRouter } from './resourceRouter';

const baseRouter = createResourceRouter(LeaderboardEntry);

// Override the list endpoint to populate user and team details so the frontend
// can display names instead of raw ObjectIds.
const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    const records = await LeaderboardEntry.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .lean();
    response.json(records);
  } catch (error) {
    next(error);
  }
});

// Delegate everything else (GET /:id, POST, PUT, DELETE) to the base router.
leaderboardRouter.use('/', baseRouter);

export { leaderboardRouter };