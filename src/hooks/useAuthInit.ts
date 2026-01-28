import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/useAuthStore";
import type { JwtPayload } from "@/types/auth";

export const useAuthInit = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (!accessToken) return;

    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);

      setUser({
        username: decoded.username,
        name: decoded.name,
      });
    } catch (error) {
      clearAuth();
    }
  }, [accessToken, setUser, clearAuth]);
};
