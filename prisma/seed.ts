import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
    },
  });

  console.log('Created admin user:', admin);

  // Create sample skills
  const skills = [
    { name: 'JavaScript', level: 95, icon: 'Code' },
    { name: 'TypeScript', level: 90, icon: 'Code2' },
    { name: 'React', level: 92, icon: 'Atom' },
    { name: 'Next.js', level: 88, icon: 'Zap' },
    { name: 'Node.js', level: 85, icon: 'Server' },
    { name: 'PostgreSQL', level: 80, icon: 'Database' },
    { name: 'Tailwind CSS', level: 90, icon: 'Palette' },
    { name: 'Docker', level: 75, icon: 'Container' },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    });
  }

  console.log('Created skills');

  // Create sample projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.',
      tech: JSON.stringify(['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS']),
      githubUrl: 'https://github.com/example/ecommerce',
      liveUrl: 'https://ecommerce-demo.vercel.app',
      images: JSON.stringify(['https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg']),
      featured: true,
    },
    {
      title: 'Task Management App',
      slug: 'task-management-app',
      description: 'A collaborative task management application with real-time updates, team collaboration features, and project tracking.',
      tech: JSON.stringify(['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express']),
      githubUrl: 'https://github.com/example/task-manager',
      liveUrl: 'https://taskmanager-demo.vercel.app',
      images: JSON.stringify(['https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg']),
      featured: true,
    },
    {
      title: 'Weather Dashboard',
      slug: 'weather-dashboard',
      description: 'A responsive weather dashboard that displays current weather conditions and forecasts for multiple locations.',
      tech: JSON.stringify(['Vue.js', 'JavaScript', 'OpenWeather API', 'Chart.js']),
      githubUrl: 'https://github.com/example/weather-dashboard',
      liveUrl: 'https://weather-demo.vercel.app',
      images: JSON.stringify(['https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg']),
      featured: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log('Created projects');

  // Create sample blog posts
  const posts = [
    {
      title: 'Getting Started with Next.js 14',
      slug: 'getting-started-nextjs-14',
      content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features and improvements to the React framework. In this post, we'll explore the key features and how to get started.

## App Router

The App Router is now stable and provides a new way to build applications with React Server Components.

## Server Actions

Server Actions allow you to run server-side code directly from your components without creating API routes.

## Conclusion

Next.js 14 continues to push the boundaries of what's possible with React applications.`,
      tags: JSON.stringify(['Next.js', 'React', 'Web Development']),
      published: true,
    },
    {
      title: 'Building Scalable APIs with Node.js',
      slug: 'building-scalable-apis-nodejs',
      content: `# Building Scalable APIs with Node.js

Learn how to build scalable and maintainable APIs using Node.js and Express.

## Best Practices

1. Use TypeScript for better development experience
2. Implement proper error handling
3. Add comprehensive logging
4. Use middleware for common functionality

## Performance Optimization

- Implement caching strategies
- Use connection pooling for databases
- Optimize database queries
- Implement rate limiting

## Conclusion

Building scalable APIs requires careful planning and implementation of best practices.`,
      tags: JSON.stringify(['Node.js', 'API', 'Backend']),
      published: true,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log('Created blog posts');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });