import { api } from "./axios";

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const registerUser = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const res = await api.post("/auth/verify-reset-otp", { email, otp });
  return res.data;
};

export const resetPassword = async (data: { email: string; newPassword: string }) => {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
};

export const sendEmailVerification = async () => {
  const res = await api.post("/auth/send-email-verification");
  return res.data;
};

export const verifyEmail = async (otp: string) => {
  const res = await api.post("/auth/verify-email", { otp });
  return res.data;
};
