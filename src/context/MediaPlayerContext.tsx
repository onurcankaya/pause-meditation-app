import { createContext, useContext, useState } from 'react';
import { Meditation } from '@/api/types/meditation';

type PlayingMeditationId = Meditation['id'] | null;

const MediaPlayerContext = createContext<
  | {
      playingMeditationId: PlayingMeditationId;
      setPlayingMeditationId: (id: PlayingMeditationId) => void;
    }
  | undefined
>(undefined);

export function MediaPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [playingMeditationId, setPlayingMeditationId] =
    useState<PlayingMeditationId>(null);

  return (
    <MediaPlayerContext.Provider
      value={{ playingMeditationId, setPlayingMeditationId }}
    >
      {children}
    </MediaPlayerContext.Provider>
  );
}

export function useMediaPlayer() {
  const context = useContext(MediaPlayerContext);

  if (!context) {
    throw new Error('useMediaPlayer must be used within MediaPlayerProvider');
  }

  return context;
}
