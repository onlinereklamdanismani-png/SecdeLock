"use client";
import { useLocalStorage } from "./useLocalStorage";
import { Task } from "@/types";
import { DAILY_TASKS } from "@/lib/tasks";

function getTodayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function useTasks() {
  const todayKey = getTodayKey();
  const [completedTasks, setCompletedTasks] = useLocalStorage<
    Record<string, string[]>
  >("dualock_tasks", {});

  const todayCompleted = completedTasks[todayKey] || [];

  const tasks: Task[] = DAILY_TASKS.map((task) => ({
    ...task,
    completed: todayCompleted.includes(task.id),
  }));

  const completeTask = (taskId: string): number => {
    if (todayCompleted.includes(taskId)) return 0;
    const task = DAILY_TASKS.find((t) => t.id === taskId);
    if (!task) return 0;

    setCompletedTasks((prev) => ({
      ...prev,
      [todayKey]: [...(prev[todayKey] || []), taskId],
    }));
    return task.xpReward;
  };

  const completedCount = todayCompleted.length;
  const totalCount = DAILY_TASKS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return { tasks, completeTask, completedCount, totalCount, progressPercent };
}
