import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, min: 0, default: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);