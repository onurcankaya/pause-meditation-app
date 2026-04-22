'use client';

import { ChartNoAxesColumn } from 'lucide-react';
import { useMeditationProgress } from '@/hooks/useMeditationProgress';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import StatsOverview from '@/components/stats/StatsOverview';
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
        <div className="w-full space-y-6">
          <StatsOverview completedMeditations={completedMeditations || []} />
          <ActivityCalendar completedMeditations={completedMeditations || []} />
        </div>
      </QueryState>
    </PageWrapper>
  );
}
