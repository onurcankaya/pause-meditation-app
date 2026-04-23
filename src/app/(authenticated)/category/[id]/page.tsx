'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import LevelCard from '@/components/LevelCard';
import { useCategory, useMeditationsByCategory } from '@/hooks/useCategories';
import { LevelStatus } from '@/api/types/level';
import { MeditationStatus } from '@/api/types/meditation';

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
  } = useMeditationsByCategory(categoryId);

  const isLoading = useMemo(() => {
    return isLoadingCategory || isLoadingMeditations;
  }, [isLoadingCategory, isLoadingMeditations]);

  const hasError = useMemo(() => {
    return errorCategory || errorMeditations;
  }, [errorCategory, errorMeditations]);

  const levels = useMemo(() => {
    if (!meditations) return [];

    const levelNumbers = [...new Set(meditations.map((m) => m.level))].sort(
      (a, b) => a - b,
    );

    return levelNumbers.map((level) => {
      const levelMeditations = meditations.filter((m) => m.level === level);
      const prevLevelMeditations = meditations.filter(
        (m) => m.level === level - 1,
      );

      const allCurrentComplete = levelMeditations.every(
        (m) => m.status === MeditationStatus.COMPLETED,
      );
      const allPrevComplete =
        level === 1 ||
        prevLevelMeditations.every(
          (m) => m.status === MeditationStatus.COMPLETED,
        );

      let status = LevelStatus.LOCKED;
      if (allCurrentComplete) {
        status = LevelStatus.COMPLETED;
      } else if (allPrevComplete) {
        status = LevelStatus.IN_PROGRESS;
      }

      return { level, status };
    });
  }, [meditations]);

  return (
    <PageWrapper
      title={category?.name}
      description={category?.description}
      isLoading={isLoading}
      showBackButton
    >
      <QueryState
        isLoading={isLoading}
        error={hasError}
        queryKeys={['categories', 'meditations', 'meditationProgress']}
      >
        <div className="w-full space-y-4">
          {category &&
            levels.map((level) => (
              <LevelCard
                key={`${category.id}-${level.level}`}
                category={category}
                level={level.level}
                status={level.status}
              />
            ))}
        </div>
      </QueryState>
    </PageWrapper>
  );
}
