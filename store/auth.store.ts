import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

type AuthState = {
  user: any | null;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: async (user, token) => {
    await SecureStore.setItemAsync("token", token);
    set({ user, token });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({ user: null, token: null });
  },
}));

export const getToken = async () => {
  return SecureStore.getItemAsync("token");
};
