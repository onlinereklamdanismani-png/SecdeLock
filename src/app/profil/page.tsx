"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/layout/BottomNav";
import { useUserProfile } from "@/hooks/useUserProfile";
import { usePrayerTracker } from "@/hooks/usePrayerTracker";
import { getLevelFromXP } from "@/lib/prayers";

const BADGES: Record<string, { emoji: string; label: string; desc: string }> = {
  first_prayer: { emoji: "🌅", label: "İlk Namaz", desc: "İlk namazını tamamladın" },
  week_streak: { emoji: "🔥", label: "7 Günlük Seri", desc: "7 gün arka arkaya namaz" },
  month_streak: { emoji: "🏆", label: "30 Günlük Seri", desc: "30 gün arka arkaya namaz" },
  all_prayers_day: { emoji: "⭐", label: "Tam Gün", desc: "Bir günde 5 vakit tamamla" },
  premium_user: { emoji: "💎", label: "Premium", desc: "Premium üyelik" },
};

const AVATARS = ["🕌", "🤲", "📿", "🌙", "⭐", "📖", "🌿", "🕋"];
const CITIES = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya", "Diğer"];

export default function ProfilPage() {
  const { profile, updateProfile } = useUserProfile();
  const { getTotalCompleted } = usePrayerTracker();
  const level = getLevelFromXP(profile.totalXP);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editCity, setEditCity] = useState(profile.city);
  const [editAvatar, setEditAvatar] = useState(profile.avatar);

  const handleSave = () => {
    updateProfile({ name: editName, city: editCity, avatar: editAvatar });
    setEditing(false);
  };

  const joinDate = new Date(profile.joinDate).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="page-enter min-h-dvh pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Profil</h1>
          <button
            onClick={() => {
              setEditName(profile.name);
              setEditCity(profile.city);
              setEditAvatar(profile.avatar);
              setEditing(!editing);
            }}
            className="btn-ghost px-4 py-2 text-sm"
          >
            {editing ? "İptal" : "✏️ Düzenle"}
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-5 mb-4">
        <div
          className="glass-card p-5 rounded-2xl text-center relative overflow-hidden"
          style={{ border: "1px solid rgba(16,185,129,0.15)" }}
        >
          <div className="absolute inset-0 bg-emerald-glow opacity-30 pointer-events-none" />

          {editing ? (
            <div className="space-y-4 z-10 relative">
              {/* Avatar */}
              <div className="grid grid-cols-4 gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    onClick={() => setEditAvatar(av)}
                    className="glass-card p-2 text-2xl text-center rounded-xl"
                    style={{
                      borderColor:
                        editAvatar === av
                          ? "rgba(16,185,129,0.5)"
                          : "var(--border)",
                      background:
                        editAvatar === av ? "rgba(16,185,129,0.1)" : undefined,
                    }}
                  >
                    {av}
                  </button>
                ))}
              </div>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full glass-card px-4 py-3 text-white outline-none rounded-xl text-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)" }}
                placeholder="Adın"
              />
              <div className="grid grid-cols-3 gap-2">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setEditCity(c)}
                    className="glass-card px-2 py-2 text-xs rounded-xl"
                    style={{
                      borderColor: editCity === c ? "rgba(16,185,129,0.4)" : "var(--border)",
                      color: editCity === c ? "#10b981" : "#94a3b8",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button onClick={handleSave} className="btn-emerald w-full py-3 text-sm">
                Kaydet
              </button>
            </div>
          ) : (
            <div className="z-10 relative">
              <motion.div
                className="text-6xl mb-3"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                {profile.avatar}
              </motion.div>
              <h2 className="text-xl font-bold text-white">{profile.name}</h2>
              <p className="text-slate-400 text-sm mt-0.5">
                📍 {profile.city}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}
                >
                  Seviye {level}
                </span>
                {profile.isPremium && (
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24" }}
                  >
                    ⭐ Premium
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Katılım: {joinDate}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Toplam XP", value: profile.totalXP, emoji: "✨" },
            { label: "Seri", value: `${profile.currentStreak} gün`, emoji: "🔥" },
            { label: "Namaz", value: getTotalCompleted(), emoji: "🕌" },
          ].map((s) => (
            <div
              key={s.label}
              className="glass-card p-3 rounded-2xl text-center"
            >
              <p className="text-xl mb-1">{s.emoji}</p>
              <p className="text-base font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="px-5 mb-4">
        <h2 className="text-base font-semibold text-white mb-3">🏆 Rozetler</h2>
        {profile.badges.length === 0 ? (
          <div className="glass-card p-6 rounded-2xl text-center">
            <p className="text-3xl mb-2">🎯</p>
            <p className="text-slate-400 text-sm">
              Henüz rozet kazanmadın. Namaz kılmaya başla!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {profile.badges.map((badgeId) => {
              const badge = BADGES[badgeId] || {
                emoji: "⭐",
                label: badgeId,
                desc: "",
              };
              return (
                <div
                  key={badgeId}
                  className="glass-card px-4 py-3 rounded-xl flex items-center gap-3"
                  style={{ border: "1px solid rgba(245,158,11,0.15)" }}
                >
                  <span className="text-2xl">{badge.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {badge.label}
                    </p>
                    <p className="text-xs text-slate-400">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
