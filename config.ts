// Common configuration for Smartsupp API integration

export const CONFIG = {
    DOMAIN: process.env.SMARTSUPP_DOMAIN || "smartsupp.com",
    AUTH_SUBDOMAIN: process.env.SMARTSUPP_AUTH_SUBDOMAIN || "openid",
    APP_SUBDOMAIN: process.env.SMARTSUPP_APP_SUBDOMAIN || "app"
};

export const getAppBaseURL = (): string => `https://${CONFIG.APP_SUBDOMAIN}.${CONFIG.DOMAIN}`;
