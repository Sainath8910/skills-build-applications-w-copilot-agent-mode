import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  userId: Types.ObjectId;
  name: string;
  description: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    duration?: number;
  }>;
  difficulty: string;
  estimatedDuration: number;
  targetedMuscles: string[];
  createdDate: Date;
  isPublic: boolean;
}

const workoutSchema = new Schema<IWorkout>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  exercises: [
    {
      name: {
        type: String,
        required: true,
      },
      sets: {
        type: Number,
        required: true,
        min: 1,
      },
      reps: {
        type: Number,
        required: true,
        min: 1,
      },
      duration: {
        type: Number,
        default: null,
      },
    },
  ],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate',
  },
  estimatedDuration: {
    type: Number,
    required: true,
    min: 5,
  },
  targetedMuscles: [
    {
      type: String,
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const Workout = model<IWorkout>('Workout', workoutSchema);
