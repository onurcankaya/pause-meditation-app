'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Category } from '@/api/types/category';
import { Meditation } from '@/api/types/meditation';

type LevelCardProps = {
  category: Category;
  level: string;
  meditations: Meditation[];
};

export default function LevelCard({
  category,
  level,
  meditations,
}: LevelCardProps) {
  const router = useRouter();

  function handleClick() {
    router.push(`/category/${category.id}/level/${level}`);
  }

  return (
    <Card className="cursor-pointer" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{category?.name}</CardTitle>
        <CardDescription>Level {level}</CardDescription>
      </CardHeader>
    </Card>
  );
}
