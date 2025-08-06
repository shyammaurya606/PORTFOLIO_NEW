"use client"

import { useState, useEffect } from 'react';
import { PostCard } from '@/components/post-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  published: boolean;
createdAt: string;  // 👈 string only
  updatedAt: string;  // 👈 string only
};

// Mock blog posts data - Replace this with your actual blog posts
const mockPosts: Post[] = [
  {
    id: "1",
    title: "Building Scalable Web Applications with Next.js",
    slug: "scalable-nextjs-apps",
    content: "Learn how to build scalable web applications using Next.js and modern development practices. This comprehensive guide covers everything from project setup to deployment, including best practices for performance optimization, SEO, and user experience. We'll explore advanced features like Server-Side Rendering, Static Site Generation, and API routes to create robust applications that can handle high traffic loads.",
    tags: ["Next.js", "React", "Web Development", "Performance"],
    published: true,
 createdAt: new Date('2024-01-15').toISOString(),  // 👈 converted to string
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: "2",
    title: "TypeScript Best Practices for Large Projects",
    slug: "typescript-best-practices",
    content: "Discover the best practices for using TypeScript in large-scale projects and improve code quality. This article covers advanced TypeScript features, proper type definitions, generic constraints, and architectural patterns that help maintain clean, scalable codebases. Learn how to leverage TypeScript's powerful type system to catch errors early and improve developer productivity.",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Architecture"],
    published: true,
  createdAt: new Date('2024-01-15').toISOString(),  // 👈 converted to string
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: "3",
    title: "Modern CSS Techniques and Animations",
    slug: "modern-css-techniques",
    content: "Explore the latest CSS features and animation techniques to create stunning user interfaces. From CSS Grid and Flexbox to advanced animations using CSS transforms and keyframes, this guide covers everything you need to know about modern CSS. Learn how to create responsive designs, implement smooth transitions, and build engaging user experiences.",
    tags: ["CSS", "Animation", "Frontend", "UI/UX"],
    published: true,
  createdAt: new Date('2024-01-15').toISOString(),  // 👈 converted to string
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: "4",
    title: "Building RESTful APIs with Node.js and Express",
    slug: "nodejs-express-apis",
    content: "A comprehensive guide to building robust RESTful APIs using Node.js and Express. Learn about proper API design, authentication, error handling, and database integration. This tutorial covers everything from basic routing to advanced middleware implementation, helping you create scalable backend services.",
    tags: ["Node.js", "Express", "API", "Backend"],
    published: true,
    createdAt: new Date('2024-01-15').toISOString(),  // 👈 converted to string
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: "5",
    title: "React Hooks: A Complete Guide",
    slug: "react-hooks-guide",
    content: "Master React Hooks with this comprehensive guide covering useState, useEffect, useContext, and custom hooks. Learn how to manage state, handle side effects, and create reusable logic in functional components. Includes practical examples and best practices for modern React development.",
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    published: true,
 createdAt: new Date('2024-01-15').toISOString(),  // 👈 converted to string
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: "6",
    title: "Database Design Principles and Best Practices",
    slug: "database-design-principles",
    content: "Learn the fundamental principles of database design and normalization. This guide covers entity-relationship modeling, indexing strategies, query optimization, and performance tuning. Whether you're working with SQL or NoSQL databases, these principles will help you design efficient and scalable data storage solutions.",
    tags: ["Database", "SQL", "Design", "Performance"],
    published: true,
     createdAt: new Date('2024-01-15').toISOString(),  // 👈 converted to string
    updatedAt: new Date('2024-01-15').toISOString(),
  },
];

export default function BlogPage() {
  const [posts] = useState<Post[]>(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm]);

  const filterPosts = () => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter((post: Post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about web development and technology.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Posts Grid */}
      {currentPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentPosts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </Button>
              
              <div className="flex items-center px-4">
                Page {currentPage} of {totalPages}
              </div>
              
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm ? 'No posts found matching your search.' : 'No blog posts found.'}
          </p>
          {searchTerm && (
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              className="mt-4"
            >
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
