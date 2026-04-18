'use client';

import { useRouter } from 'next/navigation';
import { Badge, BadgeCheck, BadgeMinus } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import StatusIndicator from '@/components/common/StatusIndicator';
import { cn } from '@/lib/utils';
import { Category } from '@/api/types/category';
import { LevelStatus } from '@/api/types/level';

type LevelCardProps = {
  category: Category;
  level: string;
  status: LevelStatus;
};

export default function LevelCard({ category, level, status }: LevelCardProps) {
  const router = useRouter();

  function handleClick() {
    router.push(`/category/${category.id}/level/${level}`);
  }

  return (
    <Card
      className={cn(
        'border py-3 cursor-pointer',
        status === LevelStatus.IN_PROGRESS && 'border-primary',
        status === LevelStatus.LOCKED && 'opacity-60',
      )}
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Level {level}</span>

          {status === LevelStatus.COMPLETED && (
            <div className="flex items-center gap-4">
              <BadgeCheck className="text-primary" />
            </div>
          )}

          {status === LevelStatus.IN_PROGRESS && (
            <div className="flex items-center gap-4">
              <StatusIndicator variant={status} />
              <Badge className="text-primary" />
            </div>
          )}

          {status === LevelStatus.LOCKED && (
            <div className="flex items-center gap-4">
              <BadgeMinus className="text-ring" />
            </div>
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
