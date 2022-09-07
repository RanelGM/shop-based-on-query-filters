import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://accelerator-guitar-shop-api-v1.glitch.me/";
const REQUEST_TIMEOUT = 15000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
