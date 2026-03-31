'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Category } from '@/api/types/category';

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  function handleClick() {
    router.push(`/category/${category.id}`);
  }

  return (
    <Card className="cursor-pointer" onClick={handleClick}>
      <CardHeader>
        <CardTitle className="text-sm sm:text-md">{category.name}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {category.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
