"use client";
import { useLocalStorage } from "./useLocalStorage";
import { DailyRecord, PrayerName } from "@/types";
import { PRAYERS } from "@/lib/prayers";

function getTodayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function getDefaultRecord(): DailyRecord {
  const prayers: Record<PrayerName, boolean> = {
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  };
  return {
    date: getTodayKey(),
    prayers,
    tasksCompleted: [],
    xpEarned: 0,
  };
}

export function usePrayerTracker() {
  const todayKey = getTodayKey();
  const [records, setRecords] = useLocalStorage<Record<string, DailyRecord>>(
    "dualock_records",
    {}
  );

  const todayRecord = records[todayKey] || getDefaultRecord();

  const completePrayer = (prayerId: PrayerName): number => {
    const prayer = PRAYERS.find((p) => p.id === prayerId);
    if (!prayer || todayRecord.prayers[prayerId]) return 0;

    const xp = prayer.xpReward;
    setRecords((prev) => {
      const today = prev[todayKey] || getDefaultRecord();
      return {
        ...prev,
        [todayKey]: {
          ...today,
          prayers: { ...today.prayers, [prayerId]: true },
          xpEarned: today.xpEarned + xp,
        },
      };
    });
    return xp;
  };

  const getWeeklyData = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];
      const record = records[key];
      const completed = record
        ? Object.values(record.prayers).filter(Boolean).length
        : 0;
      days.push({
        date: key,
        day: date.toLocaleDateString("tr-TR", { weekday: "short" }),
        completed,
        total: 5,
      });
    }
    return days;
  };

  const getTotalCompleted = (): number => {
    return Object.values(records).reduce((sum, r) => {
      return sum + Object.values(r.prayers).filter(Boolean).length;
    }, 0);
  };

  const todayCompleted = Object.values(todayRecord.prayers).filter(Boolean).length;

  return {
    todayRecord,
    completePrayer,
    getWeeklyData,
    getTotalCompleted,
    todayCompleted,
  };
}
