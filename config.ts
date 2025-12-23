// Common configuration for the entire project
// Reads from .env file to determine which environment to use

export const CONFIG = {
    URLS: {
        LOCAL: "http://localhost:3333",
        PROD: "https://quickpizza.grafana.com"
    }
};

// Get the current environment from .env file (defaults to PROD)
export const getCurrentEnvironment = (): 'LOCAL' | 'PROD' => {
    return (process.env.ENV as 'LOCAL' | 'PROD') || 'PROD';
};

// Get the base URL for the current environment
export const getBaseURL = (): string => {
    const env = getCurrentEnvironment();
    return CONFIG.URLS[env];
};
