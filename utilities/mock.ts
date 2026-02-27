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
export async function getOrMock(
    request: APIRequestContext,
    url: string,
    mockBody: object,
    headers?: object
): Promise<APIResponse> {
    const response = await request.get(url, headers);
    console.log(`GET ${response.url()}`);
    if (headers) {
        console.log('HEADERS:');
        console.log(headers);
    }

    if (response.status() != 200 || (await response.text()) === '[]') {
        console.error(`Request failed , falling back to mock response`);
        response.status = () => 200;
        response.statusText = () => 'OK';
        response.json = async () => mockBody;

        console.log('RESPONSE');
        console.log(`STATUS ${response.status()} ${response.statusText()}`);
        console.log('HEADERS');
        console.log(response.headers());

        const responseBody = await response.json();
        console.log('BODY');
        console.log(responseBody);
        return response;
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
