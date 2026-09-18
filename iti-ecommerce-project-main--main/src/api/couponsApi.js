import axiosInstance from "./axiosInstance";

// Get all coupons
export const getCoupons = async () => {
  const response = await axiosInstance.get("/ecommerce/coupons");

  return response.data;
};

// Get coupon by ID
export const getCouponById = async (id) => {
  const response = await axiosInstance.get(`/ecommerce/coupons/${id}`);

  return response.data;
};

