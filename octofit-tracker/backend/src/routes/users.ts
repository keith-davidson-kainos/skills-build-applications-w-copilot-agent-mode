import { User } from '../models';
import { createResourceRouter } from './resourceRouter';

export const usersRouter = createResourceRouter(User);