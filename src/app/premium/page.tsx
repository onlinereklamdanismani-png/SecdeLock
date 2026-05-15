"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";
import { useUserProfile } from "@/hooks/useUserProfile";

const FEATURES = [
  { icon: "🚫", label: "Reklamsız Deneyim", desc: "Hiç reklam yok" },
  { icon: "🌙", label: "Gece Modu Teması", desc: "Özel karanlık tema" },
  { icon: "📊", label: "Detaylı İstatistik", desc: "Aylık ve yıllık raporlar" },
  { icon: "🔔", label: "Akıllı Hatırlatıcı", desc: "Namaz vakti bildirimleri" },
  { icon: "📖", label: "Tüm Dua Arşivi", desc: "500+ dua ve ayet" },
  { icon: "🏆", label: "Özel Rozetler", desc: "Premium rozet koleksiyonu" },
  { icon: "🌍", label: "Otomatik Vakit", desc: "Konum bazlı namaz vakitleri" },
  { icon: "☁️", label: "Bulut Yedekleme", desc: "Verilerini kaybetme" },
];

const PLANS = [
  {
    id: "monthly",
    label: "Aylık",
    price: "₺49",
    period: "/ay",
    highlight: false,
    badge: null,
  },
  {
    id: "yearly",
    label: "Yıllık",
    price: "₺299",
    period: "/yıl",
    highlight: true,
    badge: "En Popüler",
    saving: "%50 Tasarruf",
  },
  {
    id: "lifetime",
    label: "Ömürlük",
    price: "₺799",
    period: "tek seferlik",
    highlight: false,
    badge: "Sınırlı",
  },
];

export default function PremiumPage() {
  const { profile, updateProfile } = useUserProfile();

  const handleActivate = () => {
    updateProfile({ isPremium: true });
    alert("Premium aktif edildi! (Simülasyon) ✨");
  };

  return (
    <div className="page-enter min-h-dvh pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-2 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.1))",
            border: "1px solid rgba(245,158,11,0.3)",
            boxShadow: "0 0 30px rgba(245,158,11,0.2)",
          }}
        >
          ⭐
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">DuaLock Premium</h1>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          İbadeti daha verimli hale getir. Tüm özelliklere sınırsız eriş.
        </p>
        {profile.isPremium && (
          <div
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(16,185,129,0.15)",
              color: "#10b981",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            ✓ Premium Aktif
          </div>
        )}
      </div>

      {/* Features */}
      <div className="px-5 mb-5 mt-4">
        <div className="grid grid-cols-2 gap-2.5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-3 rounded-xl flex items-start gap-2.5"
            >
              <span className="text-xl mt-0.5">{f.icon}</span>
              <div>
                <p className="text-xs font-semibold text-white">{f.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="px-5 mb-5">
        <h2 className="text-base font-semibold text-white mb-3">Plan Seç</h2>
        <div className="space-y-3">
          {PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              whileTap={{ scale: 0.99 }}
              className="glass-card p-4 rounded-2xl relative"
              style={{
                border: plan.highlight
                  ? "1px solid rgba(245,158,11,0.4)"
                  : "1px solid var(--border)",
                background: plan.highlight
                  ? "rgba(245,158,11,0.06)"
                  : "var(--bg-card)",
                boxShadow: plan.highlight
                  ? "0 0 20px rgba(245,158,11,0.1)"
                  : "none",
              }}
            >
              {plan.badge && (
                <span
                  className="absolute -top-2.5 right-4 text-xs font-bold px-3 py-0.5 rounded-full"
                  style={{
                    background: plan.highlight
                      ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
                      : "rgba(255,255,255,0.1)",
                    color: plan.highlight ? "#000" : "#94a3b8",
                  }}
                >
                  {plan.badge}
                </span>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{plan.label}</p>
                  {plan.saving && (
                    <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                      {plan.saving}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className="text-2xl font-black"
                    style={{ color: plan.highlight ? "#fbbf24" : "#f1f5f9" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-400"> {plan.period}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!profile.isPremium && (
        <div className="px-5 mb-6">
          <button
            onClick={handleActivate}
            className="w-full py-4 rounded-2xl font-bold text-base text-black"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              boxShadow: "0 4px 24px rgba(245,158,11,0.4)",
            }}
          >
            Premium&apos;u Başlat ⭐
          </button>
          <p className="text-center text-xs text-slate-500 mt-2">
            İstediğin zaman iptal edebilirsin
          </p>
        </div>
      )}

      <div className="px-5">
        <Link href="/home">
          <button className="btn-ghost w-full py-3 text-sm">
            ← Ana Sayfaya Dön
          </button>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
