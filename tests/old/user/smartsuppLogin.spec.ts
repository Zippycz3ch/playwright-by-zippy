import { test, expect } from '@playwright/test';
import { sendRequestAsync } from '../../../interface/api/common/sendRequestAsync';

test("Smartsupp Keycloak login @API", async () => {
    const endpoint = 'https://openid.smartsupp.com/realms/smartsupp/login-actions/authenticate?session_code=B-pvmfgkbRydP0_ZvvjOcHYYhcT_rETgUhoVqGWdimY&execution=f350b2c3-7fda-4933-8728-8297f91c350d&client_id=smartsupp-dash&tab_id=Hfgm6OUBDUs';

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
        'Cookie': 'KEYCLOAK_LOCALE=en; AUTH_SESSION_ID_LEGACY=697ac1b0-98f9-48e7-aae3-4f7ba4b13472.keycloak-7d689bc47-2bnxk-52027; AUTH_SESSION_ID=697ac1b0-98f9-48e7-aae3-4f7ba4b13472.keycloak-7d689bc47-2bnxk-52027; KC_RESTART=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5MWJlY2FjZi1iZTg3LTQ0ZmMtOTdjZi0xNTUxZGM1NWQ4NDIifQ.eyJjaWQiOiJzbWFydHN1cHAtZGFzaCIsInB0eSI6Im9wZW5pZC1jb25uZWN0IiwicnVyaSI6Imh0dHBzOi8vYXBwLnNtYXJ0c3VwcC5jb20vYXBwL2Rhc2hib2FyZCIsImFjdCI6IkFVVEhFTlRJQ0FURSIsIm5vdGVzIjp7InNjb3BlIjoib3BlbmlkIiwiaXNzIjoiaHR0cHM6Ly9vcGVuaWQuc21hcnRzdXBwLmNvbS9yZWFsbXMvc21hcnRzdXBwIiwicmVzcG9uc2VfdHlwZSI6ImNvZGUiLCJyZWRpcmVjdF91cmkiOiJodHRwczovL2FwcC5zbWFydHN1cHAuY29tL2FwcC9kYXNoYm9hcmQiLCJzdGF0ZSI6IlEwRlVPVll0WDJobFVERk9kR1JrWkZOTlpXSkFNVGMzTlRVMU9UWTNOUT09In19.8IQ4bVyj-l0dqJrtiCvapuyi17i9Lx3c9c8ugDof9wE'
    };

    const body = 'username=kontakt%40zdenekslezak.cz&password=wt90ZbsXtg3WaPM7Omfv&credentialId=';

    const result = await sendRequestAsync('POST', endpoint, headers, body);

    expect(result.response.status).toBe(302);
    expect(result.response.headers.get('location')).toContain('app.smartsupp.com/app/dashboard');
});
