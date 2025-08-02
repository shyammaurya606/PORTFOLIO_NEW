import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

// Mock project data
const mockProjects = [
  {
    id: '1',
    slug: 's-3-platform',
    title: 'S-3 Platform',
    description:
      'Platform that display SPORTS_STREAMING_SITES that helps users to discover where they can watch live sports events online based on their location and preferences. The application aggregates and displays streaming services that legally broadcast various sports events—such as football, cricket, basketball, tennis, and more—tailored to the users country or region.The platform leverages geolocation detection to identify the user’s country and then fetches a curated list of available streaming services, free or paid, that offer coverage for the selected sport or tournament. This eliminates the need for users to manually search across multiple platforms or deal with region-based content restrictions.',
    tech: ["React", "JavaScript", "Firebase", "APIs", "TailwindCSS"],
    images: [
      'https://thumbs.dreamstime.com/b/irresistible-attack-rage-multi-sports-collage-hockey-soccer-american-football-players-conceptual-photo-emotional-110067569.jpg',
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    githubUrl: "https://github.com/shyammaurya606/project-1",
    liveUrl: 'https://project-nu-lake.vercel.app/',
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    slug: "realtime-group-gps",
    title: "RealTime Group GPS",
    description:
      'REALTIME_GROUP_GPS is tracking platform designed to help multiple users share their live locations within a private group. The platform allows friends, family, or teams to track each other’s positions on a live map with high accuracy, making it ideal for outdoor events, travel coordination, group safety, logistics, or team-based activities. The system is built to ensure low-latency GPS updates, group management, and secure location sharing, offering a seamless and interactive tracking experience across mobile and web platforms.',
    tech: ["Express", "Node.js", "Socket.io", "MongoDB", "RESTful API", "Leaflet"],
    images: [
      'https://c4.wallpaperflare.com/wallpaper/981/674/477/earth-neon-black-background-world-map-hd-wallpaper-preview.jpg',
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    githubUrl: "https://github.com/shyammaurya606/REALTIME_GROUP_GPS",
    liveUrl: 'https://realtime-group-gps-1.onrender.com/',
    featured: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    slug: "living-calc-canvas",
    title: "Living CalC Canvas",
    description: 
    'Living Calc Canvas is an innovative AI-powered web platform that converts handwritten drawings and mathematical expressions into dynamic, interactive calculations in real-time. Designed to make math problem-solving more intuitive, engaging, and visual, the platform bridges the gap between natural handwriting input and powerful computational interpretation. Using a canvas-style interface, users can write mathematical equations, draw shapes, or annotate expressions, and the system instantly interprets the input, solves the problem, and animates the process — transforming passive math solving into an interactive learning experience.',
    tech: ["Python", "Gemini API", " TypeScript", "Latex(rendering)"],
    images: [
      'https://miro.medium.com/v2/resize%3Afit%3A1200/1%2AoiNWwZNv8Qf827EYHJ2nnA.jpeg',
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    githubUrl: "https://github.com/shyammaurya606/LIVING_CALC",
    liveUrl: 'https://calc-fe.vercel.app/',
    featured: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: "4",
    slug: "chess-dotcom",
    title: "Chess DotCom",
    description:
      "This project is a real-time multiplayer chess game built using Socket.IO for bi-directional communication between clients and the server. The platform enables two players to play a complete game of chess live over the web, with seamless synchronization of moves, game state, and turn management. The aim of the project is to explore real-time web applications and the fundamentals of multiplayer game development using WebSockets. The UI is kept simple and clean, focusing on user experience and gameplay accuracy.",
    tech: ["JavaScript", "Socket.io", "Express", "Tailwind CSS", "Chess.js"],
    images: [
      "https://www.freevector.com/uploads/vector/preview/9302/FreeVector-008-Chess-Illustrations-M_2.jpg",
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    githubUrl: "https://github.com/shyammaurya606/CHESS_DOT_COM",
    liveUrl: "https://chesswithshyam.onrender.com/",
    featured: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: "5",
    slug: "ai-course-generator",
    title: "AI Course Generator",
    description:
      "The AI Course Generator is an intelligent web platform that leverages generative AI (e.g., Gemini ) to create customized educational coursebooks on any given topic, tailored to a user's skill level — medium, advanced, or research-oriented. The platform transforms user inputs (e.g., Machine Learning,,Computer Vision) into well-structured, printable PDF course materials that mimic real-world textbooks, including chapters, examples, key points, and project ideas. It serves as a powerful educational tool for self-learners, educators, and institutions, providing dynamically generated learning content that adapts to the learner’s goals and background..",
    tech: ["Next.js", "TypeScript", "JavaScript", "Gemini API", "Tailwind CSS"],
    images: [
      "https://easy-peasy.ai/cdn-cgi/image/quality%3D80%2Cformat%3Dauto%2Cwidth%3D700/https%3A//media.easy-peasy.ai/f1a98533-750a-404d-826a-5940e5c09b1b/f74b648b-a002-4320-98ab-5e365a970636.png",
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    githubUrl: "https://github.com/example/ai-chat",
    liveUrl: "https://ai-chat-demo.vercel.app",
    featured: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: "6",
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description:
      "The  Weather Dashboard is a lightweight and user-friendly web application that allows users to check real-time weather information for any city worldwide. The app fetches data from a public weather API and displays key weather metrics such as temperature, humidity, weather conditions, and wind speed in an intuitive and responsive user interface. Designed with minimalism and performance in mind, the app is ideal for beginners exploring API integration, frontend development, and asynchronous JavaScript programming.",
    tech: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
    images: [
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    githubUrl: "https://github.com/shyammaurya606/WEATHER_app",
    liveUrl: "https://gettingweatherbyshyam.netlify.app/#",
    featured: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: "7",
    slug: "chat-application",
    title: "Chat Application",
    description:
      "The  Chat Application is a real-time messaging platform built with Socket.IO, enabling users to communicate instantly through a shared chat room. The app demonstrates the core concepts of real-time bi-directional communication between clients and servers using WebSockets, making it an excellent learning project for understanding event-driven programming and full-stack web development. This minimal yet functional chat app allows multiple users to join a common room, send messages, and see them broadcasted live to all participants in real time.",
    tech: ["JavaScript", "HTML", "Socket.io", "CSS"],
    images: [
      "https://img.freepik.com/free-vector/gradient-phone-text-bubble-collection_23-2149525017.jpg?q=80&semt=ais_hybrid&w=740",
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    githubUrl: "https://github.com/shyammaurya606/GROUP_GROVE",
    liveUrl: "https://ai-chat-demo.vercel.app",
    featured: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: "8",
    slug: "movies-landing-page",
    title: "Movies Landing Page",
    description:
      "This Movie Landing Page is a visually appealing, static website that showcases a movie or a set of movies using a clean layout and engaging design. Built using core web technologies, this landing page highlights key details such as movie title, synopsis, poster, cast, release date, trailer link, and call-to-action buttons e.g., Watch Now or Book Tickets. It’s ideal for practicing frontend web development, responsive design, and user experience fundamentals.",
    tech: ["React", "Tailwind CSS"],
    images: [
      "https://www.sketchappsources.com/resources/source-image/the-movie-box-landing-page.jpg",
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    githubUrl: "https://github.com/shyammaurya606/STREAM_IT",
    liveUrl: "https://ai-chat-demo.vercel.app",
    featured: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10')
  }
];

export async function generateStaticParams() {
  return mockProjects.map((project) => ({
    slug: project.slug,
  }));
}

interface Props {
  params: { slug: string };
}

async function getProject(slug: string) {
  const project = mockProjects.find(p => p.slug === slug);
  return project || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.images.slice(0, 1),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Project Images */}
        <div className="space-y-4">
          {project.images.map((image, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`${project.title} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{project.title}</h1>
              {project.featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>
            <p className="text-lg text-muted-foreground">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.githubUrl && (
              <Button asChild>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            )}

            {project.liveUrl && (
              <Button asChild variant="outline">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}
          </div>

          {/* Project Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Project Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span>{project.featured ? 'Featured' : 'Regular'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}