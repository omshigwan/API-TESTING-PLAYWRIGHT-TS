import { APIRequestContext, APIResponse } from '@playwright/test';

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
