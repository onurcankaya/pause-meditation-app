import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthSessionProvider } from '@/components/providers/AuthSessionProvider';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Pause',
  description: 'Guided meditations',
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('darker', inter.variable)}>
      <body className="antialiased font-sans">
        <AuthSessionProvider>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
