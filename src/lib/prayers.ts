import { Prayer, PrayerName } from "@/types";

export const PRAYERS: Prayer[] = [
  {
    id: "fajr",
    name: "Sabah",
    arabicName: "الفجر",
    time: "05:30",
    emoji: "🌅",
    completed: false,
    xpReward: 30,
  },
  {
    id: "dhuhr",
    name: "Öğle",
    arabicName: "الظهر",
    time: "13:00",
    emoji: "☀️",
    completed: false,
    xpReward: 20,
  },
  {
    id: "asr",
    name: "İkindi",
    arabicName: "العصر",
    time: "16:30",
    emoji: "🌤️",
    completed: false,
    xpReward: 20,
  },
  {
    id: "maghrib",
    name: "Akşam",
    arabicName: "المغرب",
    time: "19:45",
    emoji: "🌇",
    completed: false,
    xpReward: 25,
  },
  {
    id: "isha",
    name: "Yatsı",
    arabicName: "العشاء",
    time: "21:30",
    emoji: "🌙",
    completed: false,
    xpReward: 25,
  },
];

export const PRAYER_NAMES: Record<PrayerName, string> = {
  fajr: "Sabah",
  dhuhr: "Öğle",
  asr: "İkindi",
  maghrib: "Akşam",
  isha: "Yatsı",
};

export const XP_PER_LEVEL = 500;

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getXPForCurrentLevel(xp: number): number {
  return xp % XP_PER_LEVEL;
}

export function getProgressPercent(xp: number): number {
  return ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
}
