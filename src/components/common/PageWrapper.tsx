'use client';

import { ReactNode } from 'react';
import Navigation from '@/components/common/Navigation';

type PageWrapperProps = {
  title?: string;
  description?: string | null;
  showBackButton?: boolean;
  children: ReactNode;
};

export default function PageWrapper({
  title = '',
  description = '',
  showBackButton,
  children,
}: PageWrapperProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4">
      <Navigation
        title={title}
        description={description}
        showBackButton={showBackButton}
      />

      <main className="flex flex-1 w-full max-w-3xl flex-col items-center sm:items-start">
        {children}
      </main>
    </div>
  );
}
