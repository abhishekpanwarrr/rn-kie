import * as SecureStore from "expo-secure-store";

export const logout = async () => {
  await SecureStore.deleteItemAsync("token");
};
