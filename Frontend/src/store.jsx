import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist( // Wrap your store with persist
    (set) => ({
      isLoggedIn: false,
      userData: null, // To store name, referralCode, totalDonations
      login: (userData) => set({ isLoggedIn: true, userData }),
      logout: () => set({ isLoggedIn: false, userData: null }),
      setUserData: (data) => set((state) => ({ userData: { ...state.userData, ...data } })),
    }),
    {
      name: 'user-storage'
    }
  )
);

export const useThemeStore = create(
    persist(
        (set) => ({
            darkMode : false,
            toggleTheme : () => set((state) => ({ darkMode: !state.darkMode })),
        }),
        {
            name: "darkMode",
            getStorage: () => localStorage
        }
    )
);
