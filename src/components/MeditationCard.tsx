'use client';

import { useState, useEffect } from 'react';
import { BadgeCheck, BadgeMinus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MediaPlayer from '@/components/common/MediaPlayer';
import StatusIndicator from '@/components/common/StatusIndicator';
import { useCategory } from '@/hooks/useCategories';
import { useUpdateMeditation } from '@/hooks/useMeditations';
import { cn } from '@/lib/utils';
import { Meditation, MeditationStatus } from '@/api/types/meditation';

type MeditationCardProps = {
  meditation: Meditation;
};

export default function MeditationCard({ meditation }: MeditationCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const { data: category } = useCategory(meditation.category_id);

  const updateMeditation = useUpdateMeditation();

  useEffect(() => {
    if (meditation.status === MeditationStatus.UNLOCKED) {
      setShowDetails(true);
    }
  }, [meditation.status]);

  function toggleDetails() {
    setShowDetails((prev) => !prev);
  }

  function handleMeditationComplete(meditationId: string) {
    updateMeditation.mutate({
      id: meditationId,
    });
  }

  return (
    <Card
      className={cn(
        'border gap-4 py-3 cursor-pointer',
        meditation.status === MeditationStatus.UNLOCKED && 'border-primary',
        meditation.status === MeditationStatus.LOCKED &&
          'opacity-60 pointer-events-none cursor-not-allowed',
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

        {meditation.status === MeditationStatus.COMPLETED && (
          <BadgeCheck className="text-primary" />
        )}

        {meditation.status === MeditationStatus.UNLOCKED && (
          <div className="flex items-center gap-4">
            <StatusIndicator variant="in progress" label="Next up" />
          </div>
        )}

        {meditation.status === MeditationStatus.LOCKED && (
          <BadgeMinus className="text-ring" />
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

              <div className="border-b mx-[-16]" />
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
