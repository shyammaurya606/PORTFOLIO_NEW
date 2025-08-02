import nodemailer from 'nodemailer';
import { z } from 'zod';

const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    // Validate input
    const validatedData = emailSchema.parse({ to, subject, html });
    
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Portfolio <noreply@yoursite.com>',
        to: validatedData.to,
        subject: validatedData.subject,
        html: validatedData.html,
        replyTo: process.env.EMAIL_REPLY_TO,
      });

      if (error) {
        console.error('Resend email error:', error);
        throw new Error(error.message);
      }

      console.log('Email sent successfully via Resend:', data?.id);
      return { success: true, data };
    } else {
      // Fallback to nodemailer with SMTP
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransporter({
        host: process.env.SMTP_HOST || 'localhost',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        } : undefined,
        tls: {
          rejectUnauthorized: process.env.NODE_ENV === 'production',
        },
      });

      // Verify SMTP connection
      await transporter.verify();

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@yoursite.com',
        to: validatedData.to,
        subject: validatedData.subject,
        html: validatedData.html,
        replyTo: process.env.EMAIL_REPLY_TO,
      });

      console.log('Email sent successfully via SMTP:', info.messageId);
      return { success: true, data: info };
    }
  } catch (error) {
    console.error('Email send error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown email error';
    
    // Don't expose sensitive error details in production
    if (process.env.NODE_ENV === 'production') {
      return { success: false, error: 'Failed to send email' };
    }
    
    return { success: false, error: errorMessage };
  }
}