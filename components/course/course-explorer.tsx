"use client";

import { useState } from "react";
import { CheckCircle2, ChevronLeft, Lock, Medal, PlayCircle, Trophy } from "lucide-react";
import type { SubjectView } from "@/lib/data";
import { cn } from "@/lib/utils";
import { LessonRow } from "./lesson-row";

type Filter = "all" | "video" | "quiz" | "pdf";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "video", label: "الفيديوهات" },
  { id: "quiz", label: "الامتحانات" },
  { id: "pdf", label: "الملفات" },
];

export function CourseExplorer({ subject }: { subject: SubjectView }) {
  const [activeChapterId, setActiveChapterId] = useState(
    subject.chapters.find((c) => !c.locked)?.id ?? subject.chapters[0]?.id,
  );
  const [filter, setFilter] = useState<Filter>("all");

  const activeChapter =
    subject.chapters.find((c) => c.id === activeChapterId) ?? subject.chapters[0];

  const visibleLessons = (chapter: typeof activeChapter) =>
    chapter.lessons.filter(
      (l) => filter === "all" || l.type === filter,
    );

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      {/* Chapter sidebar */}
      <aside className="space-y-5 lg:sticky lg:top-24 lg:col-span-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-foreground">خريطة المنهج</h2>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
            {subject.chapters.length} أبواب
          </span>
        </div>

        <nav className="space-y-2" aria-label="أبواب المنهج">
          {subject.chapters.map((chapter) => {
            const active = chapter.id === activeChapterId;
            const completedCount = chapter.lessons.filter(
              (l) => l.status === "completed",
            ).length;
            const isDone =
              !chapter.locked &&
              chapter.lessons.length > 0 &&
              completedCount === chapter.lessons.length;

            return (
              <button
                key={chapter.id}
                type="button"
                disabled={chapter.locked}
                onClick={() => {
                  if (!chapter.locked) {
                    setActiveChapterId(chapter.id);
                    setFilter("all");
                  }
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border border-transparent p-3 text-start transition-all",
                  active
                    ? "border-s-4 border-s-primary bg-primary/5"
                    : "hover:bg-muted",
                  chapter.locked && "cursor-not-allowed opacity-50",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold",
                    active
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-surface-high text-muted-foreground",
                  )}
                >
                  {chapter.locked ? (
                    <Lock className="size-4" />
                  ) : isDone ? (
                    <CheckCircle2 className="size-4 text-success" />
                  ) : (
                    toArabicNumeral(chapter.number)
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block text-xs font-bold",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    الباب {toArabicWord(chapter.number)}
                  </span>
                  <span className="block truncate text-sm font-bold text-foreground">
                    {chapter.title}
                  </span>
                </span>
                {active && <ChevronLeft className="size-4 shrink-0 text-primary" />}
              </button>
            );
          })}
        </nav>

        {/* Weekly challenge */}
        <div className="relative overflow-hidden rounded-2xl border border-energy/25 bg-gradient-to-br from-energy/10 via-surface-low to-primary/10 p-5">
          <div className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-energy/20 blur-2xl" />
          <div className="relative space-y-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-energy/20 text-energy-dark">
              <Trophy className="size-5" />
            </span>
            <h3 className="text-base font-extrabold text-foreground">
              تحدي الأسبوع
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              أنهِ الباب الأول بـ 100% لتحصل على وسام{" "}
              <span className="font-bold text-energy-dark">«ملك الكهرباء»</span>.
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-highest">
              <div className="h-full w-3/4 rounded-full bg-energy" />
            </div>
            <p className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
              <Medal className="size-3.5 text-energy-dark" />
              تقدمك هذا الأسبوع: 75%
            </p>
          </div>
        </div>
      </aside>

      {/* Lessons content */}
      <main className="space-y-4 lg:col-span-8">
        <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="flex items-center gap-2 text-base font-extrabold text-foreground">
            <PlayCircle className="size-5 text-primary" />
            دروس الباب {toArabicWord(activeChapter.number)}: {activeChapter.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-bold transition-all",
                  filter === f.id
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-muted text-muted-foreground hover:bg-surface-high",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {visibleLessons(activeChapter).map((lesson) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              subject={subject}
              chapter={activeChapter}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function toArabicWord(n: number): string {
  const words = [
    "الأول",
    "الثاني",
    "الثالث",
    "الرابع",
    "الخامس",
    "السادس",
    "السابع",
    "الثامن",
  ];
  return words[n - 1] ?? String(n);
}

function toArabicNumeral(n: number): string {
  const numerals = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return numerals[n - 1] ?? String(n);
}
