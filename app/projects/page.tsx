"use client"

import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  images: string[];
  featured: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};

const mockProjects: Project[] = [
  {
    id: "1",
    title: 'S-3 Platform',
    slug: 's-3-platform',
    description:
      "Platform that display SPORTS_STREAMING_SITES  that helps users to discover where they can watch live sports events online based on their location and preferences.",
    tech: ["React", "JavaScript", "Firebase", "APIs","TailwindCSS"],
    githubUrl: "https://github.com/shyammaurya606/project-1",
    liveUrl: 'https://project-nu-lake.vercel.app/',
    images: ["https://thumbs.dreamstime.com/b/irresistible-attack-rage-multi-sports-collage-hockey-soccer-american-football-players-conceptual-photo-emotional-110067569.jpg"],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "RealTime Group GPS",
    slug: "realtime-group-gps",
    description:
      "REALTIME_GROUP_GPS is tracking platform designed to help multiple users share their live locations within a private group.",
    tech: ["Express", "Node.js", "Socket.io", "MongoDB","RESTful API","Leaflet"],
    githubUrl: "https://github.com/shyammaurya606/REALTIME_GROUP_GPS",
    liveUrl: 'https://realtime-group-gps-1.onrender.com/',
    images: [
      "https://c4.wallpaperflare.com/wallpaper/981/674/477/earth-neon-black-background-world-map-hd-wallpaper-preview.jpg",
    ],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Living CalC Canvas",
    slug: "living-calc-canvas",
    description:
      "- An AI-powered calculator that transforms your handwritten drawings into dynamic mathematical expressions.",
    tech: ["Python", "Gemini API", " TypeScript", "Latex(rendering)"],
    githubUrl: "https://github.com/shyammaurya606/LIVING_CALC",
    liveUrl: 'https://calc-fe.vercel.app/',
    images: [
      "https://miro.medium.com/v2/resize%3Afit%3A1200/1%2AoiNWwZNv8Qf827EYHJ2nnA.jpeg",
    ],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Chess DotCom",
    slug: "chess-dotcom",
    description:
      "This project is a real-time multiplayer chess game built using Socket.IO for bi-directional communication between clients and the server.",
    tech: ["JavaScript", "Socket.io", "Express" ,"Tailwind CSS","Chess.js"],
    githubUrl: "https://github.com/shyammaurya606/CHESS_DOT_COM",
    liveUrl: "https://chesswithshyam.onrender.com/",
    images: [
      "https://www.freevector.com/uploads/vector/preview/9302/FreeVector-008-Chess-Illustrations-M_2.jpg",
    ],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "AI Course Generator",
    slug: "ai-course-generator",
    description:
      "The AI Course Generator is an intelligent web platform that leverages generative AI (e.g., Gemini ) to create customized educational coursebooks on any given topic.",
    tech: ["Next.js","TypeScript","JavaScript", "Gemini API", "Tailwind CSS"],
    githubUrl: "https://github.com/example/ai-chat",
    liveUrl: "https://ai-chat-demo.vercel.app",
    images: [
      "https://easy-peasy.ai/cdn-cgi/image/quality%3D80%2Cformat%3Dauto%2Cwidth%3D700/https%3A//media.easy-peasy.ai/f1a98533-750a-404d-826a-5940e5c09b1b/f74b648b-a002-4320-98ab-5e365a970636.png",
    ],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    title: "Weather Dashboard",
    slug: "weather-dashboard",
    description:
      "The  Weather DashBoard is a lightweight and user-friendly web application that allows users to check real-time weather information for any city worldwide. ",
    tech: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
    githubUrl: "https://github.com/shyammaurya606/WEATHER_app",
    liveUrl: "https://gettingweatherbyshyam.netlify.app/#",
    images: [
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
    ],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    title: "Chat Application",
    slug: "chat-application",
    description:
      "The  Chat Application is a real-time messaging platform built with Socket.IO..",
    tech: ["JavaScript", "HTML", "Socket.io", "CSS"],
    githubUrl: "https://github.com/shyammaurya606/GROUP_GROVE",
    liveUrl: "https://ai-chat-demo.vercel.app",
    images: [
      "https://img.freepik.com/free-vector/gradient-phone-text-bubble-collection_23-2149525017.jpg?q=80&semt=ais_hybrid&w=740",
    ],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    title: "Movies Landing Page",
    slug: "movies-landing-page",
    description:
      "This Movie Landing Page is a visually appealing, static website that showcases a movie.or a set of movies using a clean layout and engaging design.",
    tech: [ "React", "Tailwind CSS"],
    githubUrl: "https://github.com/shyammaurya606/STREAM_IT",
    liveUrl: "https://ai-chat-demo.vercel.app",
    images: [
      "https://www.sketchappsources.com/resources/source-image/the-movie-box-landing-page.jpg",
    ],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ProjectsPage() {
  const [projects] = useState<Project[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('');

  const allTech = ['All', 'React','JavaScript', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Vue.js', 'Express', 'Socket.io', 'Gemini API'];

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedTech]);

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter((project: Project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTech && selectedTech !== 'All') {
      filtered = filtered.filter((project: Project) =>
        project.tech.includes(selectedTech)
      );
    }

    setFilteredProjects(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of projects I've worked on, showcasing different technologies and approaches.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Filter className="h-4 w-4 mt-2 text-muted-foreground" />
          {allTech.map((tech) => (
            <Badge
              key={tech}
              variant={selectedTech === tech ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={() => setSelectedTech(tech === 'All' ? '' : tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {projects.length === 0 ? 'No projects found.' : 'No projects match your filters.'}
          </p>
          {(searchTerm || selectedTech) && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedTech('');
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}