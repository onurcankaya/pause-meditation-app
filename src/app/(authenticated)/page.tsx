'use client';

import { useCategories } from '@/hooks/useCategories';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import CategoryCard from '@/components/CategoryCard';

export default function Home() {
  const { data: categories, isLoading, error } = useCategories();

  return (
    <PageWrapper showLogo description="Select a category" isLoading={isLoading}>
      <QueryState
        isLoading={isLoading}
        error={error}
        queryKeys={['categories']}
      >
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
