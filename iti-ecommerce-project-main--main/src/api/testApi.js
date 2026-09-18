
import axiosInstance from "./axiosInstance";

const testApi = async () => {
  try {
    const response = await axiosInstance.get("/ecommerce/products");

    console.log("API Response:", response.data);
  } catch (error) {
    console.error("API Error:", error);
  }
};

testApi();

