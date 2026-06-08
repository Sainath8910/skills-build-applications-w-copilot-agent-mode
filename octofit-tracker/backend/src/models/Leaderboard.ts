import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: Types.ObjectId;
  rank: number;
  score: number;
  totalActivities: number;
  totalCalories: number;
  streak: number;
  lastUpdated: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  rank: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  totalActivities: {
    type: Number,
    default: 0,
  },
  totalCalories: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);
