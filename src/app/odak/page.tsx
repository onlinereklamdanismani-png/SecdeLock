"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DUAS, DUA_CATEGORIES } from "@/lib/duas";
import { Dua } from "@/types";
import { triggerHaptic } from "@/lib/api";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function NamazMode({ onExit }: { onExit: () => void }) {
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState<"ready" | "active" | "done">("ready");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startNamaz = () => {
    setPhase("active");
    intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  };

  const endNamaz = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    triggerHaptic("success");
    setPhase("done");
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full py-12 px-6">
      {phase === "ready" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-8 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-8xl"
            style={{ filter: "drop-shadow(0 0 30px rgba(16,185,129,0.5))" }}
          >
            🕌
          </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Namaz Modu</h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-xs">
              Ekran kilitleniyor. Namazını huşu ile kıl.
              <br />
              Tamamladığında butona bas.
            </p>
          </div>
          <div className="space-y-3 w-full">
            <button
              onClick={startNamaz}
              className="btn-emerald w-full py-4 text-base"
              style={{ boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
            >
              Namaza Başla 🤲
            </button>
            <button onClick={onExit} className="btn-ghost w-full py-3 text-sm">
              Geri Dön
            </button>
          </div>
        </motion.div>
      )}

      {phase === "active" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-10 text-center w-full"
        >
          {/* Pulsing ring */}
          <div className="relative">
            {/* Güzel Söz (Quote) */}
            <div className="absolute top-10 left-0 right-0 px-6 text-center z-10">
              <p className="text-amber-200/90 italic text-lg leading-relaxed" style={{ fontFamily: 'serif' }}>
                &ldquo;Sabret, çünkü Allah iyilik edenlerin mükafatını zayi etmez.&rdquo;
              </p>
            </div>

            <div
              className="absolute inset-0 rounded-full pulse-ring"
              style={{
                background: "rgba(16,185,129,0.1)",
                transform: "scale(1.2)",
              }}
            />
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center text-6xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
                border: "2px solid rgba(16,185,129,0.3)",
                boxShadow:
                  "0 0 40px rgba(16,185,129,0.3), inset 0 0 30px rgba(16,185,129,0.1)",
              }}
            >
              🕌
            </div>
          </div>

          <div>
            <p className="text-slate-400 text-sm mb-1">Namaz kılınıyor...</p>
            <p
              className="text-5xl font-black tabular-nums"
              style={{ color: "#10b981", textShadow: "0 0 30px rgba(16,185,129,0.6)" }}
            >
              {formatTime(elapsed)}
            </p>
          </div>

          <div className="space-y-2 w-full">
            {/* Tesbih counter hint */}
            <div
              className="glass-card px-4 py-3 rounded-xl text-sm text-slate-400 text-center mb-6"
              style={{ border: "1px solid rgba(16,185,129,0.1)" }}
            >
              📿 سُبْحَانَ اللّٰهِ &nbsp;·&nbsp; اَلْحَمْدُ لِلّٰهِ &nbsp;·&nbsp; اللّٰهُ أَكْبَرُ
            </div>

            <button
              onClick={endNamaz}
              className="btn-emerald w-full py-4 text-base"
            >
              Namazı Tamamladım ✓
            </button>

            <button
              onClick={onExit}
              className="w-full text-slate-500 text-xs pt-4 font-semibold hover:text-slate-400 transition-colors"
            >
              ⚠️ Acil Durum Çıkışı
            </button>
          </div>
        </motion.div>
      )}

      {phase === "done" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-6 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: 2, duration: 0.4 }}
            className="text-8xl"
          >
            🎉
          </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">MaşaAllah!</h2>
            <p className="text-slate-400 text-base">
              {formatTime(elapsed)} sürede namazını tamamladın.
            </p>
          </div>
          <button onClick={onExit} className="btn-emerald w-full py-4 text-base">
            Ana Sayfaya Dön
          </button>
        </motion.div>
      )}
    </div>
  );
}

