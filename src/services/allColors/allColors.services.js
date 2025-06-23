import { _axiosF } from "../../interceptor/http-config";
// import axios from "axios";

export const _allColorApi = {
  index: async ({ language }) => {
    try {
      const response = await _axiosF.get("/colors", {
        headers: {
          "Content-Type": "application/json",
          language: language,
        },
      });

      if (response.headers["content-type"]?.includes("application/json")) {
        return response.data;
      } else {
        throw new Error("استجابة غير صالحة: المتغير ليس JSON");
      }
    } catch (error) {
      console.error("خطأ في جلب بيانات الشريط:", error.message);
      throw error;
    }
  },
};
