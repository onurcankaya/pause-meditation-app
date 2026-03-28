'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Category } from '@/api/types/category';

type MeditationCategoryCardProps = {
  category: Category;
};

export default function MeditationCategoryCard({
  category,
}: MeditationCategoryCardProps) {
  return (
    <Card className="w-full min-w-md">
      <CardHeader>
        <CardTitle>
          {/* <h4 className="text-md font-semibold">{category.name}</h4> */}
          {category.name}
        </CardTitle>
        <CardDescription>
          {/* <p className="text-sm">{category?.description}</p> */}
          {category.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
