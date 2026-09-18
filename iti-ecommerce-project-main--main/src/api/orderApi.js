
import axiosInstance from "./axiosInstance";

// Get all orders
export const getOrders = async () => {
  const response = await axiosInstance.get("/ecommerce/orders");

  return response.data;
};

// Get order by ID
export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/ecommerce/orders/${id}`);

  return response.data;
};

// Create order
export const createOrder = async (orderData) => {
  const response = await axiosInstance.post(
    "/ecommerce/orders",
    orderData
  );

  return response.data;
};

