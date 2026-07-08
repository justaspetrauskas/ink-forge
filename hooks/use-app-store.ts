"use client";

import { create } from "zustand";

type AppUser = {
  id: string;
  email: string | null;
};

type AppStore = {
  user: AppUser | null;
  setUser: (user: AppUser) => void;
  clearUser: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));