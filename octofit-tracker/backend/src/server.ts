import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import type { ErrorRequestHandler } from 'express';
import { connectDatabase, getDatabaseConnectionState } from './config/database';
import {
  activitiesRouter,
  leaderboardRouter,
  teamsRouter,
  usersRouter,
  workoutsRouter,
} from './routes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'octofit-tracker-api',
    apiBaseUrl,
    database: getDatabaseConnectionState(),
  });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  response.status(500).json({
    message: error instanceof Error ? error.message : 'Unexpected server error',
  });
};

app.use(errorHandler);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit Tracker API', error);
    process.exit(1);
  }
}

void startServer();