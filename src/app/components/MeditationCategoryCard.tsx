'use client';

import { Category } from '@/api/types/category';

type MeditationCategoryCardProps = {
  category: Category;
};

export default function MeditationCategoryCard({
  category,
}: MeditationCategoryCardProps) {
  return (
    <div>
      <h4 className="text-md font-semibold">{category.name}</h4>
      <p className="text-sm">{category?.description}</p>
    </div>
  );
}
