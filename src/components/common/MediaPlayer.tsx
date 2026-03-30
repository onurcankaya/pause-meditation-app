import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatSeconds } from '@/lib/timeUtils';

type MediaPlayerProps = {
  src: string;
  type: 'audio' | 'video';
  onMediaEnd: () => void;
};

export default function MediaPlayer({
  src,
  type,
  onMediaEnd,
}: MediaPlayerProps) {
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateTime = () => setCurrentTime(media.currentTime);
    const updateDuration = () => setDuration(media.duration);
    const handleEnded = () => setIsPlaying(false);

    media.addEventListener('timeupdate', updateTime);
    media.addEventListener('loadedmetadata', updateDuration);
    media.addEventListener('ended', handleEnded);

    return () => {
      media.removeEventListener('timeupdate', updateTime);
      media.removeEventListener('loadedmetadata', updateDuration);
      media.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    if (!mediaRef.current) return;

    if (isPlaying) {
      mediaRef.current.pause();
    } else {
      await mediaRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {type === 'video' ? (
        <video
          ref={mediaRef as any}
          src={src}
          onEnded={onMediaEnd}
          className="h-[300] rounded-md"
        />
      ) : (
        <audio ref={mediaRef as any} src={src} onEnded={onMediaEnd} />
      )}

      <div className="w-full flex flex-col gap-4">
        <Button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</Button>

        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => seek(value[0])}
          className="w-full"
        />

        <div>
          <p className="text-center">
            {`${formatSeconds(Math.floor(currentTime))} /
          ${formatSeconds(Math.floor(duration))}`}
          </p>
        </div>
      </div>
    </div>
  );
}
