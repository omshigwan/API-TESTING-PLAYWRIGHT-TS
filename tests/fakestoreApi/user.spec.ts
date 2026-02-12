import { test, APIResponse, expect } from '@playwright/test';
import { BASE_URL } from '../../config/fakestoreapp.config.js';
import { validateSchema } from '../../utilities/validation.js';
import {
  getRequest,
  postRequestWithBody,
  updateRequest,
  deleteRequest,
} from '../../utilities/apiLoggers';
import userSchema from '../../schemas/fakestoreapi/user.schema.json' assert { type: 'json' };
import updateUserSchema from '../../schemas/fakestoreapi/userUpdate.schema.json' assert { type: 'json' };
import deleteUserSchema from '../../schemas/fakestoreapi/userDelete.schema.json' assert { type: 'json' };
import userPayloads from '../../fixtures/dev/fakestoreapi/user.payloads.json' assert { type: 'json' };

test.beforeEach(async ({}, testInfo) => {
  console.log(`running: ${testInfo.title}`);
});

test.describe(
  'Tests for /GET for endpoint /users',
  { tag: ['@FakeStoreRegression', '@Sanity'] },
  () => {
    test('get a single user', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await getRequest(
        request,
        `${BASE_URL}/users/1`
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      validateSchema(userSchema, responseBody);
      console.log('Schema validation passed !!');
      expect(responseBody.id).toBe(1);
      expect(responseBody.email).toBe('john@gmail.com');
      expect(responseBody.username).toBe('johnd');
      expect(responseBody.password).toBe('m38rmF$');
      expect(responseBody.name.firstname).toBe('john');
      expect(responseBody.name.lastname).toBe('doe');
    });

    test('get all users', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await getRequest(
        request,
        `${BASE_URL}/users`
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody[0].id).toBe(1);
      expect(responseBody[0].email).toBe('john@gmail.com');
      expect(responseBody[0].username).toBe('johnd');
      expect(responseBody[0].password).toBe('m38rmF$');
      expect(responseBody[0].name.firstname).toBe('john');
      expect(responseBody[0].name.lastname).toBe('doe');
    });
  }
);

test.describe(
  'Tests for /POST for endpoint /users',
  { tag: ['@FakeStoreRegression', '@Sanity'] },
  () => {
    test('add a new user', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await postRequestWithBody(
        request,
        `${BASE_URL}/users`,
        userPayloads.newUser
      );
      expect(response.status()).toBe(201);
      expect(response.statusText()).toBe('Created');

      const responseBody = await response.json();
      expect(typeof responseBody.id).toBe('number');
      expect(responseBody.id).toBeTruthy();
    });
  }
);

test.describe(
  'Tests for /PUT for endpoint /users',
  { tag: ['@FakeStoreRegression', '@Sanity'] },
  () => {
    test('update a user', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await updateRequest(
        request,
        `${BASE_URL}/users/1`,
        userPayloads.updateUser
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody: JSON = await response.json();
      validateSchema(updateUserSchema, responseBody);
      console.log('Schema validation passed !!');
    });
  }
);

test.describe(
  'Tests for /DELETE for endpoint /users',
  { tag: ['@FakeStoreRegression'] },
  () => {
    test('delete a user', { tag: ['@Positive'] }, async ({ request }) => {
      const response: APIResponse = await deleteRequest(
        request,
        `${BASE_URL}/users/1`
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody: JSON = await response.json();
      validateSchema(deleteUserSchema, responseBody);
      console.log('Schema validation passed !!');
    });
  }
);
