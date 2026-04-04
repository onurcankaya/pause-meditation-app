export type Meditation = {
  id: string;
  title: string;
  description: string | null;
  duration_seconds: number;
  audio_url: string;
  category_id: string;
  level: number;
  video_url: string | null;
  video_duration_seconds: string | null;
  day: number;
  is_completed: boolean;
  created_at: string;
};
