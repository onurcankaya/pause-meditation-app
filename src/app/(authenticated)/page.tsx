'use client';

import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useUser } from '@/hooks/useUser';
import { useCategories } from '@/hooks/useCategories';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import WelcomeCard from '@/components/WelcomeCard';
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

  const isLoading = isLoadingUser || isLoadingCategories;
  const error = errorUser || errorCategories;

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
        <WelcomeCard greeting={getGreeting} className="mb-8" />

        <div className="w-full mb-2">
          <h4 className="text-[11px] text-ring uppercase tracking-widest text-left font-semibold">
            Categories
          </h4>
        </div>
        <div className="w-full space-y-4">
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </QueryState>
    </PageWrapper>
  );
}
