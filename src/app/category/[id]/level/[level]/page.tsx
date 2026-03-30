'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import PageWrapper from '@/components/common/PageWrapper';
import MeditationCard from '@/components/MeditationCard';
import { useCategory } from '@/hooks/useCategories';
import { useMeditations } from '@/hooks/useMeditations';
import { Meditation } from '@/api/types/meditation';

export default function LevelPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const categoryLevel = Number(params.level);

  const { data: category, isLoading: isLoadingCategory } =
    useCategory(categoryId);

  const { data: meditations, isLoading: isLoadingMeditations } =
    useMeditations(categoryId);

  const levelMeditations = useMemo(() => {
    return meditations?.filter(
      (meditation) => meditation.level === categoryLevel,
    );
  }, [categoryLevel, meditations]);

  if (isLoadingCategory || isLoadingMeditations) return 'Loading...';

  return (
    <PageWrapper>
      <h3 className="text-lg font-semibold">
        {category?.name} • Level {categoryLevel}
      </h3>
      <p className="text-sm">{category?.description}</p>

      <div className="w-full space-y-6 mt-6">
        {levelMeditations?.map((meditation) => (
          <MeditationCard key={meditation.id} meditation={meditation} />
        ))}
      </div>
    </PageWrapper>
  );
}
