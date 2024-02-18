export async function copyTextToClipboard(text: string, retries = 3) {
    try {
        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(text);
        } else {
            document.execCommand('copy', true, text);
        }
        console.log('Text copied to clipboard successfully.');
    } catch (error) {
        console.error('Error copying text to clipboard:', error);
        if (retries > 0) {
            await copyTextToClipboard(text, retries - 1);
        }
    }
}