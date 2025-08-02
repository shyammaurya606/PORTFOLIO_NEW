import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="card-glow overflow-hidden transition-all duration-300">
      {project.images[0] && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{project.title}</CardTitle>
          {project.featured && (
            <Badge variant="secondary">Featured</Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map(tech => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.tech.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.tech.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/projects/${project.slug}`}>
              View Details
            </Link>
          </Button>
          
          {project.githubUrl && (
            <Button asChild size="sm" variant="outline">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          )}
          
          {project.liveUrl && (
            <Button asChild size="sm" variant="outline">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}