import { NextResponse } from 'next/server';

// Mock data for sitemap
const mockProjects = [
  { slug: 'ecommerce-platform', updatedAt: new Date('2024-01-15') },
  { slug: 'task-management-app', updatedAt: new Date('2024-02-10') },
  { slug: 'weather-dashboard', updatedAt: new Date('2024-03-05') }
];

const mockPosts = [
  { slug: 'getting-started-nextjs-14', updatedAt: new Date('2024-01-15') },
  { slug: 'building-scalable-react-applications', updatedAt: new Date('2024-02-10') },
  { slug: 'modern-css-techniques-tailwind', updatedAt: new Date('2024-03-05') }
];

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  try {
    const projects = mockProjects;
    const posts = mockPosts;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/skills</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  ${projects.map(project => `
  <url>
    <loc>${baseUrl}/projects/${project.slug}</loc>
    <lastmod>${project.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}