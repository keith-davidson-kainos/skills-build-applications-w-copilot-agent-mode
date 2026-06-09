import { Workout } from '../models';
import { createResourceRouter } from './resourceRouter';

export const workoutsRouter = createResourceRouter(Workout);