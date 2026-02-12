import dotenv from "dotenv";
dotenv.config();

export const ENV = process.env.NODE_ENV || "dev";

const BASE_URLS: Record<string, string> = {
  dev: process.env.FAKE_STORE_BASE_URL_DEV || "https://fakestoreapi.com",
  preprod: process.env.FAKE_STORE_BASE_URL_STAGING || "https://fakestoreapi.preprod.com",
  prod: process.env.FAKE_STORE_BASE_URL_PROD || "https://fakestoreapi.prod.com",
};

export const BASE_URL = BASE_URLS[ENV];
if (!BASE_URL) {
  throw new Error(`Base URL not set for environment: ${ENV}`);
}