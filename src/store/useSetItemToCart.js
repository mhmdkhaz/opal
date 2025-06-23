import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product) =>
    set((state) => ({
      cartItems: [...state.cartItems, product],
    })),

  removeFromCart: (product_id, color, size) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) =>
          !(
            item.product_id === product_id &&
            item.other_fields.color === color &&
            item.other_fields.size === size
          )
      ),
    })),

  clearCart: () =>
    set(() => ({
      cartItems: [],
    })),

  totalPrice: () => get().cartItems.reduce((acc, item) => acc + item.price, 0),
}));

export default useCartStore;
