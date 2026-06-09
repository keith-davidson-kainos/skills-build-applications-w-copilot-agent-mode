import { Team } from '../models';
import { createResourceRouter } from './resourceRouter';

export const teamsRouter = createResourceRouter(Team);