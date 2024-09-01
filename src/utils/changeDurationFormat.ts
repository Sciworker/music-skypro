export const changeDurationFormat = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60); // Round seconds to the nearest integer
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};