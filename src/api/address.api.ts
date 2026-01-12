import { api } from "./axios";

export const getAddresses = async () => {
  const res = await api.get("/addresses");
  return res.data.data;
};

export const createAddress = async (payload: {
  address_type?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  country: string;
  postal_code: string;
}) => {
  const res = await api.post("/addresses", payload);
  return res.data.data;
};
