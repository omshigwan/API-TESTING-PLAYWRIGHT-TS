import { APIResponse, test, expect } from '@playwright/test';
import { BASE_URL } from '../../config/fakestoreapp.config.js';
import { validateSchema } from '../../utilities/validation.js';
import {
  deleteRequest,
  getRequest,
  postRequestWithBody,
  updateRequest,
} from '../../utilities/apiLoggers.js';
import productSchema from '../../schemas/fakestoreapi/product.schema.json' assert { type: 'json' };
import productPostSchema from '../../schemas/fakestoreapi/productPost.schema.json' assert { type: 'json' };
import productUpdateSchema from '../../schemas/fakestoreapi/productUpdate.schema.json' assert { type: 'json' };
import productDeleteSchema from '../../schemas/fakestoreapi/productDelete.schema.json' assert { type: 'json' };
import productPayloads from '../../fixtures/dev/fakestoreapi/product.payloads.json' assert { type: 'json' };

test.beforeEach(async ({}, testInfo) => {
  console.log(`running: ${testInfo.title}`);
});

test.describe(
  'Tests for /GET for endpoint /products',
  { tag: ['@FakeStoreRegression', '@Sanity'] },
  () => {
    test('get product', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await getRequest(
        request,
        `${BASE_URL}/products/1`
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      validateSchema(productSchema, responseBody);
      console.log('Schema validation passed !!');
      expect(responseBody.id).toBe(1);
      expect(responseBody.price).toBe(109.95);
      expect(responseBody.category).toBe("men's clothing");
    });

    test('get all products', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await getRequest(
        request,
        `${BASE_URL}/products`
      );
      const responseBody = await response.json();
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody[0].id).toBe(1);
      expect(responseBody[0].price).toBe(109.95);
      expect(responseBody[0].category).toBe("men's clothing");
    });
  }
);

test.describe(
  'Tests for /POST for endpoint /products',
  { tag: ['@FakeStoreRegression', '@Sanity'] },
  () => {
    test('add a new product', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await postRequestWithBody(
        request,
        `${BASE_URL}/products`,
        productPayloads.Dettol.Original
      );
      expect(response.status()).toBe(201);
      expect(response.statusText()).toBe('Created');

      const responseBody = await response.json();
      validateSchema(productPostSchema, responseBody);
      console.log('Schema validation passed !!');
      expect(typeof responseBody.id).toBe('number');
      expect(responseBody.title).toBe('Original Dettol');
      expect(responseBody.price).toBe(9.99);
    });
  }
);

test.describe(
  'Tests for /PUT for endpoint /products',
  { tag: ['@FakeStoreRegression', '@Sanity'] },
  () => {
    test('udpate a product', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await updateRequest(
        request,
        `${BASE_URL}/products/1`,
        productPayloads.Medimix.Herbal
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      validateSchema(productUpdateSchema, responseBody);
      console.log('Schema validation passed !!');
      expect(typeof responseBody.id).toBe('number');
      expect(responseBody.title).toBe('Medimix Green');
      expect(responseBody.price).toBe(9.99);
    });
  }
);

test.describe(
  'Tests for /DELETE for endpoint /products',
  { tag: ['@FakeStoreRegression'] },
  () => {
    test('delete a product', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await deleteRequest(
        request,
        `${BASE_URL}/products/1`
      );

      const responseBody = await response.json();
      validateSchema(productDeleteSchema, responseBody);
      console.log('Schema validation passed !!');
    });
  }
);
