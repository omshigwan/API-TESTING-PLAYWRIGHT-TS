import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config/bookintapp.config.js';
import { postRequestWithBody } from '../../utilities/apiLoggers';
import createtoken from '../../fixtures/bookingApp/createtoken.payloads.json' assert { type: 'json' };

test.beforeEach(async ({}, testInfo) => {
  console.log(`Running test ${testInfo.title}`);
});

// Positive test for creating a token with valid credentials
test.describe(
  'Tests for creating a token on endpoint /auth',
  { tag: ['@BookingAppRegression', '@Positive', '@Sanity'] },
  () => {
    test('create a token for admin', async ({ request }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/auth`,
        createtoken.Admin
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      expect(responseBody.token).toBeTruthy();
      expect(typeof responseBody.token).toBe('string');
    });
  }
);

// Negative tests for creating a token with invalid credentials & fields
test.describe(
  'Negative tests for /auth',
  { tag: ['@BookingAppRegression', '@Negative'] },
  () => {
    test('get a error for creating token with invalid username', async ({
      request,
    }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/auth`,
        createtoken.InvalidUsername
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('reason');
      expect(responseBody.reason).toBe('Bad credentials');
    });

    test('get a error for creating token with invalid password', async ({
      request,
    }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/auth`,
        createtoken.InvalidPassword
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('reason');
      expect(responseBody.reason).toBe('Bad credentials');
    });

    test('get a error for creating token with invalid username field', async ({
      request,
    }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/auth`,
        createtoken.InvalidUsernameField
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('reason');
      expect(responseBody.reason).toBe('Bad credentials');
    });

    test('get a error for creating token with invalid password field', async ({
      request,
    }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/auth`,
        createtoken.InvalidPasswordField
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('reason');
      expect(responseBody.reason).toBe('Bad credentials');
    });
  }
);
