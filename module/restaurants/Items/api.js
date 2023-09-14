import axios from "axios";

const API_URL = "https://food-backend-moom.onrender.com";

export const AddFoodItem = async (data, restaurant) => {
    const result = await axios.post(`${API_URL}/restaurant/${restaurant}/item`, { ...data });
    return result.data;
}

export const GetFoodItems = async (restaurant) => {
    const result = await axios.get(`${API_URL}/restaurant/${restaurant}/items`);
    return result.data;
}