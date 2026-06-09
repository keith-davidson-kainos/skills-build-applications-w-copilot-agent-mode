import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    profileImageUrl: { type: String, trim: true },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);