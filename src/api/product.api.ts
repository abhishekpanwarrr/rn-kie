import { api } from "./axios";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data.data;
};

export const getFeaturedProducts = async () => {
  const res = await api.get("/products?featured=true");
  return res.data.data;
};

export const getProductBySlug = async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data.data;
};
