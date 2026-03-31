'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavigationProps = {
  title?: string;
  description?: string | null;
  showBackButton?: boolean;
};

export default function Navigation({
  title,
  description,
  showBackButton,
}: NavigationProps) {
  const router = useRouter();

  return (
    <header className="w-full flex items-center justify-between h-[60]">
      {showBackButton ? (
        <Button
          variant="secondary"
          className="rounded-full w-8 h-8"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
      ) : (
        <div className="w-8" />
      )}
      <div className="text-center">
        <h1 className="text-md font-semibold mb-1">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground text-xs sm:text-sm">
            {description}
          </p>
        )}
      </div>
      <div className="w-8" />
    </header>
  );
}
