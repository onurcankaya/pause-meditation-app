'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import MeditationCard from '@/components/MeditationCard';
import { useCategory } from '@/hooks/useCategories';
import { useMeditations, useMeditationProgress } from '@/hooks/useMeditations';
import { cn } from '@/lib/utils';

export default function LevelPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const categoryLevel = Number(params.level);

  const [isLevelComplete, setIsLevelComplete] = useState(false);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              className={cn(
                'text-ring drop-shadow-lg',
                isLevelComplete && 'text-primary',
              )}
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <text
                x="12"
                y="12"
                textAnchor="middle"
                dominantBaseline="middle"
                fontWeight="500"
                fontFamily="system-ui, -apple-system, sans-serif"
                letterSpacing="-0.2"
                stroke="none"
                fill="currentColor"
                className="text-[3.5px]"
              >
                Level {categoryLevel}
              </text>
            </svg>
          </div>
        </div>
      </QueryState>
    </PageWrapper>
  );
}
