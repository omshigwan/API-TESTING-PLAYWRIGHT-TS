import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config/bookintapp.config.js';
import { getRequest } from '../../utilities/apiLoggers';
import { postRequestWithBody } from '../../utilities/apiLoggers';
import createbooking from '../../fixtures/dev/bookingApp/createbooking.payloads.json' assert { type: 'json' };
import createBookingSchema from '../../schemas/bookingApp/booking.spec.json' assert { type: 'json' };
import { validateSchema } from '../../utilities/validation';

test.beforeEach(async ({}, testInfo) => {
  console.log(`Running test ${testInfo.title}`);
});

test.describe(
  '/GET operation Tests for /booking',
  { tag: ['@BookingAppRegression'] },
  () => {
    test(
      'get all booking ids',
      { tag: ['@Positive', '@Sanity'] },
      async ({ request }) => {
        const response = await getRequest(request, `${BASE_URL}/booking`);
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(typeof responseBody[0].bookingid).toBe('number');
        expect(Object.keys(responseBody[0])).toContain('bookingid');
      }
    );

    test('get a booking by id', { tag: ['@Positive','@Sanity'] }, async ({ request }) => {
      const response = await getRequest(request, `${BASE_URL}/booking/309`);
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      expect(typeof responseBody.firstname).toBe('string');
      expect(responseBody.firstname).toBeTruthy();
      expect(typeof responseBody.lastname).toBe('string');
      expect(responseBody.lastname).toBeTruthy();
      expect(typeof responseBody.totalprice).toBe('number');
      expect(responseBody.totalprice).toBeTruthy();
      expect(typeof responseBody.depositpaid).toBe('boolean');
      expect(responseBody.depositpaid).toBeTruthy();
      expect(responseBody.bookingdates.checkin).toBeTruthy();
      expect(responseBody.bookingdates.checkout).toBeTruthy();
    });

    test(
      'get booking ids by first name',
      { tag: ['@Positive'] },
      async ({ request }) => {
        const response = await getRequest(request, `${BASE_URL}/booking`, {
          params: { firstname: 'Eric' },
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');

        // const responseBody = await response.json();
      }
    );

    test(
      'get booking ids by last name',
      { tag: ['@Positive'] },
      async ({ request }) => {
        const response = await getRequest(request, `${BASE_URL}/booking`, {
          params: { lastname: 'Smith' },
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');

        // const responseBody = await response.json();
      }
    );

    test(
      'get booking ids by checkin date',
      { tag: ['@Positive'] },
      async ({ request }) => {
        const response = await getRequest(request, `${BASE_URL}/booking`, {
          params: { checkin: '2017-05-10' },
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');

        // const responseBody = await response.json();
      }
    );

    test(
      'get booking ids by checkout date',
      { tag: ['@Positive'] },
      async ({ request }) => {
        const response = await getRequest(request, `${BASE_URL}/booking`, {
          params: { checkout: '2021-06-03' },
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');

        // const responseBody = await response.json();
        // expect(Array.isArray(responseBody)).toBe(true);
        // expect(typeof responseBody[0].bookingid).toBe("number");
        // expect(Object.keys(responseBody[0])).toContain("bookingid");
      }
    );
  }
);

test.describe(
  '/POST operation Tests for /booking',
  { tag: ['@BookingAppRegression'] },
  () => {
    test(
      'create a booking',
      { tag: ['@Positive', '@Sanity'] },
      async ({ request }) => {
        const response = await postRequestWithBody(
          request,
          `${BASE_URL}/booking`,
          createbooking.Om
        );
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');

        const responseBody = await response.json();
        validateSchema(createBookingSchema, responseBody);
        console.log('Schema validation passed !!');
      }
    );
  }
);
