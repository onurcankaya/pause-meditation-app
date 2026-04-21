export enum MeditationStatus {
  LOCKED = 'locked',
  UNLOCKED = 'unlocked',
  COMPLETED = 'completed',
}

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
  status: MeditationStatus;
  created_at: string;
};

export type CompletedMeditation = {
  id: string;
  user_id: string;
  meditation_id: string;
  completed_at: string;
};
