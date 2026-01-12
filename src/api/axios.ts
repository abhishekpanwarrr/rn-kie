// import { getToken } from "@/store/auth.store";
// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://192.168.29.110:3000/api/v1",
// });

// api.interceptors.request.use(async (config) => {
//   const token = await SecureStore.getItemAsync("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: "http://192.168.29.110:3000/api/v1",
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
