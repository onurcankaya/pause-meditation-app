import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Meditation App',
  description: 'Guided meditations on the go',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="darker">
      <body className="antialiased">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
