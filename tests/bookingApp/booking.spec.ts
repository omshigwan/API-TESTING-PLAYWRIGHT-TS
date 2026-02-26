import { test, expect } from '@playwright/test';
import { getRequest, postRequestWithBody } from '../../utilities/apiLoggers';
import { validateSchema } from '../../utilities/validation';
import { BASE_URL } from '../../config/bookintapp.config.js';
import getBookingMock from '../../mocks/bookingApp/getbyid.mock.json' assert { type: 'json' };
import createBookingSchema from '../../schemas/bookingApp/booking.spec.json' assert { type: 'json' };
import createBookingBody from '../../fixtures/bookingApp/createbooking.payloads.json' assert { type: 'json' };
import createBookingInvalidBody from '../../fixtures/bookingApp/createbookinginvalid.payloads.json' assert { type: 'json' };

test.beforeEach(async ({}, testInfo) => {
  console.log(`Running test ${testInfo.title}`);
});

// All the tests related to GET operations of endpoint /booking
//  are grouped under this describe block with tag @BookingAppRegression
test.describe(
  'GET operation Tests for /booking',
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

    test(
      'get a booking by id',
      { tag: ['@Positive', '@Sanity'] },
      async ({ request }) => {
        const response = await getRequest(request, `${BASE_URL}/booking/3014`);
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
      }
    );

    test(
      'get booking ids by first name',
      { tag: ['@Positive'] },
      async ({ request }) => {
        const response = await getRequest(request, `${BASE_URL}/booking`, {
          params: { firstname: 'Eric' },
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(typeof responseBody[0].bookingid).toBe('number');
        expect(Object.keys(responseBody[0])).toContain('bookingid');
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

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(typeof responseBody[0].bookingid).toBe('number');
        expect(Object.keys(responseBody[0])).toContain('bookingid');
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

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(typeof responseBody[0].bookingid).toBe('number');
        expect(Object.keys(responseBody[0])).toContain('bookingid');
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

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(typeof responseBody[0].bookingid).toBe('number');
        expect(Object.keys(responseBody[0])).toContain('bookingid');
      }
    );
  }
);

// positive test for creating a booking with valid payload on endpoint /booking
test.describe(
  'create a new booking using POST operation on endpoint /booking',
  { tag: ['@BookingAppRegression', '@Positive', '@Sanity'] },
  () => {
    test('create a booking', async ({ request }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/booking`,
        createBookingBody.Om
      );
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');

      const responseBody = await response.json();
      validateSchema(createBookingSchema, responseBody);
      console.log('Schema validation passed !!');
    });
  }
);

// negative tests for creating a booking with invalid payload & field on endpoint /booking
test.describe(
  'retrieve error while creating a booking with invalid payload',
  { tag: ['@BookingAppRegression', '@Negative'] },
  () => {
    test('invalid firstname field in the payload', async ({ request }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/booking`,
        createBookingInvalidBody.invalidFieldFirstname
      );
      expect(response.status()).toBe(500);
      expect(response.statusText()).toBe('Internal Server Error');
      expect(await response.text()).toBe('Internal Server Error');
    });

    test('invalid lastname field in the payload', async ({ request }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/booking`,
        createBookingInvalidBody.invalidFieldLastname
      );
      expect(response.status()).toBe(500);
      expect(response.statusText()).toBe('Internal Server Error');
      expect(await response.text()).toBe('Internal Server Error');
    });

    test('invalid depositpaid field in the payload', async ({ request }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/booking`,
        createBookingInvalidBody.invalidFieldDepositpaid
      );
      expect(response.status()).toBe(500);
      expect(response.statusText()).toBe('Internal Server Error');
      expect(await response.text()).toBe('Internal Server Error');
    });

    test('invalid totalprice field in the payload', async ({ request }) => {
      const response = await postRequestWithBody(
        request,
        `${BASE_URL}/booking`,
        createBookingInvalidBody.invalidFieldTotalprice
      );
      expect(response.status()).toBe(500);
      expect(response.statusText()).toBe('Internal Server Error');
      expect(await response.text()).toBe('Internal Server Error');
    });
  }
);
