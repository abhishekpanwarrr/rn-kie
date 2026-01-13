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
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
