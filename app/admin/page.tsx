import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileText, FolderOpen, Mail, Users } from 'lucide-react';

async function getDashboardStats() {
  try {
    const [projectsCount, postsCount, skillsCount, messagesCount, unreadMessages] = await Promise.all([
      prisma.project.count(),
      prisma.post.count(),
      prisma.skill.count(),
      prisma.message.count(),
      prisma.message.count({ where: { read: false } }),
    ]);

    return {
      projects: projectsCount,
      posts: postsCount,
      skills: skillsCount,
      messages: messagesCount,
      unreadMessages,
    };
  } catch (error) {
    return {
      projects: 0,
      posts: 0,
      skills: 0,
      messages: 0,
      unreadMessages: 0,
    };
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const stats = await getDashboardStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">Total projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts}</div>
            <p className="text-xs text-muted-foreground">Published posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.skills}</div>
            <p className="text-xs text-muted-foreground">Technical skills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messages}</div>
            <p className="text-xs text-muted-foreground">
              {stats.unreadMessages} unread
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your portfolio content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/projects"
              className="block p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-medium">Manage Projects</div>
              <div className="text-sm text-muted-foreground">Add, edit, or delete projects</div>
            </a>
            <a
              href="/admin/posts"
              className="block p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-medium">Manage Blog Posts</div>
              <div className="text-sm text-muted-foreground">Create and edit blog content</div>
            </a>
            <a
              href="/admin/skills"
              className="block p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-medium">Manage Skills</div>
              <div className="text-sm text-muted-foreground">Update your technical skills</div>
            </a>
            <a
              href="/admin/messages"
              className="block p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-medium">View Messages</div>
              <div className="text-sm text-muted-foreground">
                Check contact form submissions
                {stats.unreadMessages > 0 && (
                  <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                    {stats.unreadMessages} new
                  </span>
                )}
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates to your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Activity tracking coming soon...
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}