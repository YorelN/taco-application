export function getLogAuth() {
    try {
        if (window.sessionStorage.getItem('logAuth')) {
            return JSON.parse(window.sessionStorage.getItem('logAuth'));
        }
        return null
    } catch (err) {
        // Ignore errors
    }
}