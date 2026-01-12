import { api } from "./axios";

export const placeOrder = async (addressId: string) => {
  const res = await api.post("/orders", {
    shipping_address_id: addressId,
    billing_address_id: addressId,
    payment_method: "COD",
  });

  return res.data.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/orders");
  return res.data.data;
};

export const getOrderById = async (orderId: string) => {
  const res = await api.get(`/orders/${orderId}`);
  return res.data.data;
};

export const cancelOrder = async (orderId: string) => {
  const res = await api.post(`/orders/${orderId}/cancel`);
  return res.data;
};
