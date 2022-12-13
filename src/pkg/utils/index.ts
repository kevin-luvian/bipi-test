export function Delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
