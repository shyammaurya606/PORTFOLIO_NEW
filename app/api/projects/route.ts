import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/validations';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const tech = searchParams.get('tech');

    const where: any = {};
    
    if (featured === 'true') {
      where.featured = true;
    }
    
    if (tech) {
      where.tech = {
        contains: tech,
      };
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Parse JSON strings
    const parsedProjects = projects.map(project => ({
      ...project,
      tech: JSON.parse(project.tech),
      images: JSON.parse(project.images),
    }));

    return NextResponse.json(parsedProjects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        tech: JSON.stringify(validatedData.tech),
        images: JSON.stringify(validatedData.images),
      },
    });

    return NextResponse.json({
      ...project,
      tech: JSON.parse(project.tech),
      images: JSON.parse(project.images),
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}