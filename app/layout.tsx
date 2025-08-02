import './globals.css';
import type { Metadata } from 'next/metadata';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Suspense } from 'react';
// import { ErrorBoundary } from '@/components/error-boundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Shyam Maurya - Developer Portfolio',
    template: '%s | Shyam Maurya',
  },
  description: 'Full-stack developer and cybersecurity enthusiast specializing in MERN stack, machine learning, and modern web technologies',
  keywords: [
    'Shyam Maurya',
    'developer', 
    'portfolio', 
    'web development', 
    'full-stack', 
    'React', 
    'Next.js',
    'MERN stack',
    'cybersecurity',
    'machine learning',
    'JavaScript',
    'TypeScript'
  ],
  authors: [{ name: 'Shyam Maurya', url: 'https://github.com/shyammaurya606' }],
  creator: 'Shyam Maurya',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Shyam Maurya - Developer Portfolio',
    description: 'Full-stack developer and cybersecurity enthusiast specializing in MERN stack, machine learning, and modern web technologies',
    siteName: 'Shyam Maurya Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shyam Maurya - Developer Portfolio',
    description: 'Full-stack developer and cybersecurity enthusiast specializing in MERN stack, machine learning, and modern web technologies',
    creator: '@shyammaurya606',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        {/* <ErrorBoundary> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]">Loading...</div>}>
                  {children}
                </Suspense>
              </main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}