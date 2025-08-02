import { NextResponse } from 'next/server';

// Mock blog posts data
const mockPosts = [
  {
    title: 'Getting Started with Next.js 14',
    content: 'Learn how to build modern web applications with Next.js 14, featuring the new App Router, Server Components, and improved performance optimizations.',
    slug: 'getting-started-nextjs-14',
    createdAt: new Date('2024-01-15')
  },
  {
    title: 'Building Scalable React Applications',
    content: 'Discover best practices for building large-scale React applications, including state management, component architecture, and performance optimization techniques.',
    slug: 'building-scalable-react-applications',
    createdAt: new Date('2024-02-10')
  },
  {
    title: 'Modern CSS Techniques with Tailwind',
    content: 'Explore advanced CSS techniques using Tailwind CSS, including custom components, responsive design patterns, and utility-first methodology.',
    slug: 'modern-css-techniques-tailwind',
    createdAt: new Date('2024-03-05')
  }
];

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  try {
    const posts = mockPosts;

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Developer Portfolio Blog</title>
    <description>Latest blog posts from my developer portfolio</description>
    <link>${baseUrl}/blog</link>
    <language>en</language>
    ${posts.map(post => `
    <item>
      <title>${post.title}</title>
      <description>${post.content.substring(0, 200)}...</description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${post.createdAt.toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}