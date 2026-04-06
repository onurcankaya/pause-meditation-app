'use client';

import { useState } from 'react';
import { Badge, BadgeCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MediaPlayer from './common/MediaPlayer';
import { useCategory } from '@/hooks/useCategories';
import { useUpdateMeditation } from '@/hooks/useMeditations';
import { cn } from '@/lib/utils';
import { Meditation } from '@/api/types/meditation';

type MeditationCardProps = {
  meditation: Meditation;
};

export default function MeditationCard({ meditation }: MeditationCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isCompleted, setIsCompleted] = useState(meditation.is_completed);

  const { data: category } = useCategory(meditation.category_id);

  const updateMeditation = useUpdateMeditation();

  function toggleDetails() {
    setShowDetails((prev) => !prev);
  }

  function handleMeditationComplete(meditationId: string) {
    setIsCompleted(true);
    updateMeditation.mutate({
      id: meditationId,
    });
  }

  return (
    <Card
      className={cn(
        'border gap-4 py-3',
        isCompleted && 'border border-primary',
      )}
    >
      <CardHeader
        className={cn(
          'flex flex-row justify-between items-center',
          showDetails && 'border-b',
        )}
        onClick={toggleDetails}
      >
        <CardTitle>Day {meditation.day}</CardTitle>
        {isCompleted ? (
          <BadgeCheck className="text-primary" />
        ) : (
          <Badge className={cn('text-ring', showDetails && 'text-primary')} />
        )}
      </CardHeader>

      {showDetails && (
        <CardContent className="space-y-4">
          {meditation?.video_url && (
            <>
              <MediaPlayer
                src={meditation.video_url}
                type="video"
                title={meditation.title}
                album={category?.name}
              />

              <div className="border-b bg- mx-[-16]" />
            </>
          )}

          <MediaPlayer
            src={meditation.audio_url}
            type="audio"
            title={meditation.title}
            album={category?.name}
            onMediaEnd={() => handleMeditationComplete(meditation.id)}
          />
        </CardContent>
      )}
    </Card>
  );
}
