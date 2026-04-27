'use client';

import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useUser } from '@/hooks/useUser';
import { useCategories } from '@/hooks/useCategories';
import { useMeditationProgress } from '@/hooks/useMeditationProgress';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import WelcomeCard from '@/components/WelcomeCard';
import StatsOverview from '@/components/stats/StatsOverview';
import CategoryCard from '@/components/CategoryCard';

export default function Home() {
  const { data: session } = useSession();
  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useUser(session?.user?.id || '');
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useCategories();

  const {
    data: completedMeditations,
    isLoading: isLoadingCompletedMeditations,
    error: errorCompletedMeditations,
  } = useMeditationProgress();

  const isLoading =
    isLoadingUser || isLoadingCategories || isLoadingCompletedMeditations;
  const error = errorUser || errorCategories || errorCompletedMeditations;

  const getGreeting = useMemo(() => {
    const hour = new Date().getHours();
    const name = user?.name || '';

    if (hour >= 5 && hour < 12) {
      return `Good morning ${name} ☀️`;
    } else if (hour >= 12 && hour < 18) {
      return `Good afternoon ${name} 🌤️`;
    } else {
      return `Good evening ${name} 🌙`;
    }
  }, [user?.name]);

  return (
    <PageWrapper showLogo description="Select a category" isLoading={isLoading}>
      <QueryState
        isLoading={isLoading}
        error={error}
        queryKeys={['categories']}
      >
        <div className="w-full space-y-6">
          <WelcomeCard greeting={getGreeting} />
          <StatsOverview completedMeditations={completedMeditations || []} />

          <div>
            <h4 className="text-[11px] text-ring uppercase tracking-widest text-left font-semibold mb-3">
              Categories
            </h4>

            <div className="w-full space-y-4">
              {categories?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </QueryState>
    </PageWrapper>
  );
}
