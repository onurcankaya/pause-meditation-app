'use client';

import { ReactNode } from 'react';
import Navigation from '@/components/common/Navigation';

type PageWrapperProps = {
  title?: string | null;
  description?: string | null;
  showLogo?: boolean | null;
  showBackButton?: boolean | null;
  isLoading?: boolean | null;
  children: ReactNode;
};

export default function PageWrapper({
  title = '',
  description = '',
  showLogo,
  showBackButton,
  isLoading,
  children,
}: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col flex-1 items-center justify-center p-4">
      <Navigation
        title={title}
        description={description}
        showLogo={showLogo}
        showBackButton={showBackButton}
        isLoading={isLoading}
      />
      <main className="flex flex-1 w-full max-w-xl flex-col items-center sm:items-start px-4 py-8">
        {children}
      </main>
    </div>
  );
}
