import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { MarkdownRenderer } from '@/components/markdown-renderer';

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Mock blog posts data - same as used in the component
  const mockPosts = [
    { slug: "scalable-nextjs-apps" },
    { slug: "typescript-best-practices" },
    { slug: "modern-css-techniques" },
    { slug: "nodejs-express-apis" },
    { slug: "react-hooks-guide" },
    { slug: "database-design-principles" },
  ];

  return mockPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface Props {
  params: { slug: string };
}

// Mock blog posts data - same as in blog page
const mockPosts: Post[] = [
  {
    id: "1",
    title: "Building Scalable Web Applications with Next.js",
    slug: "scalable-nextjs-apps",
    content: `# Building Scalable Web Applications with Next.js

Next.js has revolutionized the way we build React applications by providing a comprehensive framework that handles many complex aspects of web development out of the box. In this comprehensive guide, we'll explore how to build scalable web applications using Next.js and modern development practices.

## Why Next.js for Scalable Applications?

Next.js offers several key features that make it ideal for building scalable applications:

### 1. Server-Side Rendering (SSR)
Server-side rendering improves performance and SEO by rendering pages on the server before sending them to the client. This results in faster initial page loads and better search engine visibility.

### 2. Static Site Generation (SSG)
For content that doesn't change frequently, SSG pre-renders pages at build time, resulting in incredibly fast loading times and reduced server load.

### 3. API Routes
Next.js allows you to create API endpoints within your application, eliminating the need for a separate backend for simple operations.

## Best Practices for Scalable Next.js Applications

### Code Organization
- Use a clear folder structure
- Implement proper component composition
- Separate business logic from UI components
- Use TypeScript for better type safety

### Performance Optimization
- Implement proper image optimization with Next.js Image component
- Use dynamic imports for code splitting
- Optimize bundle size with proper tree shaking
- Implement caching strategies

### SEO and Accessibility
- Use proper meta tags and structured data
- Implement semantic HTML
- Ensure proper keyboard navigation
- Test with screen readers

## Deployment and Monitoring

When deploying scalable Next.js applications, consider:

- Using CDN for static assets
- Implementing proper monitoring and logging
- Setting up automated testing and CI/CD pipelines
- Monitoring Core Web Vitals

## Conclusion

Next.js provides an excellent foundation for building scalable web applications. By following these best practices and leveraging the framework's built-in features, you can create applications that perform well at scale and provide excellent user experiences.`,
    tags: ["Next.js", "React", "Web Development", "Performance"],
    published: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: "2",
    title: "TypeScript Best Practices for Large Projects",
    slug: "typescript-best-practices",
    content: `# TypeScript Best Practices for Large Projects

TypeScript has become the go-to choice for large-scale JavaScript applications, providing static type checking, better IDE support, and improved code maintainability. This guide covers essential best practices for using TypeScript in large projects.

## Setting Up Your TypeScript Project

### Configuration Best Practices

Start with a strict \`tsconfig.json\` configuration:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
\`\`\`

### Project Structure

Organize your TypeScript project with clear boundaries:

- \`src/types/\` - Global type definitions
- \`src/interfaces/\` - Interface definitions
- \`src/utils/\` - Utility functions with proper typing
- \`src/services/\` - API services with typed responses

## Advanced TypeScript Patterns

### Generic Constraints

Use generic constraints to create flexible yet type-safe functions:

\`\`\`typescript
interface Identifiable {
  id: string;
}

function updateEntity<T extends Identifiable>(
  entity: T, 
  updates: Partial<T>
): T {
  return { ...entity, ...updates };
}
\`\`\`

### Utility Types

Leverage TypeScript's built-in utility types:

- \`Partial<T>\` - Make all properties optional
- \`Required<T>\` - Make all properties required
- \`Pick<T, K>\` - Select specific properties
- \`Omit<T, K>\` - Exclude specific properties

### Type Guards

Implement type guards for runtime type checking:

\`\`\`typescript
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}
\`\`\`

## Error Handling and Validation

### Result Types

Implement Result types for better error handling:

\`\`\`typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };
\`\`\`

### Schema Validation

Use libraries like Zod for runtime validation that generates TypeScript types:

\`\`\`typescript
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;
\`\`\`

## Testing TypeScript Code

### Type Testing

Test your types with tools like \`@typescript-eslint\`:

\`\`\`typescript
// Test that a function returns the expected type
const result: User = getUserById('123');
\`\`\`

### Mock Typing

Properly type your mocks in tests:

\`\`\`typescript
const mockUserService: jest.Mocked<UserService> = {
  getUser: jest.fn(),
  updateUser: jest.fn(),
};
\`\`\`

## Performance Considerations

### Compilation Performance

- Use project references for large monorepos
- Implement incremental compilation
- Use \`skipLibCheck\` judiciously
- Optimize your \`include\` and \`exclude\` patterns

### Runtime Performance

- Avoid excessive type assertions
- Use const assertions where appropriate
- Implement proper tree shaking

## Conclusion

TypeScript's power lies in its ability to catch errors at compile time and provide excellent developer experience. By following these best practices, you can build maintainable, scalable applications that leverage TypeScript's full potential.

Remember: TypeScript is a tool to help you write better JavaScript. Don't fight the type system—embrace it and let it guide you toward better code architecture.`,
    tags: ["TypeScript", "JavaScript", "Best Practices", "Architecture"],
    published: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: "3",
    title: "Modern CSS Techniques and Animations",
    slug: "modern-css-techniques",
    content: `# Modern CSS Techniques and Animations

CSS has evolved tremendously over the past few years, introducing powerful new features that enable developers to create stunning user interfaces without relying heavily on JavaScript. This guide explores the latest CSS techniques and animation capabilities.

## CSS Grid and Flexbox Mastery

### CSS Grid for Complex Layouts

CSS Grid revolutionizes how we approach layout design:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  grid-auto-rows: minmax(200px, auto);
}
\`\`\`

### Flexbox for Component Layout

Flexbox excels at component-level layouts:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
\`\`\`

## Advanced CSS Animations

### CSS Custom Properties (Variables)

Use CSS variables for dynamic animations:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --animation-duration: 0.3s;
}

.animated-element {
  background-color: var(--primary-color);
  transition: all var(--animation-duration) ease;
}
\`\`\`

### Keyframe Animations

Create complex animations with keyframes:

\`\`\`css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
\`\`\`

### CSS Transforms and 3D Effects

Leverage 3D transforms for engaging effects:

\`\`\`css
.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.3s;
}

.card-3d:hover {
  transform: rotateY(10deg) rotateX(5deg);
}
\`\`\`

## Modern CSS Features

### Container Queries

Responsive design based on container size:

\`\`\`css
@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
\`\`\`

### CSS Logical Properties

Use logical properties for better internationalization:

\`\`\`css
.element {
  margin-inline-start: 1rem;
  padding-block: 2rem;
  border-inline-end: 1px solid #ccc;
}
\`\`\`

### CSS Subgrid

Create more flexible grid layouts:

\`\`\`css
.subgrid-item {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
\`\`\`

## Performance Optimization

### Hardware Acceleration

Trigger hardware acceleration for smooth animations:

\`\`\`css
.accelerated {
  will-change: transform;
  transform: translateZ(0);
}
\`\`\`

### Efficient Selectors

Write efficient CSS selectors:

\`\`\`css
/* Good */
.button-primary { }

/* Avoid */
div > ul > li > a.button-primary { }
\`\`\`

## Responsive Design Patterns

### Intrinsic Web Design

Create layouts that adapt naturally:

\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: clamp(1rem, 4vw, 2rem);
}
\`\`\`

### Fluid Typography

Implement responsive typography:

\`\`\`css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.2;
}
\`\`\`

## CSS Architecture

### BEM Methodology

Structure your CSS with BEM:

\`\`\`css
.card { }
.card__header { }
.card__body { }
.card--featured { }
\`\`\`

### CSS-in-JS Considerations

When using CSS-in-JS, consider:

- Performance implications
- Server-side rendering
- Developer experience
- Bundle size impact

## Accessibility in CSS

### Focus Management

Ensure proper focus indicators:

\`\`\`css
.button:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}
\`\`\`

### Reduced Motion

Respect user preferences:

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

## Conclusion

Modern CSS provides powerful tools for creating beautiful, performant, and accessible user interfaces. By mastering these techniques, you can create engaging experiences that work well across all devices and user preferences.

The key is to use these features progressively, ensuring your designs work for all users while providing enhanced experiences for those with modern browser support.`,
    tags: ["CSS", "Animation", "Frontend", "UI/UX"],
    published: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: "4",
    title: "Building RESTful APIs with Node.js and Express",
    slug: "nodejs-express-apis",
    content: `# Building RESTful APIs with Node.js and Express

Building robust RESTful APIs is a fundamental skill for backend developers. This comprehensive guide covers everything you need to know about creating scalable, maintainable APIs using Node.js and Express.

## Setting Up Your Express Application

### Project Structure

Organize your API project with a clear structure:

\`\`\`
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── app.js
\`\`\`

### Basic Express Setup

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
\`\`\`

## RESTful API Design Principles

### HTTP Methods and Status Codes

Use appropriate HTTP methods:

- \`GET\` - Retrieve resources
- \`POST\` - Create new resources
- \`PUT\` - Update entire resources
- \`PATCH\` - Partial updates
- \`DELETE\` - Remove resources

Return proper status codes:

- \`200\` - Success
- \`201\` - Created
- \`400\` - Bad Request
- \`401\` - Unauthorized
- \`404\` - Not Found
- \`500\` - Internal Server Error

### Resource Naming

Follow RESTful naming conventions:

\`\`\`
GET    /api/users          # Get all users
GET    /api/users/:id      # Get specific user
POST   /api/users          # Create new user
PUT    /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user
\`\`\`

## Error Handling

### Global Error Handler

Implement a centralized error handling middleware:

\`\`\`javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production error response
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }
};

module.exports = { AppError, globalErrorHandler };
\`\`\`

## Authentication and Authorization

### JWT Implementation

\`\`\`javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
\`\`\`

## Database Integration

### Using Mongoose with MongoDB

\`\`\`javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
\`\`\`

## Input Validation

### Using Joi for Validation

\`\`\`javascript
const Joi = require('joi');

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message
    });
  }
  
  next();
};
\`\`\`

## API Documentation

### Using Swagger/OpenAPI

\`\`\`javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Express API'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
\`\`\`

## Testing Your API

### Using Jest and Supertest

\`\`\`javascript
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  test('GET /api/users should return all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);
      
    expect(response.body.status).toBe('success');
    expect(Array.isArray(response.body.data.users)).toBe(true);
  });

  test('POST /api/users should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);
      
    expect(response.body.status).toBe('success');
    expect(response.body.data.user.email).toBe(userData.email);
  });
});
\`\`\`

## Performance Optimization

### Caching with Redis

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

const cache = (duration) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    
    try {
      const cached = await client.get(key);
      
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      res.sendResponse = res.json;
      res.json = (body) => {
        client.setex(key, duration, JSON.stringify(body));
        res.sendResponse(body);
      };
      
      next();
    } catch (error) {
      next();
    }
  };
};
\`\`\`

## Deployment Considerations

### Environment Configuration

\`\`\`javascript
const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  nodeEnv: process.env.NODE_ENV || 'development'
};

module.exports = config;
\`\`\`

### Health Check Endpoint

\`\`\`javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
\`\`\`

## Conclusion

Building robust RESTful APIs requires attention to many details: proper error handling, security, validation, testing, and documentation. By following these practices, you'll create APIs that are maintainable, scalable, and secure.

Remember to always validate input, handle errors gracefully, implement proper authentication, and document your API thoroughly. These practices will save you time in the long run and make your APIs more reliable for consumers.`,
    tags: ["Node.js", "Express", "API", "Backend"],
    published: true,
    createdAt: new Date('2023-12-28'),
    updatedAt: new Date('2023-12-28'),
  },
  {
    id: "5",
    title: "React Hooks: A Complete Guide",
    slug: "react-hooks-guide",
    content: `# React Hooks: A Complete Guide

React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components. This comprehensive guide covers everything you need to know about React Hooks.

## Introduction to Hooks

Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8 and have become the standard way to write React components.

### Rules of Hooks

Before diving into specific hooks, remember these fundamental rules:

1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Call them from React functional components or custom hooks

## useState Hook

The \`useState\` hook lets you add state to functional components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### Multiple State Variables

You can use multiple state variables in a single component:

\`\`\`jsx
function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name" 
      />
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="number"
        value={age} 
        onChange={(e) => setAge(parseInt(e.target.value))} 
        placeholder="Age" 
      />
    </form>
  );
}
\`\`\`

## useEffect Hook

The \`useEffect\` hook lets you perform side effects in functional components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

### Cleanup with useEffect

\`\`\`jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []);

  return <div>Timer: {seconds} seconds</div>;
}
\`\`\`

## useContext Hook

The \`useContext\` hook provides a way to consume context without nesting:

\`\`\`jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button 
      style={{ 
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle Theme
    </button>
  );
}
\`\`\`

## useReducer Hook

For complex state logic, \`useReducer\` is often preferable to \`useState\`:

\`\`\`jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
\`\`\`

## useMemo Hook

\`useMemo\` helps optimize performance by memoizing expensive calculations:

\`\`\`jsx
import React, { useState, useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const [filter, setFilter] = useState('');

  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

## useCallback Hook

\`useCallback\` memoizes functions to prevent unnecessary re-renders:

\`\`\`jsx
import React, { useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = useCallback(() => {
    if (input.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: input }]);
      setInput('');
    }
  }, [input]);

  const removeTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onRemove={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
}

const TodoItem = React.memo(({ todo, onRemove }) => {
  return (
    <li>
      {todo.text}
      <button onClick={() => onRemove(todo.id)}>Remove</button>
    </li>
  );
});
\`\`\`

## Custom Hooks

Create your own hooks to reuse stateful logic:

\`\`\`jsx
import { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// Using custom hooks
function UserProfile() {
  const { data: user, loading, error } = useFetch('/api/user');
  const [preferences, setPreferences] = useLocalStorage('userPrefs', {});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Theme: {preferences.theme || 'default'}</p>
    </div>
  );
}
\`\`\`

## Best Practices

### 1. Keep Hooks at the Top Level

\`\`\`jsx
// ❌ Don't do this
function MyComponent({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // This breaks the rules!
  }
  // ...
}

// ✅ Do this instead
function MyComponent({ condition }) {
  const [state, setState] = useState(0);
  
  if (!condition) {
    return null;
  }
  // ...
}
\`\`\`

### 2. Optimize Dependencies

\`\`\`jsx
// ❌ Missing dependencies
useEffect(() => {
  fetchUser(userId);
}, []); // userId should be in dependencies

// ✅ Correct dependencies
useEffect(() => {
  fetchUser(userId);
}, [userId]);
\`\`\`

### 3. Separate Concerns

\`\`\`jsx
// ❌ One large useEffect
useEffect(() => {
  // Fetch user data
  fetchUser();
  
  // Set up event listeners
  window.addEventListener('resize', handleResize);
  
  // Start timer
  const timer = setInterval(updateTime, 1000);
  
  return () => {
    window.removeEventListener('resize', handleResize);
    clearInterval(timer);
  };
}, []);

// ✅ Separate useEffects for different concerns
useEffect(() => {
  fetchUser();
}, []);

useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

useEffect(() => {
  const timer = setInterval(updateTime, 1000);
  return () => clearInterval(timer);
}, []);
\`\`\`

## Conclusion

React Hooks provide a powerful and flexible way to manage state and side effects in functional components. They promote code reuse, make components easier to understand, and eliminate many of the complexities associated with class components.

Key takeaways:
- Start with \`useState\` and \`useEffect\` for basic needs
- Use \`useContext\` for sharing data across components
- Consider \`useReducer\` for complex state logic
- Optimize with \`useMemo\` and \`useCallback\` when needed
- Create custom hooks to share logic between components
- Always follow the rules of hooks

By mastering these concepts, you'll be able to write more efficient, maintainable React applications.`,
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    published: true,
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: "6",
    title: "Database Design Principles and Best Practices",
    slug: "database-design-principles",
    content: `# Database Design Principles and Best Practices

Effective database design is crucial for building scalable, maintainable applications. This comprehensive guide covers fundamental principles, normalization techniques, and best practices for designing robust database systems.

## Fundamental Design Principles

### 1. Data Integrity

Ensure data accuracy and consistency through:

- **Entity Integrity**: Every table must have a primary key
- **Referential Integrity**: Foreign keys must reference valid primary keys
- **Domain Integrity**: Data must conform to defined constraints
- **User-Defined Integrity**: Business rules must be enforced

### 2. Normalization

Organize data to reduce redundancy and improve data integrity:

#### First Normal Form (1NF)
- Each column contains atomic values
- No repeating groups
- Each row is unique

\`\`\`sql
-- ❌ Not in 1NF (repeating groups)
CREATE TABLE students_bad (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    course1 VARCHAR(50),
    course2 VARCHAR(50),
    course3 VARCHAR(50)
);

-- ✅ 1NF compliant
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE enrollments (
    student_id INT,
    course_name VARCHAR(50),
    PRIMARY KEY (student_id, course_name),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
\`\`\`

#### Second Normal Form (2NF)
- Must be in 1NF
- No partial dependencies on composite primary keys

\`\`\`sql
-- ❌ Not in 2NF (partial dependency)
CREATE TABLE order_items_bad (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100), -- Depends only on product_id
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- ✅ 2NF compliant
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
\`\`\`

#### Third Normal Form (3NF)
- Must be in 2NF
- No transitive dependencies

\`\`\`sql
-- ❌ Not in 3NF (transitive dependency)
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100) -- Depends on department_id, not employee_id
);

-- ✅ 3NF compliant
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
\`\`\`

## Entity-Relationship Modeling

### Identifying Entities

Entities represent real-world objects or concepts:

\`\`\`sql
-- Core entities for an e-commerce system
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
\`\`\`

### Relationship Types

#### One-to-One (1:1)
\`\`\`sql
CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    bio TEXT,
    avatar_url VARCHAR(255),
    phone VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
\`\`\`

#### One-to-Many (1:N)
\`\`\`sql
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

-- Products belong to one category (1:N relationship)
ALTER TABLE products 
ADD FOREIGN KEY (category_id) REFERENCES categories(category_id);
\`\`\`

#### Many-to-Many (M:N)
\`\`\`sql
-- Junction table for many-to-many relationship
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
\`\`\`

## Indexing Strategies

### Primary Indexes
\`\`\`sql
-- Primary key automatically creates a clustered index
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL -- Unique constraint creates an index
);
\`\`\`

### Secondary Indexes
\`\`\`sql
-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index (MySQL 8.0+)
CREATE INDEX idx_active_users ON users(user_id) WHERE status = 'active';
\`\`\`

### Index Best Practices

1. **Index frequently queried columns**
\`\`\`sql
-- If you frequently query by email
SELECT * FROM users WHERE email = 'user@example.com';
-- Create index: CREATE INDEX idx_users_email ON users(email);
\`\`\`

2. **Use composite indexes for multi-column queries**
\`\`\`sql
-- Query pattern
SELECT * FROM orders WHERE user_id = 123 AND status = 'pending';
-- Optimal index: CREATE INDEX idx_orders_user_status ON orders(user_id, status);
\`\`\`

3. **Consider index selectivity**
\`\`\`sql
-- High selectivity (good for indexing)
CREATE INDEX idx_users_email ON users(email); -- Unique values

-- Low selectivity (poor for indexing)
-- Don't index: CREATE INDEX idx_users_gender ON users(gender); -- Only 2-3 values
\`\`\`

## Query Optimization

### Efficient Query Patterns

#### Use EXPLAIN to analyze queries
\`\`\`sql
EXPLAIN SELECT u.name, COUNT(o.order_id) as order_count
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE u.created_at >= '2023-01-01'
GROUP BY u.user_id, u.name;
\`\`\`

#### Avoid SELECT *
\`\`\`sql
-- ❌ Inefficient
SELECT * FROM products WHERE category_id = 1;

-- ✅ Efficient
SELECT product_id, name, price FROM products WHERE category_id = 1;
\`\`\`

#### Use appropriate JOIN types
\`\`\`sql
-- INNER JOIN for required relationships
SELECT p.name, c.name as category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.category_id;

-- LEFT JOIN for optional relationships
SELECT u.name, COUNT(o.order_id) as order_count
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.name;
\`\`\`

### Query Performance Tips

1. **Use LIMIT for pagination**
\`\`\`sql
-- Efficient pagination
SELECT * FROM products 
ORDER BY created_at DESC 
LIMIT 20 OFFSET 40;

-- Better: Use cursor-based pagination
SELECT * FROM products 
WHERE created_at < '2023-12-01 10:00:00'
ORDER BY created_at DESC 
LIMIT 20;
\`\`\`

2. **Optimize WHERE clauses**
\`\`\`sql
-- ❌ Function in WHERE clause prevents index usage
SELECT * FROM orders WHERE YEAR(created_at) = 2023;

-- ✅ Range query allows index usage
SELECT * FROM orders 
WHERE created_at >= '2023-01-01' AND created_at < '2024-01-01';
\`\`\`

## Data Types and Constraints

### Choosing Appropriate Data Types

\`\`\`sql
CREATE TABLE optimized_table (
    -- Use smallest appropriate integer type
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- Use appropriate string lengths
    email VARCHAR(255) NOT NULL, -- Standard email length
    name VARCHAR(100) NOT NULL,   -- Reasonable name length
    
    -- Use DECIMAL for monetary values
    price DECIMAL(10, 2) NOT NULL,
    
    -- Use appropriate date/time types
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Use ENUM for limited options
    status ENUM('active', 'inactive', 'pending') DEFAULT 'pending',
    
    -- Use BOOLEAN for true/false values
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Add constraints
    CONSTRAINT chk_price_positive CHECK (price > 0),
    CONSTRAINT uk_email UNIQUE (email)
);
\`\`\`

### Implementing Business Rules

\`\`\`sql
-- Check constraints
ALTER TABLE products 
ADD CONSTRAINT chk_stock_non_negative CHECK (stock_quantity >= 0);

-- Triggers for complex business logic
DELIMITER //
CREATE TRIGGER update_stock_after_order
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products 
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE product_id = NEW.product_id;
END//
DELIMITER ;
\`\`\`

## Security Considerations

### Access Control
\`\`\`sql
-- Create specific users with limited privileges
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE ON ecommerce.* TO 'app_user'@'localhost';

-- Read-only user for reporting
CREATE USER 'report_user'@'localhost' IDENTIFIED BY 'report_password';
GRANT SELECT ON ecommerce.* TO 'report_user'@'localhost';
\`\`\`

### Data Protection
\`\`\`sql
-- Encrypt sensitive data
CREATE TABLE user_payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    card_number_encrypted VARBINARY(255), -- Encrypted card number
    card_hash VARCHAR(64), -- Hash for duplicate detection
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
\`\`\`

## Backup and Recovery

### Backup Strategy
\`\`\`bash
# Full backup
mysqldump --single-transaction --routines --triggers ecommerce > backup_full.sql

# Incremental backup using binary logs
mysqlbinlog --start-datetime="2023-12-01 00:00:00" mysql-bin.000001 > incremental.sql
\`\`\`

### Recovery Planning
\`\`\`sql
-- Point-in-time recovery
-- 1. Restore from full backup
-- 2. Apply binary logs up to specific point
-- 3. Test recovery in staging environment
\`\`\`

## Monitoring and Maintenance

### Performance Monitoring
\`\`\`sql
-- Identify slow queries
SELECT query_time, lock_time, rows_sent, rows_examined, sql_text
FROM mysql.slow_log
WHERE query_time > 1
ORDER BY query_time DESC;

-- Check index usage
SELECT 
    table_name,
    index_name,
    cardinality,
    non_unique
FROM information_schema.statistics
WHERE table_schema = 'ecommerce'
ORDER BY table_name, cardinality DESC;
\`\`\`

### Regular Maintenance
\`\`\`sql
-- Analyze tables to update statistics
ANALYZE TABLE products, orders, users;

-- Optimize tables to reclaim space
OPTIMIZE TABLE products, orders, users;

-- Check table integrity
CHECK TABLE products, orders, users;
\`\`\`

## Conclusion

Effective database design requires careful consideration of:

1. **Normalization** to reduce redundancy and improve integrity
2. **Proper indexing** to optimize query performance
3. **Appropriate data types** to minimize storage and improve performance
4. **Security measures** to protect sensitive data
5. **Monitoring and maintenance** to ensure ongoing performance

Remember that database design is often about finding the right balance between normalization and performance, depending on your specific use case and query patterns.

By following these principles and best practices, you'll create databases that are scalable, maintainable, and performant, providing a solid foundation for your applications.`,
    tags: ["Database", "SQL", "Design", "Performance"],
    published: true,
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2023-12-15'),
  },
];

function getPost(slug: string): Post | null {
  return mockPosts.find(post => post.slug === slug && post.published) || null;
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <time dateTime={new Date(post.createdAt).toISOString()}>
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </time>
              <span>•</span>
              <span>{Math.ceil(post.content.length / 1000)} min read</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <MarkdownRenderer content={post.content} />
        </article>
      </div>
    </div>
  );
}