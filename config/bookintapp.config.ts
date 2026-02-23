import dotenv from "dotenv";
dotenv.config();

export const ENV = process.env.NODE_ENV || "dev";

const BASE_URLS: Record<string, string> = {
  dev: process.env.BOOKING_APP_BASE_URL_DEV || "https://restful-booker.herokuapp.com",
  staging: process.env.BOOKING_APP_BASE_URL_STAGING || "https://restful-booker.herokuapp.staging.com",
  prod: process.env.BOOKING_APP_BASE_URL_PROD || "https://restful-booker.herokuapp.prod.com",
};

export const BASE_URL = BASE_URLS[ENV];
if (!BASE_URL) {
  throw new Error(`Base URL not set for environment: ${ENV}`);
}
