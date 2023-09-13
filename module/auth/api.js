import axios from "axios";

const API_URL = "https://food-backend-moom.onrender.com";

export const LoginApi = async ({ email, password }) => {
  const result = await axios.post(`${API_URL}/login/user`, {
    email,
    password,
  });
  return result.data;
};

export const SignupApi = async (data) => {
  const result = await axios.post(`${API_URL}/user`, { ...data });
  return result.data;
};
