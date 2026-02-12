import dotenv from "dotenv";
dotenv.config();

export const ENV = process.env.NODE_ENV || "dev";

const BASE_URLS: Record<string, string> = {
  dev: process.env.BOOKING_APP_BASE_URL_DEV || "https://restful-booker.herokuapp.com",
  preprod: process.env.BOOKING_APP_BASE_URL_STAGING || "https://staging.restful-booker.herokuapp.com",
  prod: process.env.BOOKING_APP_BASE_URL_PROD || "https://prod.restful-booker.herokuapp.com",
};

export const BASE_URL = BASE_URLS[ENV];
if (!BASE_URL) {
  throw new Error(`Base URL not set for environment: ${ENV}`);
}
