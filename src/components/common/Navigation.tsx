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
          className="rounded-full w-12 h-12"
          onClick={() => router.back()}
        >
          <ChevronLeft className="size-5" />
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
              className="w-6 h-6"
            />
          )}
          <h1 className="font-semibold">{title}</h1>
        </div>
        {description && (
          <p className="text-muted-foreground text-sm sm:text-base">
            {description}
          </p>
        )}
      </div>
      <div className="w-12" />
    </header>
  );
}
