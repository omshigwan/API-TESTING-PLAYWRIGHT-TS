import { APIResponse, test, expect } from '@playwright/test';
import { BASE_URL } from '../../config/fakestoreapp.config.js';
import { postRequestWithBody } from '../../utilities/apiLoggers';
import loginPayloads from '../../fixtures/dev/fakestoreapi/login.payloads.json' assert { type: 'json' };

test.beforeEach(async ({}, testInfo) => {
  console.log(`running: ${testInfo.title}`);
});

test.describe(
  'Tests for /POST for endpoint /products',
  { tag: ['@FakeStoreRegression', '@Sanity'] },
  () => {
    test('get auth token', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await postRequestWithBody(
        request,
        `${BASE_URL}/auth/login`,
        loginPayloads.David
      );
      expect(response.status()).toBe(201);
      expect(response.statusText()).toBe('Created');

      const responseBody = await response.json();
      expect(responseBody.token).toBeTruthy();
      expect(typeof responseBody.token).toBe('string');
    });
  }
);
