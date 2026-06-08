import { Schema, model, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  leader: Types.ObjectId;
  members: Types.ObjectId[];
  createdDate: Date;
  totalScore: number;
  memberCount: number;
}

const teamSchema = new Schema<ITeam>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  memberCount: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

export const Team = model<ITeam>('Team', teamSchema);
