'use client';

import { useCategories } from '@/hooks/useCategories';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import CategoryCard from '@/components/CategoryCard';

export default function Home() {
  const { data: categories, isLoading, error } = useCategories();

  return (
    <PageWrapper title="Pause" description="Select a meditation category">
      <QueryState isLoading={isLoading} error={error}>
        <div className="w-full space-y-4">
          {categories?.length &&
            categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
        </div>
      </QueryState>
    </PageWrapper>
  );
}
