import { _axiosF } from "../../interceptor/http-config";
// import axios from "axios";

export const _productCategoriesApi = {
  index: async ({ language }) => {
    try {
      const response = await _axiosF.get("/categories", {
        headers: {
          "Content-Type": "application/json",
          language: language,
        },
      });

      return response.data.data;
      // if (response.headers["content-type"]?.includes("application/json")) {
      // } else {
      //   throw new Error("استجابة غير صالحة: المتغير ليس JSON");
      // }
    } catch (error) {
      console.error("خطأ في جلب بيانات الشريط:", error.message);
      throw error;
    }
  },
};
