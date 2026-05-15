// Types for DuaLock app

export type PrayerName = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";

export interface Prayer {
  id: PrayerName;
  name: string;         // Turkish name
  arabicName: string;
  time: string;
  emoji: string;
  completed: boolean;
  xpReward: number;
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  prayers: Record<PrayerName, boolean>;
  tasksCompleted: string[];
  xpEarned: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  emoji: string;
  xpReward: number;
  category: "prayer" | "dua" | "quran" | "zikir" | "other";
  completed: boolean;
}

export interface Dua {
  id: string;
  title: string;
  arabicText: string;
  transliteration: string;
  turkishMeaning: string;
  category: "sabah" | "aksam" | "yemek" | "genel" | "kuran";
}

export interface UserProfile {
  name: string;
  lastName?: string;
  gender?: "male" | "female" | "";
  age?: number;
  city: string;
  avatar: string;
  joinDate: string;
  level: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  totalPrayersCompleted: number;
  badges: string[];
  isPremium: boolean;
}

export interface FocusModeType {
  type: "namaz" | "dua";
  duaId?: string;
  startedAt: number;
}

export type BadgeId =
  | "first_prayer"
  | "week_streak"
  | "month_streak"
  | "all_prayers_day"
  | "quran_reader"
  | "early_bird"
  | "night_owl"
  | "premium_user";
