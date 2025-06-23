import { _axios } from "../../interceptor/http-config";

export const _ColorsApi = {
  getColors: async ({ language }) => {
    try {
      const response = await _axios.get(`/colors`, {
        headers: {
          "Content-Type": "application/json",
          language: language,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  postColors: async ({ data }) => {
    try {
      const response = await _axios.post(`/colors`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateColors: async ({ id, data }) => {
    try {
      const response = await _axios.put(`/colors/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteColors: async ({ id }) => {
    try {
      const response = await _axios.delete(`/colors/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
