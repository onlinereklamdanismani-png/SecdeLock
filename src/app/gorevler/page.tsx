"use client";

import { motion } from "framer-motion";
import BottomNav from "@/components/layout/BottomNav";
import { useTasks } from "@/hooks/useTasks";
import { useUserProfile } from "@/hooks/useUserProfile";
import { triggerHaptic } from "@/lib/api";

const CATEGORY_COLORS: Record<string, string> = {
  prayer: "rgba(16,185,129,0.15)",
  dua: "rgba(245,158,11,0.15)",
  quran: "rgba(139,92,246,0.15)",
  zikir: "rgba(59,130,246,0.15)",
  other: "rgba(255,255,255,0.08)",
};

const CATEGORY_LABELS: Record<string, string> = {
  prayer: "🕌 Namaz",
  dua: "🤲 Dua",
  quran: "📖 Kur'an",
  zikir: "📿 Zikir",
  other: "✨ Diğer",
};

export default function GorevlerPage() {
  const { tasks, completeTask, completedCount, totalCount, progressPercent } =
    useTasks();
  const { addXP } = useUserProfile();

  const handleComplete = (taskId: string) => {
    triggerHaptic("success");
    const xp = completeTask(taskId);
    if (xp > 0) addXP(xp);
  };

  return (
    <div className="page-enter min-h-dvh pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1">Günlük Görevler</h1>
        <p className="text-slate-400 text-sm">
          {completedCount}/{totalCount} tamamlandı
        </p>
      </div>

      {/* Progress */}
      <div className="px-5 mb-5">
        <div className="glass-card p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-300 font-medium">
              Bugünkü İlerleme
            </span>
            <span className="text-sm font-bold gradient-text">
              %{progressPercent}
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          {completedCount === totalCount && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-emerald-400 mt-3 font-semibold"
            >
              🎉 Tüm görevler tamamlandı! MaşaAllah!
            </motion.p>
          )}
        </div>
      </div>

      {/* Tasks */}
      <div className="px-5 space-y-2.5">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card px-4 py-4 rounded-2xl flex items-start gap-3 relative overflow-hidden"
            style={{
              borderColor: task.completed
                ? "rgba(16,185,129,0.2)"
                : "var(--border)",
              background: task.completed
                ? "rgba(16,185,129,0.04)"
                : "var(--bg-card)",
            }}
          >
            {/* Checkbox */}
            <button
              onClick={() => handleComplete(task.id)}
              className={`task-checkbox mt-0.5 ${task.completed ? "checked" : ""}`}
              disabled={task.completed}
            >
              {task.completed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-white text-xs font-bold"
                >
                  ✓
                </motion.span>
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg">{task.emoji}</span>
                  <p
                    className="font-semibold text-sm truncate"
                    style={{
                      color: task.completed ? "#64748b" : "#f1f5f9",
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </p>
                </div>
                <span
                  className="text-xs font-bold shrink-0 px-2 py-0.5 rounded-full"
                  style={{
                    background: CATEGORY_COLORS[task.category],
                    color: task.completed ? "#64748b" : "#10b981",
                  }}
                >
                  +{task.xpReward} XP
                </span>
              </div>
              <p
                className="text-xs mt-1.5 leading-relaxed"
                style={{
                  color: task.completed ? "#475569" : "#94a3b8",
                }}
              >
                {task.description}
              </p>
              <span
                className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: CATEGORY_COLORS[task.category],
                  color: "#94a3b8",
                }}
              >
                {CATEGORY_LABELS[task.category]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
