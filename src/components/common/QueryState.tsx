import { ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { RotateCcw as RetryIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

type QueryStateProps = {
  isLoading: boolean;
  error: Error | null;
  queryKeys: string[];
  children: ReactNode;
};

export default function QueryState({
  isLoading,
  error,
  queryKeys,
  children,
}: QueryStateProps) {
  const queryClient = useQueryClient();

  if (error) {
    return (
      <div className="w-full flex flex-1 items-center justify-center p-4">
        <div className="w-full flex items-center justify-center border border-red-400 rounded-md p-4">
          <p className="text-sm text-center text-red-400">{error.message}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: queryKeys,
            });
          }}
        >
          <RetryIcon />
          Retry
        </Button>
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
