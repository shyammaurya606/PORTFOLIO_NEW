import { z } from 'zod';

// Common validation patterns
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const phonePattern = /^\+?[\d\s\-\(\)]+$/;
export const skillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  level: z.number().min(1, 'Level must be at least 1').max(100, 'Level cannot exceed 100'),
  icon: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(100, 'Slug too long')
    .regex(slugPattern, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().min(1, 'Description is required'),
  tech: z.array(z.string().min(1)).min(1, 'At least one technology is required'),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  images: z.array(z.string().url('Invalid image URL')),
  featured: z.boolean().default(false),
});

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(100, 'Slug too long')
    .regex(slugPattern, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string().min(1)).min(1, 'At least one tag is required'),
  published: z.boolean().default(true),
});

export const messageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().max(200, 'Subject too long').optional(),
  message: z.string().min(1, 'Message is required'),
  phone: z.string().regex(phonePattern, 'Invalid phone number').optional(),
  website: z.string().max(0, 'Spam detected').optional(), // Honeypot field
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Environment validation
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url('Invalid NEXTAUTH_URL'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_TO: z.string().email('Invalid CONTACT_TO email').optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
});
export const contactFormSchema = messageSchema.omit({ website: true });
export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Post = z.infer<typeof postSchema>;
export type Message = z.infer<typeof messageSchema>;
export type Login = z.infer<typeof loginSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;