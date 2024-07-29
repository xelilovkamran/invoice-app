export function setItem(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function getItem(key: string): string | null {
  return localStorage.getItem(key);
}
