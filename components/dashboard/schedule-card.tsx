"use client";

import { useState } from "react";
import { Check, ListTodo } from "lucide-react";
import { schedule } from "@/lib/data";
import { accentMap } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ScheduleCard() {
  const [tasks, setTasks] = useState(schedule);
  const doneCount = tasks.filter((t) => t.done).length;

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  return (
    <section
      id="schedule"
      className="flex scroll-mt-28 flex-col rounded-3xl border border-border/60 bg-white p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-foreground">
          <span className="h-7 w-1.5 rounded-full bg-primary" />
          جدول المهام اليومية
        </h2>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          اليوم، 12 أكتوبر
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const accent = accentMap[task.tone];
          return (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-4 rounded-2xl border border-border/60 bg-surface-low/50 p-4 transition-all",
                task.done && "opacity-55",
              )}
            >
              <div className="flex w-14 shrink-0 flex-col items-center leading-tight">
                <span className="text-sm font-extrabold text-foreground tabular-nums">
                  {task.time}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {task.period}
                </span>
              </div>
              <span
                className={cn(
                  "h-10 w-0.5 shrink-0 rounded-full",
                  task.done ? "bg-success/60" : accent.bar,
                )}
              />
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "truncate text-sm font-bold text-foreground",
                    task.done && "line-through",
                  )}
                >
                  {task.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {task.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggle(task.id)}
                aria-label={task.done ? "إلغاء الإنجاز" : "تم الإنجاز"}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  task.done
                    ? "border-success bg-success text-white"
                    : cn("border-border text-transparent hover:border-primary/60", accent.iconColor),
                )}
              >
                <Check className="size-4" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-4 text-xs font-semibold text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ListTodo className="size-4 text-primary" />
          أنجزت {doneCount} من {tasks.length} مهام
        </span>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${(doneCount / tasks.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
