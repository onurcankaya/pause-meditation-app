'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompletedMeditation } from '@/api/types/meditation';
import { cn } from '@/lib/utils';

type ActivityCalendarProps = {
  meditations: CompletedMeditation[];
};

export default function ActivityCalendar({
  meditations,
}: ActivityCalendarProps) {
  const completedMeditationDates = useMemo(() => {
    return new Set(
      meditations.map((m) => format(new Date(m.completed_at), 'yyyy-MM-dd')),
    );
  }, [meditations]);

  return (
    <Card
      className="w-full min-h-[280px] py-4 sm:py-5"
      data-slot="activity-calendar-card"
    >
      <CardHeader className="px-4 sm:px-6 border-b">
        <CardTitle className="text-center">Meditation Calendar</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col items-center justify-center px-3.5 sm:px-4">
        <Calendar
          mode="single"
          className="w-full"
          data-slot="activity-calendar"
          components={{
            DayButton: ({ day, ...props }) => {
              const dateStr = format(day.date, 'yyyy-MM-dd');
              const hasMeditation = completedMeditationDates.has(dateStr);

              return (
                <button
                  {...props}
                  className={cn(
                    props.className,
                    'w-[40px] h-[40px] rounded-lg',
                    hasMeditation && 'bg-primary/90',
                  )}
                >
                  <span
                    className={cn(hasMeditation && 'text-black font-semibold')}
                  >
                    {day.date.getDate()}
                  </span>
                </button>
              );
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
