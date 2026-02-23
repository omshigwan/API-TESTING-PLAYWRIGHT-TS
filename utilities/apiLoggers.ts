import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Sends a GET request using Playwright's `APIRequestContext` and logs
 * request and response details including URL, headers, status, and body.
 *
 * @param request - Playwright `APIRequestContext` used to perform the request.
 * @param url - The URL to send the GET request to.
 * @param headers - Optional request headers forwarded to `request.get`.
 * @returns A Promise resolving to the Playwright `APIResponse`.
 */
export async function getRequest(
  request: APIRequestContext,
  url: string,
  headers?: object
): Promise<APIResponse> {
  const response = await request.get(url, headers);
  console.log(`GET ${response.url()}`);
  if (headers) {
    console.log('HEADERS:');
    console.log(headers);
  }

  console.log('RESPONSE');
  console.log(`STATUS ${response.status()} ${response.statusText()}`);
  console.log('HEADERS');
  console.log(response.headers());

  const contentType = response.headers()['content-type'];
  if (contentType && contentType.includes('application/json')) {
    const responseBody = await response.json();
    console.log('BODY');
    console.log(responseBody);
  } else {
    const responseBody = await response.text();
    console.log('BODY');
    console.log(responseBody);
  }

  return response;
}

/**
 * Sends a POST request with an optional body using Playwright's
 * `APIRequestContext` and logs request and response details.
 *
 * @param request - Playwright `APIRequestContext` used to perform the request.
 * @param url - The URL to send the POST request to.
 * @param body - Optional request body (typically an object) sent as request data.
 * @returns A Promise resolving to the Playwright `APIResponse`.
 */
export async function postRequestWithBody(
  request: APIRequestContext,
  url: string,
  body?: object
): Promise<APIResponse> {
  const response = await request.post(url, { data: body });
  console.log(`POST ${response.url()}`);
  if (body) {
    console.log('REQUEST BODY');
    console.log(body);
  }

  console.log('RESPONSE');
  console.log(`STATUS ${response.status()} ${response.statusText()}`);
  console.log('HEADERS');
  console.log(response.headers());

  const contentType = response.headers()['content-type'];
  if (contentType && contentType.includes('application/json')) {
    const responseBody = await response.json();
    console.log('BODY');
    console.log(responseBody);
  } else {
    const responseBody = await response.text();
    console.log('BODY');
    console.log(responseBody);
  }

  return response;
}

/**
 * Sends a PUT request with an optional body using Playwright's
 * `APIRequestContext` and logs request and response details.
 *
 * @param request - Playwright `APIRequestContext` used to perform the request.
 * @param url - The URL to send the PUT request to.
 * @param body - Optional request body (typically an object) sent as request data.
 * @returns A Promise resolving to the Playwright `APIResponse`.
 */
export async function updateRequest(
  request: APIRequestContext,
  url: string,
  body?: object
): Promise<APIResponse> {
  const response = await request.put(url, { data: body });
  console.log(`PUT ${response.url()}`);
  if (body) {
    console.log('REQUEST BODY');
    console.log(body);
  }

  console.log('RESPONSE');
  console.log(`STATUS ${response.status()} ${response.statusText()}`);
  console.log('HEADERS');
  console.log(response.headers());

  const contentType = response.headers()['content-type'];
  if (contentType && contentType.includes('application/json')) {
    const responseBody = await response.json();
    console.log('BODY');
    console.log(responseBody);
  } else {
    const responseBody = await response.text();
    console.log('BODY');
    console.log(responseBody);
  }

  return response;
}

/**
 * Sends a DELETE request using Playwright's `APIRequestContext` and logs
 * request and response details including URL, headers, status, and body.
 *
 * @param request - Playwright `APIRequestContext` used to perform the request.
 * @param url - The URL to send the DELETE request to.
 * @param headers - Optional request headers forwarded to `request.delete`.
 * @returns A Promise resolving to the Playwright `APIResponse`.
 */
export async function deleteRequest(
  request: APIRequestContext,
  url: string,
  headers?: object
): Promise<APIResponse> {
  const response = await request.delete(url, headers);
  console.log(`DELETE ${response.url()}`);
  if (headers) {
    console.log('HEADERS:');
    console.log(headers);
  }

  console.log('RESPONSE');
  console.log(`STATUS ${response.status()} ${response.statusText()}`);
  console.log('HEADERS');
  console.log(response.headers());

  const contentType = response.headers()['content-type'];
  if (contentType && contentType.includes('application/json')) {
    const responseBody = await response.json();
    console.log('BODY');
    console.log(responseBody);
  } else {
    const responseBody = await response.text();
    console.log('BODY');
    console.log(responseBody);
  }

  return response;
}
