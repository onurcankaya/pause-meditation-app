import { ReactNode } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function QueryState({
  isLoading,
  error,
  children,
}: {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
}) {
  if (error) {
    return (
      <div className="w-full flex flex-1 items-center justify-center border border-red-500 rounded-md">
        <p className="text-center text-red-500">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex flex-1 items-center justify-center">
        <Spinner className="h-10 w-10 text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
