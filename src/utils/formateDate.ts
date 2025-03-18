export function formatDate(date: Date): string {
  const padZero = (num: number) => (num < 10 ? `0${num}` : num);

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}
