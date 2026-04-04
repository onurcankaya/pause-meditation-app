export function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;

  if (seconds === 0) return '0:00';

  return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
}
