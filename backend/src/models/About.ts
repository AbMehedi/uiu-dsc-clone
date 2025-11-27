import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for section
export interface IAboutSection {
  title: string;
  description: string;
  icon?: string;
}

// TypeScript interface for About document
export interface IAbout extends Document {
  sections: IAboutSection[];
  mission: string;
  vision: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for section
const AboutSectionSchema: Schema = new Schema<IAboutSection>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    trim: true,
  },
}, { _id: false });

// Mongoose schema for About
const AboutSchema: Schema = new Schema<IAbout>(
  {
    sections: {
      type: [AboutSectionSchema],
      default: [],
    },
    mission: {
      type: String,
      required: [true, 'Mission is required'],
      trim: true,
    },
    vision: {
      type: String,
      required: [true, 'Vision is required'],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Export model
export const About = mongoose.model<IAbout>('About', AboutSchema);

