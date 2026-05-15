"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUserProfile } from "@/hooks/useUserProfile";

const CITIES = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya",
  "Adana", "Konya", "Gaziantep", "Mersin", "Kayseri",
  "Eskişehir", "Trabzon", "Diyarbakır", "Samsun", "Diğer",
];

const MALE_AVATARS = ["🧔‍♂️", "👳‍♂️", "👨‍💻", "🕌", "🤲", "📿", "🕋"];
const FEMALE_AVATARS = ["🧕", "👩‍💻", "🌸", "🕌", "🤲", "📿", "🕋"];

const SLIDES = [
  {
    emoji: "🤲",
    title: "SecdeLock'a\nHoş Geldin",
    subtitle: "Namaz ve dualarını takip et, manevi yolculuğunda ilerlemeye devam et.",
    gradient: "from-emerald-500/20 to-transparent",
  },
  {
    emoji: "🔒",
    title: "Odak Modunu\nKeşfet",
    subtitle: "Namaz kılarken veya dua okurken tam ekran kilitle. Dikkat dağıtmadan ibadet et.",
    gradient: "from-amber-500/20 to-transparent",
  },
  {
    emoji: "🏆",
    title: "XP Kazan,\nSeviye Atla",
    subtitle: "Her tamamlanan namaz ve görev sana XP kazandırır. Serilerini kırma!",
    gradient: "from-purple-500/20 to-transparent",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { updateProfile } = useUserProfile();
  const [step, setStep] = useState(0); // 0,1,2 = slides, 3 = form
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("İstanbul");
  const [avatar, setAvatar] = useState("");

  const handleStart = () => {
    if (!name.trim() || !gender || !avatar) return;
    updateProfile({
      name: name.trim(),
      lastName: lastName.trim(),
      gender: gender as "male" | "female",
      age: parseInt(age) || undefined,
      city,
      avatar,
      joinDate: new Date().toISOString(),
    });
    router.push("/home");
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <AnimatePresence mode="wait">
        {step < 3 ? (
          /* Intro Slides */
          <motion.div
            key={`slide-${step}`}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex-1 flex flex-col items-center justify-between px-6 py-12"
          >
            {/* Top gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${SLIDES[step].gradient} pointer-events-none`}
            />

            {/* Skip */}
            <div className="w-full flex justify-end z-10">
              <button
                onClick={() => setStep(3)}
                className="text-slate-400 text-sm font-medium px-3 py-1"
              >
                Atla
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 z-10 text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="text-8xl"
                style={{ filter: "drop-shadow(0 0 30px rgba(16,185,129,0.4))" }}
              >
                {SLIDES[step].emoji}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold text-white mb-3 whitespace-pre-line leading-tight">
                  {SLIDES[step].title}
                </h1>
                <p className="text-slate-400 text-base leading-relaxed max-w-xs">
                  {SLIDES[step].subtitle}
                </p>
              </motion.div>
            </div>

            {/* Dots + Button */}
            <div className="w-full flex flex-col items-center gap-6 z-10">
              <div className="flex gap-2">
                {SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === step ? 24 : 8,
                      height: 8,
                      background:
                        i === step
                          ? "var(--emerald)"
                          : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setStep((s) => (s < 2 ? s + 1 : 3))}
                className="btn-emerald w-full py-4 text-base"
              >
                {step < 2 ? "Devam →" : "Başlayalım"}
              </button>
            </div>
          </motion.div>
        ) : (
          /* Profile Setup */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col px-6 py-10 gap-5 overflow-y-auto"
          >
            <div className="text-center mb-2">
              <h1 className="text-2xl font-bold text-white">Seni Tanıyalım</h1>
              <p className="text-slate-400 text-sm mt-1">Uygulamayı sana göre özelleştireceğiz</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block uppercase tracking-wider">Adın</label>
                <input
                  type="text"
                  placeholder="Ahmet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-card px-3 py-3 text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 rounded-xl text-sm"
                  style={{ border: "1px solid", borderColor: name ? "rgba(16,185,129,0.4)" : "var(--border)" }}
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block uppercase tracking-wider">Soyadın</label>
                <input
                  type="text"
                  placeholder="Yılmaz"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full glass-card px-3 py-3 text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 rounded-xl text-sm"
                  style={{ border: "1px solid", borderColor: lastName ? "rgba(16,185,129,0.4)" : "var(--border)" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block uppercase tracking-wider">Cinsiyet</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => { setGender("male"); setAvatar(""); }} className={`glass-card py-2 text-sm rounded-xl transition-all ${gender === "male" ? "text-emerald-400 border-emerald-500/50 bg-emerald-500/10" : "text-slate-400"}`} style={{ border: "1px solid", borderColor: gender === "male" ? "rgba(16,185,129,0.4)" : "var(--border)" }}>Erkek</button>
                  <button onClick={() => { setGender("female"); setAvatar(""); }} className={`glass-card py-2 text-sm rounded-xl transition-all ${gender === "female" ? "text-emerald-400 border-emerald-500/50 bg-emerald-500/10" : "text-slate-400"}`} style={{ border: "1px solid", borderColor: gender === "female" ? "rgba(16,185,129,0.4)" : "var(--border)" }}>Kadın</button>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block uppercase tracking-wider">Yaş</label>
                <input
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full glass-card px-3 py-3 text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 rounded-xl text-sm"
                  style={{ border: "1px solid", borderColor: age ? "rgba(16,185,129,0.4)" : "var(--border)" }}
                />
              </div>
            </div>

            {gender && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <label className="text-xs text-slate-400 font-medium mb-2 block uppercase tracking-wider">
                  Avatar Seç
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(gender === "male" ? MALE_AVATARS : FEMALE_AVATARS).map((av) => (
                    <button
                      key={av}
                      onClick={() => setAvatar(av)}
                      className={`glass-card p-2 text-2xl text-center rounded-xl transition-all duration-200 ${
                        avatar === av ? "emerald-glow border-emerald-500/50 bg-emerald-500/10" : "border-white/5"
                      }`}
                      style={{ border: "1px solid", borderColor: avatar === av ? "rgba(16,185,129,0.5)" : "var(--border)" }}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <div>
              <label className="text-xs text-slate-400 font-medium mb-2 block uppercase tracking-wider">Şehir</label>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`shrink-0 glass-card px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      city === c ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300"
                    }`}
                    style={{ border: "1px solid", borderColor: city === c ? "rgba(16,185,129,0.4)" : "var(--border)" }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={!name.trim() || !gender || !avatar}
              className="btn-emerald py-4 text-base mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Başla 🤲
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
