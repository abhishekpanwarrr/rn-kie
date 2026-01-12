import { api } from "./axios";

export const getWishlist = async () => {
  const res = await api.get("/wishlist");
  return res.data.data;
};

export const addToWishlist = async (productId: string) => {
  return api.post(`/wishlist/${productId}`);
};

export const removeFromWishlist = async (productId: string) => {
  return api.delete(`/wishlist/${productId}`);
};
