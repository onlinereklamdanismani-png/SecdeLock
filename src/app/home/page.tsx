"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useUserProfile } from "@/hooks/useUserProfile";
import { usePrayerTracker } from "@/hooks/usePrayerTracker";
import { PRAYERS } from "@/lib/prayers";
import { getLevelFromXP, getProgressPercent } from "@/lib/prayers";
import { PrayerName } from "@/types";
import { MOTIVATIONAL_QUOTES } from "@/lib/tasks";
import { getPrayerTimesByCity, triggerHaptic } from "@/lib/api";

const XP_PER_LEVEL = 500;

export default function HomePage() {
  const router = useRouter();
  const { profile, addXP } = useUserProfile();
  const { todayRecord, completePrayer, todayCompleted } = usePrayerTracker();
  const [xpPop, setXpPop] = useState<{ id: string; xp: number } | null>(null);

  const level = getLevelFromXP(profile.totalXP);
  const progressPercent = getProgressPercent(profile.totalXP);
  const todayQuote = MOTIVATIONAL_QUOTES[new Date().getDay() % MOTIVATIONAL_QUOTES.length];

  const [realTimings, setRealTimings] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    if (profile.city) {
      getPrayerTimesByCity(profile.city).then((times) => {
        if (times) setRealTimings(times);
      });
    }
  }, [profile.city]);

  const handleComplete = (prayerId: PrayerName) => {
    triggerHaptic("success");
    const xp = completePrayer(prayerId);
    if (xp > 0) {
      addXP(xp);
      setXpPop({ id: prayerId, xp });
      setTimeout(() => setXpPop(null), 2000);
    }
  };

  const allCompleted = todayCompleted === 5;

  return (
    <div className="page-enter min-h-dvh pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-slate-400 text-sm">Selamün Aleyküm 🌿</p>
            <h1 className="text-2xl font-bold text-white">
              {profile.name || "Kardeşim"}{" "}
              <span className="text-xl">{profile.avatar}</span>
            </h1>
          </div>
          <Link href="/premium">
            <div
              className="glass-card px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{
                background: profile.isPremium
                  ? "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.1))"
                  : "var(--bg-card)",
                borderColor: profile.isPremium
                  ? "rgba(245,158,11,0.3)"
                  : "var(--border)",
                color: profile.isPremium ? "#fbbf24" : "#94a3b8",
              }}
            >
              {profile.isPremium ? "⭐ Premium" : "Premium →"}
            </div>
          </Link>
        </div>
      </div>

      {/* XP Card */}
      <div className="px-5 mb-4">
        <div
          className="glass-card p-4 rounded-2xl"
          style={{ border: "1px solid rgba(16,185,129,0.15)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: "rgba(16,185,129,0.15)" }}
              >
                ⚡
              </div>
              <div>
                <p className="text-xs text-slate-400">Seviye</p>
                <p className="text-lg font-bold gradient-text">Lvl {level}</p>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: "rgba(245,158,11,0.15)" }}
              >
                <span className="fire-animate">🔥</span>
              </div>
              <div>
                <p className="text-xs text-slate-400">Seri</p>
                <p className="text-lg font-bold gradient-text-gold">
                  {profile.currentStreak} gün
                </p>
              </div>
            </div>

            {/* Total XP */}
            <div className="text-right">
              <p className="text-xs text-slate-400">Toplam XP</p>
              <p className="text-lg font-bold text-white">{profile.totalXP}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-slate-500">
              {profile.totalXP % XP_PER_LEVEL} XP
            </span>
            <span className="text-xs text-slate-500">
              {XP_PER_LEVEL} XP → Lvl {level + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Today Prayer Progress */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-semibold text-white">Bugünün Namazları</h2>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background:
                allCompleted
                  ? "rgba(16,185,129,0.2)"
                  : "rgba(255,255,255,0.06)",
              color: allCompleted ? "#10b981" : "#94a3b8",
            }}
          >
            {todayCompleted}/5
          </span>
        </div>

        <div className="space-y-2.5">
          {PRAYERS.map((prayer, i) => {
            const isCompleted = todayRecord.prayers[prayer.id];
            return (
              <motion.div
                key={prayer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass-card px-4 py-3 flex items-center justify-between relative overflow-hidden"
                style={{
                  borderColor: isCompleted
                    ? "rgba(16,185,129,0.25)"
                    : "var(--border)",
                  background: isCompleted
                    ? "rgba(16,185,129,0.06)"
                    : "var(--bg-card)",
                }}
              >
                {/* Completed glow */}
                {isCompleted && (
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(16,185,129,0.2), transparent)",
                    }}
                  />
                )}

                <div className="flex items-center gap-3 z-10">
                  <span className="text-2xl">{prayer.emoji}</span>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: isCompleted ? "#10b981" : "#f1f5f9" }}
                    >
                      {prayer.name}
                    </p>
                    <p className="text-xs text-slate-500">{prayer.arabicName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 z-10">
                  <span className="text-xs text-slate-500">
                    {realTimings ? realTimings[prayer.id] : prayer.time}
                  </span>
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
                      style={{ background: "rgba(16,185,129,0.2)" }}
                    >
                      ✓
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => handleComplete(prayer.id)}
                      className="btn-emerald px-3 py-1.5 text-xs rounded-xl"
                    >
                      Tamamla
                    </button>
                  )}
                </div>

                {/* XP Pop */}
                <AnimatePresence>
                  {xpPop?.id === prayer.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 0, scale: 0.8 }}
                      animate={{ opacity: 1, y: -30, scale: 1 }}
                      exit={{ opacity: 0, y: -50 }}
                      className="absolute right-4 top-2 text-sm font-bold text-emerald-400 pointer-events-none z-20"
                    >
                      +{xpPop.xp} XP ✨
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Focus Mode Buttons */}
      <div className="px-5 mb-4">
        <h2 className="text-base font-semibold text-white mb-2">Odak Modu</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Namaz Modu */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/odak?mod=namaz")}
            className="glass-card p-4 rounded-2xl text-left relative overflow-hidden"
            style={{
              border: "1px solid rgba(16,185,129,0.2)",
              background: "rgba(16,185,129,0.06)",
            }}
          >
            <div className="text-2xl mb-2">🕌</div>
            <p className="font-bold text-sm text-white">Namaz Modu</p>
            <p className="text-xs text-slate-400 mt-0.5">Tam ekran, odaklı namaz</p>
            <div
              className="absolute -bottom-4 -right-4 text-6xl opacity-10"
            >
              🕌
            </div>
          </motion.button>

          {/* Dua Modu */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/odak?mod=dua")}
            className="glass-card p-4 rounded-2xl text-left relative overflow-hidden"
            style={{
              border: "1px solid rgba(245,158,11,0.2)",
              background: "rgba(245,158,11,0.04)",
            }}
          >
            <div className="text-2xl mb-2">🤲</div>
            <p className="font-bold text-sm text-white">Dua Modu</p>
            <p className="text-xs text-slate-400 mt-0.5">Duaları oku, odaklan</p>
            <div
              className="absolute -bottom-4 -right-4 text-6xl opacity-10"
            >
              🤲
            </div>
          </motion.button>
        </div>
      </div>

      {/* Daily Quote */}
      <div className="px-5 mb-4">
        <div
          className="glass-card p-4 rounded-2xl"
          style={{ border: "1px solid rgba(245,158,11,0.1)" }}
        >
          <p className="text-xs text-slate-400 mb-2 font-medium">📖 Günün Ayeti</p>
          <p
            className="text-right text-lg leading-loose mb-2 text-amber-200"
            style={{ fontFamily: "serif", direction: "rtl" }}
          >
            {todayQuote.arabic}
          </p>
          <p className="text-slate-300 text-sm leading-relaxed italic">
            &ldquo;{todayQuote.turkish}&rdquo;
          </p>
          <p className="text-right text-xs text-slate-500 mt-1.5">
            — {todayQuote.source}
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
