export enum MeditationCategory {
  FOUNDATION = 'Foundation',
  PRO = 'Pro',
  SLEEP = 'Sleep',
}

export type Category = {
  id: string;
  name: MeditationCategory;
  description?: string | null;
  created_at: string;
};
