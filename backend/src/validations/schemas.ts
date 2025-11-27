import { z } from 'zod';

// Event validation schemas
export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    date: z.string().or(z.date()),
    time: z.string().min(1, 'Time is required'),
    location: z.string().min(1, 'Location is required'),
    imageUrl: z.string().url().optional().or(z.literal('')),
    registrationLink: z.string().url().optional().or(z.literal('')),
    status: z.enum(['upcoming', 'ongoing', 'completed']).optional(),
  }),
});

export const updateEventSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Event ID is required'),
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.string().or(z.date()).optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    imageUrl: z.string().url().optional().or(z.literal('')),
    registrationLink: z.string().url().optional().or(z.literal('')),
    status: z.enum(['upcoming', 'ongoing', 'completed']).optional(),
  }),
});

// About validation schemas
export const updateAboutSchema = z.object({
  body: z.object({
    sections: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })
    ).optional(),
    mission: z.string().min(1, 'Mission is required').optional(),
    vision: z.string().min(1, 'Vision is required').optional(),
  }),
});

// Contact validation schemas
export const submitContactSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please provide a valid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  }),
});

export const updateContactStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Contact ID is required'),
  }),
  body: z.object({
    status: z.enum(['new', 'read', 'replied']).optional(),
  }),
});

// Auth validation schemas
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

