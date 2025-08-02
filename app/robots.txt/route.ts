import { NextResponse } from 'next/server';

export function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  const robots = `User-agent: *
Allow: /
Allow: /projects
Allow: /blog
Allow: /skills
Allow: /contact
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /.*\\.json$

Sitemap: ${baseUrl}/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}