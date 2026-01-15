import { api } from "./axios";

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};

export const updateMe = async (data: any) => {
  const res = await api.put("/auth/me", data);
  return res.data.data;
};

export const changePassword = async (data: { current_password: string; new_password: string }) => {
  const res = await api.put("/auth/change-password", data);
  return res.data;
};
