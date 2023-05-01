export function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export function generateRandomNumber(min: number = 1, max: number = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
