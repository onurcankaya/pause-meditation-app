'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Category } from '@/api/types/category';

type LevelCardProps = {
  category: Category;
  level: string;
};

export default function LevelCard({ category, level }: LevelCardProps) {
  const router = useRouter();

  function handleClick() {
    router.push(`/category/${category.id}/level/${level}`);
  }

  return (
    <Card className="cursor-pointer" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{category?.name}</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Level {level}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
