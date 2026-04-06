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
    <Card className="border py-3 cursor-pointer" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          {category.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
