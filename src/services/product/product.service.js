import { _axios, _axiosF } from "../../interceptor/http-config";
// import { _axiosF } from "../../interceptor/http-config";

export const _productsApi = {
  index: async ({
    language,
    page,
    getMax,
    getMin,
    getColor,
    getCategoryId,
    getDiscountStore,
    getBaseSellerStore,
  }) => {
    try {
      const response = await _axiosF.get(
        `/products?min_price=${getMin()}&max_price=${getMax()}&page=${page}&color=${getColor()}&category_id=${getCategoryId()}&${getDiscountStore()}&${getBaseSellerStore()}`,
        {
          headers: {
            language: language,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("خطأ في جلب بيانات المنتجات:", error.message);
      throw error;
    }
  },

  bestSellerProduct: async ({ language }) => {
    try {
      const response = await _axiosF.get("products?base_seller=1", {
        headers: {
          language: language,
        },
      });

      return response.data;
    } catch (error) {
      console.error("خطأ في جلب بيانات المنتجات:", error.message);
      throw error;
    }
  },

  getAllProductClient: async ({ language }) => {
    try {
      const response = await _axiosF.get(`/products`, {
        headers: {
          language: language,
        },
      });

      return response.data;
    } catch (error) {
      console.error("خطأ في جلب بيانات المنتجات:", error.message);
      throw error;
    }
  },

  getAllProduct: async ({ language }) => {
    try {
      const response = await _axios.get(`/products`, {
        headers: {
          language: language,
        },
      });

      return response.data;
    } catch (error) {
      console.error("خطأ في جلب بيانات المنتجات:", error.message);
      throw error;
    }
  },

  productDiscount: async ({ language }) => {
    try {
      const response = await _axiosF.get("/products?has_discount=1", {
        headers: {
          language: language,
        },
      });
      return response.data;
    } catch (error) {
      console.error("خطأ في جلب بيانات المنتجات:", error.message);
      throw error;
    }
  },

  getInfoSingleProduct: async ({ id, language }) => {
    try {
      const response = await _axiosF.get(`/products/${id}`, {
        headers: {
          language: language,
        },
      });

      return response.data;
    } catch {
      console.error("خطأ في جلب بيانات المنتجات:", error.message);
      throw error;
    }
  },

  postProduct: async (formData) => {
    try {
      const response = await _axios.post("/products", formData);
      return response.data;
    } catch {
      console.error(error.message);
      throw error;
    }
  },

  updateProduct: async ({ id, formData }) => {
    try {
      const response = await _axios.post(`/products/${id}`, formData);
      return response.data;
    } catch {
      console.error(error.message);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await _axios.delete(`/products/${id}`);
      return response.data;
    } catch {
      console.error(error.message);
      throw error;
    }
  },
};
