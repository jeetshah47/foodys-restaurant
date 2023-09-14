import axios from "axios"
import { API_URL } from "../../utils/urls"

export const getOrders = async (restaurant_id) => {
    const response = await axios.get(`${API_URL}/order?restaurant_id=${restaurant_id}`)
    return response.data
}