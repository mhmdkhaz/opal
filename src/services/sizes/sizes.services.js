import { _axios } from "../../interceptor/http-config";

export const _SizesApi = {
  getSizes: async () => {
    try {
      const response = await _axios.get(`/sizes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  postSizes: async ({ data }) => {
    try {
      const response = await _axios.post(`/sizes`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateSizes: async ({ id, data }) => {
    try {
      const response = await _axios.put(`/sizes/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteSizes: async ({ id }) => {
    try {
      const response = await _axios.delete(`/sizes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
