import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

dotenv.config();

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      email: 'maya.chen@example.com',
      name: 'Maya Chen',
      profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      email: 'jordan.rivera@example.com',
      name: 'Jordan Rivera',
      profileImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    {
      email: 'priya.patel@example.com',
      name: 'Priya Patel',
      profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    {
      email: 'sam.williams@example.com',
      name: 'Sam Williams',
      profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Cardio Crew',
      description: 'Runners, cyclists, and rowers chasing weekly endurance goals.',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'Strength Squad',
      description: 'A team focused on strength training, mobility, and consistency.',
      members: [users[2]._id, users[3]._id],
    },
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      activityType: 'Trail Run',
      durationMinutes: 42,
      caloriesBurned: 410,
      completedAt: new Date('2026-06-01T07:30:00.000Z'),
    },
    {
      user: users[1]._id,
      activityType: 'Indoor Cycling',
      durationMinutes: 55,
      caloriesBurned: 520,
      completedAt: new Date('2026-06-02T18:15:00.000Z'),
    },
    {
      user: users[2]._id,
      activityType: 'Strength Training',
      durationMinutes: 48,
      caloriesBurned: 360,
      completedAt: new Date('2026-06-03T06:45:00.000Z'),
    },
    {
      user: users[3]._id,
      activityType: 'Yoga Flow',
      durationMinutes: 35,
      caloriesBurned: 180,
      completedAt: new Date('2026-06-04T12:00:00.000Z'),
    },
    {
      user: users[0]._id,
      activityType: 'Rowing',
      durationMinutes: 30,
      caloriesBurned: 290,
      completedAt: new Date('2026-06-05T17:20:00.000Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    { user: users[0]._id, team: teams[0]._id, score: 1860, rank: 1 },
    { user: users[1]._id, team: teams[0]._id, score: 1715, rank: 2 },
    { user: users[2]._id, team: teams[1]._id, score: 1640, rank: 3 },
    { user: users[3]._id, team: teams[1]._id, score: 1495, rank: 4 },
  ]);

  await Workout.insertMany([
    {
      title: 'Morning Mobility Reset',
      description: 'A low-impact routine for hips, shoulders, and spine before the day starts.',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      tags: ['mobility', 'recovery', 'warmup'],
    },
    {
      title: 'Endurance Builder Ride',
      description: 'Steady-zone cycling intervals designed to improve aerobic capacity.',
      difficulty: 'intermediate',
      estimatedMinutes: 45,
      tags: ['cycling', 'cardio', 'endurance'],
    },
    {
      title: 'Full Body Strength Circuit',
      description: 'Compound lifts and bodyweight movements for balanced strength gains.',
      difficulty: 'advanced',
      estimatedMinutes: 50,
      tags: ['strength', 'circuit', 'conditioning'],
    },
  ]);

  console.log(`Seeded ${users.length} users, ${teams.length} teams, 5 activities, 4 leaderboard entries, and 3 workouts.`);
}

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });