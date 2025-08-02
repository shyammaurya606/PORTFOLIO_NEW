import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { LogOut, Home } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Admin Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="font-semibold">
                Admin Panel
              </Link>
              <nav className="hidden md:flex items-center space-x-6 text-sm">
                <Link 
                  href="/admin/projects" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
                <Link 
                  href="/admin/posts" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Posts
                </Link>
                <Link 
                  href="/admin/skills" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Skills
                </Link>
                <Link 
                  href="/admin/messages" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Messages
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button asChild size="sm" variant="ghost">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </Link>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}