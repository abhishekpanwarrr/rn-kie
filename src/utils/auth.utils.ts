import * as SecureStore from "expo-secure-store";

export const logout = async () => {
  await SecureStore.deleteItemAsync("token");
};

export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync("access_token", token);
};

export const getToken = async () => {
  return SecureStore.getItemAsync("access_token");
};
