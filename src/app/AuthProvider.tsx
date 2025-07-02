"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/features/auth/authSlice";

const TWO_HOURS = 2 * 60 * 60 * 1000; // 2 saat

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // sessiyanı yoxla
  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (!raw) {
      pathname !== "/auth" && router.replace("/auth");
      return;
    }

    const data: {
      email: string;
      remember: boolean;
      expiry: number | null;
      lastActive: number;
    } = JSON.parse(raw);

    // vaxtı keçibsə
    if (data.expiry && Date.now() - data.lastActive > TWO_HOURS) {
      localStorage.removeItem("auth");
      dispatch(logout());
      pathname !== "/auth" && router.replace("/auth");
      return;
    }

    // validdirsə
    dispatch(loginSuccess({ email: data.email }));
  }, [pathname, router, dispatch]);

  // aktivlik
  useEffect(() => {
    function touch() {
      const raw = localStorage.getItem("auth");
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.remember) return;
      data.lastActive = Date.now();
      localStorage.setItem("auth", JSON.stringify(data));
    }

    ["mousemove", "keydown", "click", "scroll"].forEach((evt) =>
      window.addEventListener(evt, touch)
    );
    return () =>
      ["mousemove", "keydown", "click", "scroll"].forEach((evt) =>
        window.removeEventListener(evt, touch)
      );
  }, []);

  return <>{children}</>;
}
