import { api } from "./axios";

export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data.data;
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  return api.put(`/cart/${cartItemId}`, { quantity });
};

export const removeCartItem = async (cartItemId: string) => {
  return api.delete(`/cart/${cartItemId}`);
};
