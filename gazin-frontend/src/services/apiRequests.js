import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || "3001"}/api`,
});

export const fetchFromApi = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const fetchFromApiById = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const createResource = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const editResource = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body);
  return data;
};

export const deleteFromApi = async (endpoint) => {
  const { data } = await api.delete(endpoint);
  return data;
};

export default api;
