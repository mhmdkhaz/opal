import { _axios, _axiosF } from "../../interceptor/http-config";
// import axios from "axios";

export const _sendOrder = {
  getOrder: async () => {
    try {
      const response = await _axios.get(`orders`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDetailsOrder: async (id) => {
    try {
      const response = await _axios.get(`orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  postOrder: async ({ name, phone, items }) => {
    try {
      const response = await _axiosF.post(`/orders`, {
        name,
        phone,
        items,
      });
      return response.data;
    } catch (error) {
      console.error("خطأ في إرسال الطلب:", error);
      throw error;
    }
  },

  deleteOrder: async (id) => {
    try {
      const response = await _axios.delete(`orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
