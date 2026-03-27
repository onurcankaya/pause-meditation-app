'use client';

import { useCategories } from '@/hooks/useCategories';
import MeditationCategoryCard from './components/MeditationCategoryCard';

export default function Home() {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useCategories();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center p-16 bg-white dark:bg-black sm:items-start">
        <h3 className="text-lg font-semibold">Meditations</h3>

        <div className="space-y-8 mt-10">
          {categories?.length &&
            categories.map((category) => (
              <MeditationCategoryCard key={category.id} category={category} />
            ))}
        </div>
      </main>
    </div>
  );
}
