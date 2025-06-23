import { _axios, _axiosF } from "../../interceptor/http-config";
// import axios from "axios";

export const _categoriesApi = {
  indexClient: async ({ language }) => {
    try {
      const response = await _axiosF.get("categories", {
        headers: {
          "Content-Type": "application/json",
          language: language,
        },
      });

      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  index: async ({ language }) => {
    try {
      const response = await _axios.get("categories", {
        headers: {
          "Content-Type": "application/json",
          language: language,
        },
      });

      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  postCategory: async (formData) => {
    const response = await _axios.post("categories", formData);
    return response.data;
  },

  updateCategory: async ({ id, data }) => {
    const response = await _axios.post(`categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await _axios.delete(`categories/${id}`);
    return response.data;
  },
};
