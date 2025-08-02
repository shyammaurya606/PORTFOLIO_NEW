// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { ArrowRight, Code, Server, MapPin, Mail, Calendar,BrainCircuit, ShieldCheck } from "lucide-react";


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

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};

// Mock data
const mockProjects: Project[] = [
  {
    id: "1",
    title: 'S-3 Platform',
    slug: 's-3-platform',
    description:
      "Platform that display SPORTS_STREAMING_SITES  that helps users to discover where they can watch live sports events online based on their location and preferences.",
    tech: ["React", "JavaScript", "Firebase", "APIs", "TailwindCSS"],
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
    tech: ["Express", "Node.js", "Socket.io", "MongoDB", "RESTful API", "Leaflet"],
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

];

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Building Scalable Web Applications with Next.js",
    slug: "scalable-nextjs-apps",
    content: "Learn how to build scalable web applications using Next.js and modern development practices...",
    tags: ["Next.js", "React", "Web Development"],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "TypeScript Best Practices for Large Projects",
    slug: "typescript-best-practices",
    content:
      "Discover the best practices for using TypeScript in large-scale projects and improve code quality...",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Modern CSS Techniques and Animations",
    slug: "modern-css-techniques",
    content:
      "Explore the latest CSS features and animation techniques to create stunning user interfaces...",
    tags: ["CSS", "Animation", "Frontend"],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function getFeaturedProjects(): Promise<Project[]> {
  return mockProjects.filter(project => project.featured);
}

async function getLatestPosts(): Promise<Post[]> {
  return mockPosts.slice(0, 3);
}

export default async function Home() {
  const [featuredProjects, latestPosts] = await Promise.all([
    getFeaturedProjects(),
    getLatestPosts(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Avatar className="w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 border-4 border-primary/20 shadow-2xl">
                <AvatarImage
                src="https://avatars.githubusercontent.com/u/133005048?v=4" // Relative to public/
                  alt="Developer Profile"
                  className="object-cover"

                />
                <AvatarFallback className="text-6xl lg:text-8xl font-bold bg-gradient-to-br from-primary to-purple-600 text-white">
                  DEV
                </AvatarFallback>
              </Avatar>
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse"></div>
              {/* Additional decorative elements */}
              <div className="absolute -inset-4 rounded-full border border-primary/10 animate-pulse" style={{ animationDuration: '3s' }}></div>
              <div className="absolute -inset-8 rounded-full border border-purple-500/10 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              I' Shyam Maurya.,
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-muted-foreground">
              Developer_&_Cyber Enthusiast
            </h2>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
              Ex-Intern at Mobiqliq Global Pvt.Ltd., worked for Research and Development at Startup named WHiLE.,
              Cyber Trainee at Intrainz Innovation.,  - Secured 3 star rating in CodeChef Starters.,
            </p>

            {/* Quick Info  */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Lucknow, Uttar Pradesh, IN</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>shyammaurya1808@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>12+ months experience</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                <Link href="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Currently, I'm a Final-year B-Tech student at the Institute of Engineering and Technology, Lucknow,
              majoring in Computer Science and Engineering with a specialization in Artificial Intelligence.
              I enjoy solving real-world problems and turning ideas into full-fledged applications.
              I'm also a passionate machine learning and cybersecurity enthusiast, constantly exploring ways to build smart,
              secure, and impactful tech solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="card-glow">
                <CardHeader className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">11+</div>
                  <CardTitle className="text-lg">Projects Completed</CardTitle>
                  <CardDescription>Successful web applications Build and delivered</CardDescription>
                </CardHeader>
              </Card>
              <Card className="card-glow">
                <CardHeader className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">12+</div>
                  <CardTitle className="text-lg">Months Experience</CardTitle>
                  <CardDescription>In MERN-stack development</CardDescription>
                </CardHeader>
              </Card>
              <Card className="card-glow">
                <CardHeader className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <CardTitle className="text-lg">Client Satisfaction</CardTitle>
                  <CardDescription>Happy clients and successful projects</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What I Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="card-glow">
            <CardHeader>
              <Code className="h-10 w-10 text-primary mb-4" />
              <CardTitle>MERN Development</CardTitle>
              <CardDescription>
                Building responsive and interactive user websites with MERN,
                Next.js, and modern CSS frameworks.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-glow">
            <CardHeader>
              <Server className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Backend Development</CardTitle>
              <CardDescription>
                Creating robust APIs and server-side applications with Node.js,
                MySQL, and cloud services.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-glow">
            <CardHeader>
              <Code className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Data Structures & Algorithms </CardTitle>
              <CardDescription>
                I practice Data Structures and Algorithms (DSA) using C++, building a strong foundation in problem-solving and coding efficiency.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-glow">
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Cybersecurity</CardTitle>
              <CardDescription>
                I’m passionate about cybersecurity, exploring areas like network security, ethical hacking, penetration testing and system privacy to build secure and resilient systems.
              </CardDescription>
            </CardHeader>
          </Card>


          <Card className="card-glow">
            <CardHeader>
              <BrainCircuit className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Machine Learning</CardTitle>
              <CardDescription>
                I'm exploring machine learning by building intelligent models that learn from data and solve real-world problems through automation and prediction.
              </CardDescription>
            </CardHeader>
          </Card>

        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Button asChild variant="outline">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
          <Button asChild variant="outline">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let's work together to bring your ideas to life. I'm always excited to
          take on new challenges.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
          <Link href="/contact">
            Let's Talk
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}