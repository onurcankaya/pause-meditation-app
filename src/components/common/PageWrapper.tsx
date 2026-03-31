'use client';

import { ReactNode } from 'react';
import { Spinner } from '@/components/ui/spinner';
import Navigation from '@/components/common/Navigation';

type PageWrapperProps = {
  title?: string;
  description?: string | null;
  showBackButton?: boolean;
  children: ReactNode;
  isLoading: boolean;
  error: Error | null;
};

export default function PageWrapper({
  title = '',
  description = '',
  showBackButton,
  children,
  isLoading,
  error,
}: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col flex-1 items-center justify-center p-4">
      <Navigation
        title={title}
        description={description}
        showBackButton={showBackButton}
      />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center sm:items-start">
        {error ? (
          <div className="w-full flex flex-1 items-center justify-center border border-red-500 rounded-md">
            <p className="text-center text-red-500">{error.message}</p>
          </div>
        ) : isLoading ? (
          <div className="w-full flex flex-1 items-center justify-center">
            <Spinner className="h-10 w-10 text-primary" />
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
