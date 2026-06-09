import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);