'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="border py-3 cursor-pointer" onClick={handleClick}>
      <CardHeader>
        <CardTitle>Level {level}</CardTitle>
      </CardHeader>
    </Card>
  );
}
