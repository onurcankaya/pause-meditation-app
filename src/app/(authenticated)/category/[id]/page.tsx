'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import LevelCard from '@/components/LevelCard';
import { useCategory } from '@/hooks/useCategories';
import { useMeditations } from '@/hooks/useMeditations';
import { useMeditationProgress } from '@/hooks/useMeditations';
import { LevelStatus } from '@/api/types/level';
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

  const {
    data: meditationProgress,
    isLoading: isLoadingMeditationProgress,
    error: errorMeditationProgress,
  } = useMeditationProgress();

  const isLoading = useMemo(() => {
    return (
      isLoadingCategory || isLoadingMeditations || isLoadingMeditationProgress
    );
  }, [isLoadingCategory, isLoadingMeditations, isLoadingMeditationProgress]);

  const hasError = useMemo(() => {
    return errorCategory || errorMeditations || errorMeditationProgress;
  }, [errorCategory, errorMeditations, errorMeditationProgress]);

  const meditationsByLevel = useMemo(() => {
    if (!meditations) return {};

    const map: Record<number, Meditation['id'][]> = {};

    for (const meditation of meditations) {
      if (!map[meditation.level]) {
        map[meditation.level] = [];
      }
      map[meditation.level].push(meditation.id);
    }

    return map;
  }, [meditations]);

  const completedMeditationIds = useMemo(() => {
    return meditationProgress?.map(
      (completedMeditation) => completedMeditation.meditation_id,
    );
  }, [meditationProgress]);

  const levels = useMemo(() => {
    return Object.entries(meditationsByLevel).map(([level, meditations]) => {
      let status = LevelStatus.LOCKED;

      if (
        meditations.every((meditation) =>
          completedMeditationIds?.includes(meditation),
        )
      ) {
        status = LevelStatus.COMPLETED;
      } else if (
        meditations.some((meditation) =>
          completedMeditationIds?.includes(meditation),
        )
      ) {
        status = LevelStatus.IN_PROGRESS;
      }

      return {
        level,
        status,
      };
    });
  }, [meditationsByLevel, meditationProgress, completedMeditationIds]);

  return (
    <PageWrapper
      title={category?.name}
      description={category?.description}
      isLoading={isLoading}
      showBackButton
    >
      <QueryState isLoading={isLoading} error={hasError}>
        <div className="w-full space-y-4">
          {category &&
            levels.map((level) => (
              <LevelCard
                key={`${category}-${level.level}`}
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
