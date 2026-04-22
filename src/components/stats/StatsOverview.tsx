'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompletedMeditation } from '@/api/types/meditation';
import { formatSecondsToMinutes } from '@/lib/timeUtils';
import { cn } from '@/lib/utils';

type StatsOverviewProps = {
  completedMeditations: CompletedMeditation[];
};

export default function StatsOverview({
  completedMeditations,
}: StatsOverviewProps) {
  const statsOverview = useMemo(() => {
    const currentStreak = completedMeditations.length;
    const totalSessions = completedMeditations.length;
    const totalSeconds = completedMeditations.reduce((acc, meditation) => {
      return acc + meditation.duration_seconds;
    }, 0);

    return {
      currentStreak,
      totalSessions,
      totalMinutes: formatSecondsToMinutes(totalSeconds),
    };
  }, [completedMeditations]);

  return (
    <div className="w-full grid grid-cols-3 gap-3">
      <Card className="border py-3">
        <CardContent>
          <h3 className="text-base text-primary text-center font-bold mb-0.5">
            {statsOverview.currentStreak}
          </h3>
          <p className="text-xs text-muted-foreground text-center">
            day streak
          </p>
        </CardContent>
      </Card>
      <Card className="border py-3">
        <CardContent>
          <h3 className="text-base text-primary text-center font-bold mb-0.5">
            {statsOverview.totalSessions}
          </h3>
          <p className="text-xs text-muted-foreground text-center">sessions</p>
        </CardContent>
      </Card>
      <Card className="border py-3">
        <CardContent>
          <h3 className="text-base text-primary text-center font-bold mb-0.5">
            {statsOverview.totalMinutes}
          </h3>
          <p className="text-xs text-muted-foreground text-center">total</p>
        </CardContent>
      </Card>
    </div>
  );
}
