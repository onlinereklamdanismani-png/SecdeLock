"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function RootPage() {
  const router = useRouter();
  const [profile, , isHydrated] = useLocalStorage("dualock_profile", { name: "" });

  useEffect(() => {
    if (!isHydrated) return;
    // @ts-ignore
    if (profile?.name) {
      router.replace("/home");
    } else {
      router.replace("/onboarding");
    }
  }, [isHydrated, profile, router]);

  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-float">🤲</div>
        <p className="gradient-text text-2xl font-bold">DuaLock</p>
      </div>
    </div>
  );
}
