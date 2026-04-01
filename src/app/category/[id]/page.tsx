'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import LevelCard from '@/components/LevelCard';
import { useCategory } from '@/hooks/useCategories';
import { useMeditations } from '@/hooks/useMeditations';
import { Meditation } from '@/api/types/meditation';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const {
    data: category,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useCategory(categoryId);

  const {
    data: meditations,
    isLoading: isLoadingMeditations,
    error: errorMeditations,
  } = useMeditations(categoryId);

  const meditationsByLevel = useMemo(() => {
    if (!meditations) return {};

    const map: Record<number, Meditation[]> = {};

    for (const meditation of meditations) {
      if (!map[meditation.level]) {
        map[meditation.level] = [meditation];
      } else {
        map[meditation.level].push(meditation);
      }
    }

    return map;
  }, [meditations]);

  return (
    <PageWrapper
      title={category?.name}
      description={category?.description}
      showBackButton
    >
      <QueryState
        isLoading={isLoadingCategory || isLoadingMeditations}
        error={errorCategory || errorMeditations}
      >
        <div className="w-full space-y-6">
          {category &&
            Object.entries(meditationsByLevel).map((item, index) => {
              const [level, meditations] = item;
              return (
                <LevelCard
                  key={index}
                  category={category}
                  level={level}
                  meditations={meditations}
                />
              );
            })}
        </div>
      </QueryState>
    </PageWrapper>
  );
}
