
import axiosInstance from "./axiosInstance";

// Get user addresses
export const getAddresses = async () => {
  const response = await axiosInstance.get("/ecommerce/addresses");

  return response.data;
};

// Add address
export const addAddress = async (addressData) => {
  const response = await axiosInstance.post(
    "/ecommerce/addresses",
    addressData
  );

  return response.data;
};

// Update address
export const updateAddress = async (id, addressData) => {
  const response = await axiosInstance.patch(
    `/ecommerce/addresses/${id}`,
    addressData
  );

  return response.data;
};

// Delete address
export const deleteAddress = async (id) => {
  const response = await axiosInstance.delete(
    `/ecommerce/addresses/${id}`
  );

  return response.data;
};

