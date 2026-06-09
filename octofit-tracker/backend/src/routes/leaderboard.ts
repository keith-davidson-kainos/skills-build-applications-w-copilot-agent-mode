import { LeaderboardEntry } from '../models';
import { createResourceRouter } from './resourceRouter';

export const leaderboardRouter = createResourceRouter(LeaderboardEntry);