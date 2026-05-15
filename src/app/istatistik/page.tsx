"use client";

import { motion } from "framer-motion";
import BottomNav from "@/components/layout/BottomNav";
import { usePrayerTracker } from "@/hooks/usePrayerTracker";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getLevelFromXP, getProgressPercent } from "@/lib/prayers";

const XP_PER_LEVEL = 500;

export default function IstatistikPage() {
  const { profile } = useUserProfile();
  const { getWeeklyData, getTotalCompleted, todayCompleted } = usePrayerTracker();
  const weeklyData = getWeeklyData();
  const totalCompleted = getTotalCompleted();
  const level = getLevelFromXP(profile.totalXP);
  const xpProgress = getProgressPercent(profile.totalXP);

  const maxDay = Math.max(...weeklyData.map((d) => d.completed), 1);

  const STATS = [
    {
      label: "Toplam Namaz",
      value: totalCompleted,
      suffix: "vakit",
      emoji: "🕌",
      color: "#10b981",
    },
    {
      label: "En Uzun Seri",
      value: profile.longestStreak || profile.currentStreak,
      suffix: "gün",
      emoji: "🔥",
      color: "#f59e0b",
    },
    {
      label: "Mevcut Seri",
      value: profile.currentStreak,
      suffix: "gün",
      emoji: "⚡",
      color: "#8b5cf6",
    },
    {
      label: "Toplam XP",
      value: profile.totalXP,
      suffix: "xp",
      emoji: "✨",
      color: "#06b6d4",
    },
  ];

  return (
    <div className="page-enter min-h-dvh pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1">İstatistikler</h1>
        <p className="text-slate-400 text-sm">Manevi yolculuğun</p>
      </div>

      {/* Level Card */}
      <div className="px-5 mb-4">
        <div
          className="glass-card p-5 rounded-2xl relative overflow-hidden"
          style={{ border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <div className="absolute -top-6 -right-6 text-[100px] opacity-5">⚡</div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Seviye</p>
              <p className="text-4xl font-black gradient-text">{level}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 mb-1">Sonraki Seviye</p>
              <p className="text-sm text-slate-300">
                <span className="text-white font-bold">
                  {profile.totalXP % XP_PER_LEVEL}
                </span>{" "}
                / {XP_PER_LEVEL} XP
              </p>
            </div>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-4 rounded-2xl"
              style={{
                border: `1px solid ${stat.color}25`,
                background: `${stat.color}06`,
              }}
            >
              <p className="text-2xl mb-2">{stat.emoji}</p>
              <p
                className="text-2xl font-black"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.suffix}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="px-5 mb-4">
        <div className="glass-card p-4 rounded-2xl">
          <p className="text-sm font-semibold text-white mb-4">Son 7 Gün</p>
          <div className="flex items-end justify-between gap-1.5 h-28">
            {weeklyData.map((day, i) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t-lg relative"
                  initial={{ height: 0 }}
                  animate={{
                    height: `${Math.max(8, (day.completed / maxDay) * 88)}px`,
                  }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
                  style={{
                    background:
                      day.completed === 5
                        ? "linear-gradient(to top, #059669, #34d399)"
                        : day.completed > 0
                        ? "linear-gradient(to top, rgba(16,185,129,0.4), rgba(52,211,153,0.3))"
                        : "rgba(255,255,255,0.06)",
                    boxShadow:
                      day.completed === 5
                        ? "0 0 12px rgba(16,185,129,0.4)"
                        : "none",
                    minHeight: 8,
                  }}
                />
                <span className="text-[10px] text-slate-500">{day.day}</span>
                <span
                  className="text-[10px] font-bold"
                  style={{ color: day.completed === 5 ? "#10b981" : "#64748b" }}
                >
                  {day.completed}/5
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      {profile.badges.length > 0 && (
        <div className="px-5 mb-4">
          <div className="glass-card p-4 rounded-2xl">
            <p className="text-sm font-semibold text-white mb-3">🏆 Rozetler</p>
            <div className="flex flex-wrap gap-2">
              {profile.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style={{
                    background: "rgba(245,158,11,0.15)",
                    color: "#fbbf24",
                    border: "1px solid rgba(245,158,11,0.2)",
                  }}
                >
                  ⭐ {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
