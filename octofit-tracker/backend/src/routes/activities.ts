import { Activity } from '../models';
import { createResourceRouter } from './resourceRouter';

export const activitiesRouter = createResourceRouter(Activity);