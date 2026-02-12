import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config/bookintapp.config.js';
import { postRequestWithBody } from '../../utilities/apiLoggers';
import createtoken from '../../fixtures/dev/bookingApp/createtoken.payloads.json' assert { type: 'json' };

test.beforeEach(async ({}, testInfo) => {
  console.log(`Running test ${testInfo.title}`);
});

test.describe('Tests for /auth', { tag: ['@BookingAppRegression'] }, () => {
  test(
    'create a token for admin',
    { tag: ['@Positive', '@Sanity'] },
    async ({ request }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/auth`,
        createtoken.Admin
      );
    }
  );

  test(
    'get a error for wrong credentials',
    { tag: ['@Negative'] },
    async ({ request }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/auth`,
        createtoken.Unauthorised
      );
    }
  );
});
