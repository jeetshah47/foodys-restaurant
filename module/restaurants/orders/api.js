import axios from "axios";
import { API_URL } from "../../utils/urls";

export const getOrders = async (restaurant_id) => {
  const response = await axios.get(
    `${API_URL}/orders?restaurant_id=${restaurant_id}`
  );
  return response.data;
};

export const updateOrderStatus = async (order_id, status) => {
  const response = await axios.put(`${API_URL}/order/${order_id}`, {
    status: status,
  });
  return response.data;
};
