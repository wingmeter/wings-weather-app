export function getDate(dt: number, timezone: number) {
  const utc_seconds = parseInt(String(dt), 10) + parseInt(String(timezone), 10);
  const utc_milliseconds = utc_seconds * 1000;
  const local_date = new Date(utc_milliseconds || 0)
    .toISOString()
    .substr(11, 5);
  return local_date;
}

export enum TempUnit {
  CELCIUS = "celcius",
  FAHRENHEIT = "fahrenheit",
}

export function celciusToFahrenheit(c: number) {
  return Math.floor(c * (9 / 5) + 32);
}

export function fahrenheitToCelcius(f: number) {
  return Math.round(((f - 32) * 5) / 9);
}
