"use client";

import { useEffect } from "react";
import { useAppStore } from "@/hooks/use-app-store";

type AppUser = {
  id: string;
  email: string | null;
};

type AuthStoreSyncProps = {
  user: AppUser | null;
};

export function AuthStoreSync({ user }: AuthStoreSyncProps): null {
  const setUser = useAppStore((state) => state.setUser);
  const clearUser = useAppStore((state) => state.clearUser);

  useEffect(() => {
    if (user) {
      setUser(user);
      return;
    }

    clearUser();
  }, [clearUser, setUser, user]);

  return null;
}