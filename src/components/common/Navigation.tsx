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
    <header className="w-full flex items-center justify-between py-2">
      {showBackButton ? (
        <Button
          variant="secondary"
          className="rounded-full w-10 h-10"
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </Button>
      ) : (
        <div className="w-8" />
      )}
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="flex items-center gap-1">
          {!showBackButton && (
            <img
              src="/pause-logo.png"
              alt="pause app logo"
              className="w-5 h-5"
            />
          )}
          <h1 className="font-semibold">{title}</h1>
        </div>
        {description && (
          <p className="text-muted-foreground text-xs sm:text-sm">
            {description}
          </p>
        )}
      </div>
      <div className="w-8" />
    </header>
  );
}
