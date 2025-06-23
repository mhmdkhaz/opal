import { create } from "zustand";

export const useAuthStore = create((set, get) => {
  const redirectToLogin = () => {
    // if (window.location.pathname !== "/signin") {
    //   window.location.pathname = "/signin";
    // }
  };

  const tokenFromStorage = localStorage.getItem("token");

  return {
    // token: localStorage.getItem("token"),
    // isAuthenticated: !!localStorage.getItem("token"),
    // user: JSON.parse(localStorage.getItem("user")) || null,
    token: tokenFromStorage,
    isAuthenticated: !!tokenFromStorage,

    // login: (token) => {
    //   return new Promise((resolve) => {
    //     try {
    //       localStorage.setItem("token", token);

    //       set({
    //         token,
    //       });

    //       resolve();
    //     } catch (error) {
    //       console.error("Error saving auth data to localStorage", error);
    //     }
    //   });
    // },

    login: (token) => {
      return new Promise((resolve) => {
        try {
          localStorage.setItem("token", token);
          set({
            token,
            isAuthenticated: true,
          });
          resolve();
        } catch (error) {
          console.error("Error saving auth data to localStorage", error);
        }
      });
    },

    logout: () => {
      try {
        localStorage.removeItem("token");

        set({
          token: null,
          isAuthenticated: false,
        });

        redirectToLogin();
      } catch (error) {
        console.error("Error during logout", error);
      }
    },

    checkAuth: () => {
      const { token } = get();
      if (!token) {
        redirectToLogin();
        return false;
      }
      return true;
    },
  };
});
