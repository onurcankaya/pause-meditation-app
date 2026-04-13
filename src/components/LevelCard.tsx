'use client';

import { useRouter } from 'next/navigation';
import { Badge, BadgeCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Category } from '@/api/types/category';

type LevelCardProps = {
  category: Category;
  level: string;
  isCompleted: boolean;
};

export default function LevelCard({
  category,
  level,
  isCompleted,
}: LevelCardProps) {
  const router = useRouter();

  function handleClick() {
    router.push(`/category/${category.id}/level/${level}`);
  }

  return (
    <Card
      className={cn(
        'border py-3 cursor-pointer',
        isCompleted && 'border-primary',
      )}
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Level {level}</span>

          {isCompleted ? (
            <BadgeCheck className="text-primary" />
          ) : (
            <Badge className="text-ring" />
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
