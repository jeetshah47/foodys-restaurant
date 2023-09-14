import axios from "axios";
import { API_URL } from "../../utils/urls";



export const AddFoodItem = async (data, restaurant) => {
    const result = await axios.post(`${API_URL}/restaurant/${restaurant}/item`, { ...data });
    return result.data;
}

export const GetFoodItems = async (restaurant) => {
    const result = await axios.get(`${API_URL}/restaurant/${restaurant}/items`);
    return result.data;
}