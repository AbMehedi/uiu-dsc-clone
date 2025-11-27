import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface
export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mongoose schema
const ContactSchema: Schema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          return emailRegex.test(value);
        },
        message: 'Please provide a valid email address',
      },
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters long'],
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Export model
export const Contact = mongoose.model<IContact>('Contact', ContactSchema);

