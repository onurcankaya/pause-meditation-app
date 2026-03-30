export type Meditation = {
  id: string;
  title: string;
  description: string | null;
  duration_seconds: number;
  audio_url: string;
  category_id: string;
  level: number;
  is_completed: boolean;
  created_at: string;
};
