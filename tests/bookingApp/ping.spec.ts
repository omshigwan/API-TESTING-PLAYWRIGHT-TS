import { expect, test } from '@playwright/test';
import { BASE_URL } from '../../config/bookintapp.config.js';
import { getRequest } from '../../utilities/apiLoggers';

test.beforeEach(async ({}, testInfo) => {
  console.log(`Running test ${testInfo.title}`);
});

test.describe(
  'Test for /ping',
  { tag: ['@BookingAppRegression', '@Sanity'] },
  () => {
    test('health check of the server', async ({ request }) => {
      const response = await getRequest(request, `${BASE_URL}/ping`);
      expect(response.status()).toBe(201);
      expect(response.statusText()).toBe('Created');
      expect(await response.text()).toBe('Created');
    });
  }
);
