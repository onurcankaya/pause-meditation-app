'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompletedMeditation } from '@/api/types/meditation';
import { cn } from '@/lib/utils';

type ActivityCalendarProps = {
  completedMeditations: CompletedMeditation[];
};

export default function ActivityCalendar({
  completedMeditations,
}: ActivityCalendarProps) {
  const completedMeditationDates = useMemo(() => {
    return new Set(
      completedMeditations.map((m) =>
        format(new Date(m.completed_at), 'yyyy-MM-dd'),
      ),
    );
  }, [completedMeditations]);

  return (
    <Card
      className="w-full border min-h-[280px] py-4 sm:py-5"
      data-slot="activity-calendar-card"
    >
      <CardHeader className="px-4 sm:px-6 border-b">
        <CardTitle className="flex items-center justify-center gap-2">
          <CalendarDays className="size-4" />
          <p className="text-sm">Meditation Calendar</p>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col items-center justify-center px-2 sm:px-4">
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
