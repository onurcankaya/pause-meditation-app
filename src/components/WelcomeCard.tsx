'use client';

import { cn } from '@/lib/utils';

type WelcomeCardProps = {
  greeting: string;
  className?: string;
};

export default function WelcomeCard({
  greeting,
  className = '',
}: WelcomeCardProps) {
  return (
    <div className={cn('w-full', className)}>
      <h2 className="text-lg font-semibold mb-1">{greeting}</h2>
      <p className="text-xs text-muted-foreground">
        What would you like to explore today?
      </p>
    </div>
  );
}
