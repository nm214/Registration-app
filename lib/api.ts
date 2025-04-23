import axios from "axios";

const API_BASE_URL = "https://6808ca28942707d722dfc712.mockapi.io/forms";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const submitForm = async (data: any) => {
  const response = await api.post("/forms", data);
  return response.data;
};
