import { create } from "zustand";

export const useFilterDataProduct = create((set, get) => ({
  minPrice: "",
  maxPrice: "",
  colorFilter: "",
  categoryId: "",
  hasDiscount: "",
  baseSeller: "",

  setMaxPriceApi: (max) => {
    set(() => ({
      maxPrice: max,
    }));
  },

  setMinPriceApi: (min) => {
    set(() => ({
      minPrice: min,
    }));
  },

  getMax: () => get().maxPrice,
  getMin: () => get().minPrice,

  // start the color
  setColor: (coloredFilter) => {
    set(() => ({
      colorFilter: coloredFilter,
    }));
  },

  getColor: () => get().colorFilter,

  // start the category id
  setCategoryId: (category_id) => {
    set(() => ({
      categoryId: category_id,
    }));
  },

  getCategoryId: () => get().categoryId,

  // start the discount
  setDiscountStore: (hasDiscounts) => {
    set(() => ({
      hasDiscount: hasDiscounts,
    }));
  },

  getDiscountStore: () => get().hasDiscount,

  // start in best seller
  setBaseSellerStore: (hasBaseSeller) => {
    set(() => ({
      baseSeller: hasBaseSeller,
    }));
  },

  getBaseSellerStore: () => get().baseSeller,
}));
