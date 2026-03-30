export function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
}
