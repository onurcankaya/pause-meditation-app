'use client';

import { useCategories } from '@/hooks/useCategories';
import PageWrapper from '@/components/common/PageWrapper';
import CategoryCard from '@/components/CategoryCard';

export default function Home() {
  const { data: categories, isLoading, error } = useCategories();

  return (
    <PageWrapper
      title="Meditations"
      description="Select a category below"
      isLoading={isLoading}
      error={error}
    >
      <div className="w-full space-y-6 my-4">
        {categories?.length &&
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
      </div>
    </PageWrapper>
  );
}
