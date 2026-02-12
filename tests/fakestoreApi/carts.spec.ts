import { APIResponse, test, expect } from '@playwright/test';
import { BASE_URL } from '../../config/fakestoreapp.config.js';
import { validateSchema } from '../../utilities/validation.js';
import {
  deleteRequest,
  getRequest,
  postRequestWithBody,
  updateRequest,
} from '../../utilities/apiLoggers.js';
import cartSchema from '../../schemas/fakestoreapi/cart.schema.json' assert { type: 'json' };
import cartPostSchema from '../../schemas/fakestoreapi/cartPost.schema.json' assert { type: 'json' };
import cartUpdateSchema from '../../schemas/fakestoreapi/cartUpdate.schema.json' assert { type: 'json' };
import cartDeleteSchema from '../../schemas/fakestoreapi/cartDelete.schema.json' assert { type: 'json' };
import cartPayload from '../../fixtures/dev/fakestoreapi/cart.payloads.json' assert { type: 'json' };

test.beforeEach(async ({}, testInfo) => {
  console.log(`running: ${testInfo.title}`);
});

test.describe(
  'Tests for /GET for endpoint /carts',
  { tag: ['@FakeStoreRegression', '@Sanity'] },
  () => {
    test('get a single cart', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await getRequest(
        request,
        `${BASE_URL}/carts/1`
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      validateSchema(cartSchema, responseBody);
      console.log('Schema validation passed !!');
      expect(responseBody.id).toBe(1);
    });

    test('get all carts', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await getRequest(
        request,
        `${BASE_URL}/carts`
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody[0].id).toBe(1);
      expect(responseBody[0].userId).toBe(1);
      expect(responseBody[0].date).toBeTruthy();
    });
  }
);

test.describe(
  'Tests for /POST for endpoint /carts',
  { tag: ['@FakeStoreRegression', '@Sanity'] },
  () => {
    test('add a new cart', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await postRequestWithBody(
        request,
        `${BASE_URL}/carts`,
        cartPayload.NewCart
      );
      expect(response.status()).toBe(201);
      expect(response.statusText()).toBe('Created');

      const responseBody = await response.json();
      validateSchema(cartPostSchema, responseBody);
      console.log('Schema validation passed !!');
    });
  }
);

test.describe(
  'Tests for /PUT for endpoint /carts',
  { tag: ['@FakeStoreRegression', '@Sanity'] },
  () => {
    test('update a cart', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await updateRequest(
        request,
        `${BASE_URL}/carts/1`,
        cartPayload.UpdateCart
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      validateSchema(cartUpdateSchema, responseBody);
      console.log('Schema validation passed !!');
    });
  }
);

test.describe(
  'Tests for /DELETE for endpoint /carts',
  { tag: ['@FakeStoreRegression'] },
  () => {
    test('delete a cart', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await deleteRequest(
        request,
        `${BASE_URL}/carts/1`
      );

      const responseBody = await response.json();
      validateSchema(cartDeleteSchema, responseBody);
      console.log('Schema validation passed !!');
    });
  }
);
