import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { messageSchema, contactFormSchema } from '@/lib/validations';
import { authOptions } from '@/lib/auth';
import { isRateLimited, getRateLimitInfo } from '@/lib/rate-limit';
import { sendEmail } from '@/lib/email';
import { z } from 'zod'; // ✅ FIX added here


export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const unreadOnly = searchParams.get('unread') === 'true';

    const where = unreadOnly ? { read: false } : {};

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where,
      orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.message.count({ where }),
    ]);

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown';
    
    // More restrictive rate limiting for contact form
    if (isRateLimited(ip, 3, 300000)) { // 3 requests per 5 minutes
      const rateLimitInfo = getRateLimitInfo(ip);
      return NextResponse.json({ 
        error: 'Too many requests. Please try again later.',
        rateLimitInfo 
      }, { status: 429 });
    }

    const body = await request.json();
    
    // Honeypot field check
    if (body.website) {
      console.warn(`Spam attempt detected from IP: ${ip}`);
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // Use contact form schema (without honeypot field)
    const validatedData = contactFormSchema.parse(body);

    // Sanitize input data
    const sanitizedData = {
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      subject: validatedData.subject?.trim() || 'Contact Form Message',
      message: validatedData.message.trim(),
    };

    const message = await prisma.message.create({
      data: sanitizedData,
    });

    // Send email notification
    if (process.env.CONTACT_TO) {
      const emailResult = await sendEmail({
        to: process.env.CONTACT_TO,
        subject: `New Contact Form Message: ${sanitizedData.subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Message</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>New Contact Form Message</h2>
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${sanitizedData.message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p style="font-size: 12px; color: #666;">
            Sent from: ${ip}<br>
            Time: ${new Date().toISOString()}
          </p>
          </body>
          </html>
        `,
      });

      if (!emailResult.success) {
        console.error('Failed to send email notification:', emailResult.error);
        // Don't fail the request if email fails, just log it
      }
    }

    console.log(`New contact message from ${sanitizedData.email} (IP: ${ip})`);
    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid form data', 
        details: error.errors 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to send message. Please try again later.' 
    }, { status: 500 });
  }
}
