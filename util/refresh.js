export const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// Refresh rate in milliseconds
export const REFRESH_RATE = 5000;