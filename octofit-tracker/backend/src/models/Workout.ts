import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    estimatedMinutes: { type: Number, required: true, min: 1 },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);