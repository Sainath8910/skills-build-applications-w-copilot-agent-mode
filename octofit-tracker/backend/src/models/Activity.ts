import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  distance?: number;
  intensity: string;
  date: Date;
  notes?: string;
}

const activitySchema = new Schema<IActivity>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['running', 'cycling', 'swimming', 'walking', 'gym', 'yoga', 'sports'],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  calories: {
    type: Number,
    required: true,
    min: 0,
  },
  distance: {
    type: Number,
    default: null,
  },
  intensity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: '',
  },
}, { timestamps: true });

export const Activity = model<IActivity>('Activity', activitySchema);
