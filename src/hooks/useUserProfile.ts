"use client";
import { useLocalStorage } from "./useLocalStorage";
import { UserProfile } from "@/types";

const DEFAULT_PROFILE: UserProfile = {
  name: "",
  city: "İstanbul",
  avatar: "🕌",
  joinDate: new Date().toISOString(),
  level: 1,
  totalXP: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalPrayersCompleted: 0,
  badges: [],
  isPremium: false,
};

export function useUserProfile() {
  const [profile, setProfile, isHydrated] = useLocalStorage<UserProfile>(
    "dualock_profile",
    DEFAULT_PROFILE
  );

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const addXP = (amount: number) => {
    setProfile((prev) => {
      const newXP = prev.totalXP + amount;
      const newLevel = Math.floor(newXP / 500) + 1;
      return { ...prev, totalXP: newXP, level: newLevel };
    });
  };

  const addBadge = (badgeId: string) => {
    setProfile((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
  };

  return { profile, updateProfile, addXP, addBadge, isHydrated };
}
