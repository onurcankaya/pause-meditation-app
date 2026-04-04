'use client';

import { useState } from 'react';
import { Badge, BadgeCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

  const { data: category } = useCategory(meditation.category_id);

  const updateMeditation = useUpdateMeditation();

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
        'border border-gray gap-4',
        meditation.is_completed && 'border border-primary',
      )}
    >
      <CardHeader
        className="flex flex-row justify-between items-center"
        onClick={toggleDetails}
      >
        {meditation.is_completed ? (
          <BadgeCheck className="text-primary" />
        ) : (
          <Badge className="text-ring" />
        )}

        <div className="flex flex-col gap-1">
          <CardTitle className="text-sm sm:text-base">
            {meditation.title}
          </CardTitle>
        </div>

        <Button variant="ghost">
          {showDetails ? (
            <ChevronUp
              className={cn(
                'text-ring',
                meditation.is_completed && 'text-primary',
              )}
            />
          ) : (
            <ChevronDown
              className={cn(
                'text-ring',
                meditation.is_completed && 'text-primary',
              )}
            />
          )}
        </Button>
      </CardHeader>

      {showDetails && (
        <CardContent className="space-y-4">
          {meditation?.video_url && (
            <MediaPlayer
              src={meditation.video_url}
              type="video"
              title={meditation.title}
              album={category?.name}
            />
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
