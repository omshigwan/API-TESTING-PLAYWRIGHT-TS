# Playwright TypeScript API Testing Framework

## About

This project demonstrates API testing using Playwright with TypeScript, focusing on robust, maintainable, and scalable test automation for RESTful APIs. It is structured for real-world API projects and supports multiple environments.

---

## Key Features

- **Playwright API Testing**: Utilizes Playwright's powerful APIRequestContext for HTTP request automation and validation.
- **TypeScript Support**: Ensures type safety and maintainable code.
- **Environment Management**: Uses `.env` files and config files for development, staging, and production API endpoints.
- **Schema Validation**: Integrates AJV for validating API responses against JSON schemas.
- **Tag-Based Test Execution**: Run tests by tags for focused or regression testing.
- **Reporting**: Built-in Playwright reporters and Allure Report for detailed analytics.
- **CI/CD Ready**: Easily integrates with Jenkins, GitHub Actions, or other CI/CD tools.
- **Dependency Management**: Managed with Bun for runtime and package management.

---

## Prerequisites

Install the following tools to use this project:

- **Git**: [Download Git](https://git-scm.com/downloads) or [GitHub Desktop](https://desktop.github.com/)
- **Visual Studio Code**: [Download VSCode](https://code.visualstudio.com/)
- **Bun**: [Download Bun](https://bun.sh/)
- **Playwright**: [Playwright Docs](https://playwright.dev/docs/intro/)
- **Allure Playwright**: [Allure Reporter](https://github.com/allure-framework/allure-playwright)

---

## Using This Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   bun install
   ```
3. Open the project in VSCode:
   - Click **File > Open Folder...**
4. (Optional) Install the Playwright VSCode extension for enhanced development.

---

## Environment Configuration

- Use `.env.dev`, `.env.staging`, and `.env.prod` to manage API endpoints and secrets for each environment.
- Example variables:
  ```env
  FAKE_STORE_BASE_URL=https://fakestoreapi.com
  BOOKING_APP_BASE_URL=https://restful-booker.herokuapp.com
  ```
- Scripts in `package.json` use `env-cmd` and `cross-env` to load the correct environment and set `NODE_ENV`.

---

## Test Execution and Reporting

### Running API Tests

1. Run all Fakestore API tests for Dev:
   ```bash
   bun run e2eDev:Fakestore
   ```
2. Run BookingApp API tests for Staging:
   ```bash
   bun run e2ePreprod:BookingApp
   ```
3. Run tests by tag:
   ```bash
   bun run e2eDev:Fakestore --grep=@tagName
   ```

### Generating Reports

1. **Allure Report**:
    - Generate and open the report:
       ```bash
       bun run allure-report
       ```
2. **Playwright Native Report**:
   - Open the following file in your browser:
     ```
     reports/playwright-report/index.html
     ```

---

## Project Structure

- `tests/` — API test specs for different endpoints
- `config/` — Environment and API config files
- `schemas/` — JSON schemas for response validation
- `fixtures/` — Test data payloads
- `utilities/` — Helpers for requests, logging, and schema validation

---

## External References

- [Playwright API Testing](https://playwright.dev/docs/api-testing)
- [Allure Playwright](https://github.com/allure-framework/allure-playwright)
- [AJV JSON Schema Validator](https://ajv.js.org/)
- [Playwright Test Runner](https://playwright.dev/docs/test-intro)
- [Environment Variables in Playwright](https://playwright.dev/docs/test-configuration#environment-variables)
- [Running Tests](https://playwright.dev/docs/running-tests)

## Authorization

```
SGVsbG8sIEknbSBPbSwgYSB0ZXN0IGF1dG9tYXRpb24gZW5naW5lZXIgd2hvIGxvdmVzIHR1cm5pbmcgZmxha3kgc3lzdGVtcyBpbnRvIHJlbGlhYmxlIG9uZXMuIFRoaXMgcmVwbyBob3N0cyBhIFBsYXl3cmlnaHQgKyBUeXBlU2NyaXB0IHRlc3Qgc3VpdGUgZm9yIHRoZSBCb29raW5nQXBwOiBBUEkgdGVzdHMsIGVuZC10by1lbmQgY2hlY2tzLCBuaWdodGx5IHJlZ3Jlc3Npb24gcnVucywgYW5kIEFsbHVyZSByZXBvcnRpbmcuIElmIHlvdSBmb3VuZCB0aGlzIGxpdHRsZSBub3RlLCBjb25ncmF0dWxhdGlvbnMg4oCUIHlvdSBkaXNjb3ZlcmVkIHRoZSBwcm9qZWN0J3MgZWFzdGVyIGVnZyA6KQ==
```