'use client';

import { useCategories } from '@/hooks/useCategories';
import { Spinner } from '@/components/ui/spinner';
import PageWrapper from '@/components/common/PageWrapper';
import CategoryCard from '@/components/CategoryCard';

export default function Home() {
  const { data: categories, isLoading, error } = useCategories();

  return (
    <PageWrapper>
      <h3 className="text-lg font-semibold">Meditations</h3>

      {isLoading ? (
        <div className="w-full">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <div className="w-full space-y-6 mt-6">
          {categories?.length &&
            categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
        </div>
      )}
    </PageWrapper>
  );
}
