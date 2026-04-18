'use client';

import { capitalize } from 'lodash';
import { cn } from '@/lib/utils';

type StatusIndicatorProps = {
  variant: 'completed' | 'in progress' | 'locked';
  label?: string;
};

export default function StatusIndicator({
  variant,
  label,
}: StatusIndicatorProps) {
  return (
    <div
      className={cn(
        'border px-2.5 py-0.75 rounded-full',
        variant === 'completed' && 'bg-primary',
        variant === 'in progress' && 'border-transparent bg-primary/20',
        variant === 'locked' && 'border-ring',
      )}
    >
      <p
        className={cn(
          'text-[10px] font-semibold',
          variant === 'completed' && 'text-black',
          variant === 'in progress' && 'text-primary',
        )}
      >
        {label || capitalize(variant)}
      </p>
    </div>
  );
}
