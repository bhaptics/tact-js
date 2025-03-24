export function linearScale(value: number, max: number, min: number) {
  return (value - min) / (max - min);
}
