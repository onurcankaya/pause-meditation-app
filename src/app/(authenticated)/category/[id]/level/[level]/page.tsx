'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import MeditationCard from '@/components/MeditationCard';
import Badge from '@/components/common/Badge';
import { useCategory } from '@/hooks/useCategories';
import { useMeditations, useMeditationProgress } from '@/hooks/useMeditations';
import { cn } from '@/lib/utils';

export default function LevelPage() {
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  const params = useParams();
  const categoryId = params.id as string;
  const categoryLevel = Number(params.level);

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

  const levelTitle = useMemo(() => {
    return `${category?.name || ''} • Level ${categoryLevel}`;
  }, [category, categoryLevel]);

  const levelMeditations = useMemo(() => {
    return meditations?.filter(
      (meditation) => meditation.level === categoryLevel,
    );
  }, [categoryLevel, meditations]);

  const completedMeditationIds = useMemo(() => {
    return meditationProgress?.map(
      (completedMeditation) => completedMeditation.meditation_id,
    );
  }, [meditationProgress]);

  useEffect(() => {
    setIsLevelComplete(() => {
      return (
        levelMeditations?.every((meditation) =>
          completedMeditationIds?.includes(meditation.id),
        ) || false
      );
    });
  }, [levelMeditations, meditationProgress]);

  return (
    <PageWrapper
      title={levelTitle}
      description={category?.description}
      isLoading={isLoadingCategory}
      showBackButton
    >
      <QueryState
        isLoading={
          isLoadingCategory ||
          isLoadingMeditations ||
          isLoadingMeditationProgress
        }
        error={errorCategory || errorMeditations || errorMeditationProgress}
      >
        <div className="w-full space-y-4">
          {levelMeditations?.map((meditation) => (
            <MeditationCard key={meditation.id} meditation={meditation} />
          ))}
        </div>

        <div className="w-full flex items-center justify-center gap-2 mt-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <Badge
              text={`Level ${categoryLevel}`}
              width={90}
              height={90}
              className={cn(
                'text-ring drop-shadow-lg',
                isLevelComplete && 'text-primary',
              )}
            />
          </div>
        </div>
      </QueryState>
    </PageWrapper>
  );
}
