'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import MeditationCard from '@/components/MeditationCard';
import { useCategory } from '@/hooks/useCategories';
import { useMeditations } from '@/hooks/useMeditations';

export default function LevelPage() {
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

  const levelMeditations = useMemo(() => {
    return meditations?.filter(
      (meditation) => meditation.level === categoryLevel,
    );
  }, [categoryLevel, meditations]);

  return (
    <PageWrapper
      title={`${category?.name || ''} • Level ${categoryLevel}`}
      description={category?.description}
      isLoading={isLoadingCategory}
      showBackButton
    >
      <QueryState
        isLoading={isLoadingCategory || isLoadingMeditations}
        error={errorCategory || errorMeditations}
      >
        <div className="w-full space-y-4">
          {levelMeditations?.map((meditation) => (
            <MeditationCard key={meditation.id} meditation={meditation} />
          ))}
        </div>
      </QueryState>
    </PageWrapper>
  );
}
