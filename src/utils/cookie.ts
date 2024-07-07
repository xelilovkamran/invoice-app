export function setCookie(key: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(key: string): string | null {
    const cookies = document.cookie.split(";");
    const uuid = cookies.find((cookie) => cookie.trim().substr(0, 4) === key);

    return uuid ? uuid.split("=")[1] : null;
}
