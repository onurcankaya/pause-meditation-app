'use client';

import { ChartNoAxesColumn } from 'lucide-react';
import { useMeditationProgress } from '@/hooks/useMeditationProgress';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import ActivityCalendar from '@/components/stats/ActivityCalendar';

export default function StatsPage() {
  const {
    data: completedMeditations,
    isLoading,
    error,
  } = useMeditationProgress();

  return (
    <PageWrapper
      icon={ChartNoAxesColumn}
      title="Meditation Stats"
      isLoading={isLoading}
    >
      <QueryState
        isLoading={isLoading}
        error={error}
        queryKeys={['meditationProgress']}
      >
        <ActivityCalendar meditations={completedMeditations || []} />
      </QueryState>
    </PageWrapper>
  );
}
