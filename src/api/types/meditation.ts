export type Meditation = {
  id: string;
  title: string;
  description: string | null;
  duration_seconds: number;
  audio_url: string;
  category_id: string;
  level: number;
  created_at: string;
};
