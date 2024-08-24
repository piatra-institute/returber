export function formatIsoString(
    isoString: string,
): string {
    const date = new Date(isoString);

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit'
    };

    const formattedTime = date.toLocaleString('en-US', timeOptions);
    const formattedDate = date.toLocaleString('en-US', dateOptions);

    return `${formattedTime}, ${formattedDate}`;
}
