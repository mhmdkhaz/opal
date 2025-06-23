import { create } from "zustand";

export const useSetId = create((set, get) => ({
  id: localStorage.getItem("productId") || "", // ✅ استرجاع ID عند تحميل التطبيق

  addId: (productId) => {
    localStorage.setItem("productId", productId); // ✅ حفظ ID عند التحديث
    set(() => ({
      id: productId,
    }));
  },

  getIdProduct: () => get().id || localStorage.getItem("productId"), // ✅ التأكد من ID حتى بعد التحديث

  clearId: () => {
    localStorage.removeItem("productId"); // ✅ حذف ID عند الحاجة
    set(() => ({
      id: "",
    }));
  },
}));
