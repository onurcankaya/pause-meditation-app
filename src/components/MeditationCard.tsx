'use client';

import { useState, useMemo } from 'react';
import { Badge, BadgeCheck, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
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

  const mediaType = useMemo(() => {
    if (meditation.audio_url.includes('mp4')) return 'video';
    else return 'audio';
  }, [meditation]);

  return (
    <Card
      className={cn(
        'border border-gray gap-6',
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
          <CardTitle className="text-sm sm:text-md">
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
        <CardContent>
          <MediaPlayer
            src={meditation.audio_url}
            type={mediaType}
            title={meditation.title}
            album={category?.name}
            onMediaEnd={() => handleMeditationComplete(meditation.id)}
          />
        </CardContent>
      )}
    </Card>
  );
}