function DuaMode({ onExit }: { onExit: () => void }) {
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredDuas = filterCategory === "all"
    ? DUAS
    : DUAS.filter((d) => d.category === filterCategory);

  if (selectedDua) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-8 pb-4 flex items-center justify-between shrink-0">
          <button
            onClick={() => setSelectedDua(null)}
            className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-lg"
          >
            ←
          </button>
          <h2 className="text-base font-bold text-white">{selectedDua.title}</h2>
          <div className="w-10" />
        </div>

        {/* Arabic Text */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-card p-6 rounded-2xl"
            style={{ border: "1px solid rgba(245,158,11,0.15)" }}
          >
            <p
              className="arabic-text text-center text-xl leading-loose text-amber-100"
            >
              {selectedDua.arabicText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="glass-card p-4 rounded-2xl relative overflow-hidden"
            style={{ border: "1px solid rgba(16,185,129,0.1)" }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/30" />
            <p className="text-xs text-emerald-400/70 font-semibold mb-2 uppercase tracking-widest">Okunuş</p>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              {selectedDua.transliteration}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            className="glass-card p-4 rounded-2xl relative overflow-hidden"
            style={{ border: "1px solid rgba(245,158,11,0.1)" }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/30" />
            <p className="text-xs text-amber-400/70 font-semibold mb-2 uppercase tracking-widest">Anlamı</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedDua.turkishMeaning}
            </p>
          </motion.div>

          <button
            onClick={() => setSelectedDua(null)}
            className="btn-ghost w-full py-3 text-sm"
          >
            ← Diğer Dualara Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-8 pb-3 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">🤲 Dua Modu</h2>
          <button
            onClick={onExit}
            className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-sm text-slate-400"
          >
            ✕
          </button>
        </div>
        <p className="text-slate-400 text-sm">Okumak istediğin duayı seç</p>
      </div>

      {/* Category Filter */}
      <div className="px-5 mb-3 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilterCategory("all")}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: filterCategory === "all"
                ? "rgba(16,185,129,0.2)"
                : "rgba(255,255,255,0.06)",
              color: filterCategory === "all" ? "#10b981" : "#94a3b8",
              border: `1px solid ${filterCategory === "all" ? "rgba(16,185,129,0.3)" : "transparent"}`,
            }}
          >
            🌟 Tümü
          </button>
          {Object.entries(DUA_CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilterCategory(key)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: filterCategory === key
                  ? "rgba(16,185,129,0.2)"
                  : "rgba(255,255,255,0.06)",
                color: filterCategory === key ? "#10b981" : "#94a3b8",
                border: `1px solid ${filterCategory === key ? "rgba(16,185,129,0.3)" : "transparent"}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Dua List */}
      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-2.5">
        {filteredDuas.map((dua, i) => (
          <motion.button
            key={dua.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => {
              setSelectedDua(dua);
            }}
            className="w-full glass-card px-4 py-4 rounded-2xl text-left relative overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">{dua.title}</p>
                <p
                  className="text-right text-sm text-amber-200/70 mt-1.5 leading-loose"
                  style={{ fontFamily: "serif", direction: "rtl" }}
                >
                  {dua.arabicText.slice(0, 40)}...
                </p>
              </div>
              <span className="text-slate-500 text-lg mt-1">→</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function OdakContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mod = searchParams.get("mod") || "namaz";
  const [activeMode, setActiveMode] = useState<"namaz" | "dua" | null>(null);

  const handleExit = () => {
    setActiveMode(null);
    router.push("/home");
  };

  // Direct mode from query param
  useEffect(() => {
    if (mod === "namaz") setActiveMode("namaz");
    else if (mod === "dua") setActiveMode("dua");
  }, [mod]);

  if (activeMode === "namaz") {
    return (
      <div
        className="focus-overlay flex flex-col"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.08) 0%, #000 60%)",
        }}
      >
        <NamazMode onExit={handleExit} />
      </div>
    );
  }

  if (activeMode === "dua") {
    return (
      <div
        className="focus-overlay flex flex-col"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(245,158,11,0.06) 0%, #000 60%)",
          overflowY: "auto",
        }}
      >
        <DuaMode onExit={handleExit} />
      </div>
    );
  }

  // Mode selection screen
  return (
    <div
      className="focus-overlay flex flex-col items-center justify-center px-6 gap-6"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.06) 0%, #000 60%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Odak Modu</h1>
        <p className="text-slate-400 text-base">Ne yapmak istiyorsun?</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setActiveMode("namaz")}
        className="w-full glass-card p-6 rounded-2xl text-left relative overflow-hidden"
        style={{
          border: "1px solid rgba(16,185,129,0.3)",
          background: "rgba(16,185,129,0.07)",
          boxShadow: "0 0 30px rgba(16,185,129,0.1)",
        }}
      >
        <div
          className="absolute -bottom-6 -right-6 text-8xl opacity-10"
        >
          🕌
        </div>
        <span className="text-4xl block mb-3">🕌</span>
        <p className="text-xl font-bold text-white">Namaz Modu</p>
        <p className="text-slate-400 text-sm mt-1">
          Tam ekran kilit • Namaz süresini ölç • Odaklanarak kıl
        </p>
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setActiveMode("dua")}
        className="w-full glass-card p-6 rounded-2xl text-left relative overflow-hidden"
        style={{
          border: "1px solid rgba(245,158,11,0.3)",
          background: "rgba(245,158,11,0.05)",
          boxShadow: "0 0 30px rgba(245,158,11,0.08)",
        }}
      >
        <div
          className="absolute -bottom-6 -right-6 text-8xl opacity-10"
        >
          🤲
        </div>
        <span className="text-4xl block mb-3">🤲</span>
        <p className="text-xl font-bold text-white">Dua Modu</p>
        <p className="text-slate-400 text-sm mt-1">
          8+ dua & sure • Arapça metin • Türkçe anlam
        </p>
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={handleExit}
        className="text-slate-500 text-sm py-2"
      >
        ← Geri Dön
      </motion.button>
    </div>
  );
}

export default function OdakPage() {
  return (
    <Suspense fallback={
      <div className="focus-overlay flex items-center justify-center">
        <div className="text-3xl animate-float">🤲</div>
      </div>
    }>
      <OdakContent />
    </Suspense>
  );
}
