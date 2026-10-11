"use client";

import Link from "next/link";
import { CheckCircle2, ChevronLeft, Clock, FileText, ListChecks, Lock, Play } from "lucide-react";
import type { Chapter, Lesson } from "@/lib/types";
import { cn } from "@/lib/utils";

export function UpNext({
  chapter,
  currentLessonId,
}: {
  chapter: Chapter;
  currentLessonId: string;
}) {
  const lessons = chapter.lessons;

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-border/70 p-4">
        <h3 className="flex items-center gap-2 text-sm font-extrabold text-foreground">
          <Play className="size-4 text-primary" />
          الدروس في هذه الوحدة
        </h3>
        <span className="text-[11px] font-bold text-primary">
          {lessons.length} دروس
        </span>
      </div>

      <div className="space-y-1.5 p-3">
        {lessons.map((lesson) => (
          <LessonLink
            key={lesson.id}
            lesson={lesson}
            chapter={chapter}
            active={lesson.id === currentLessonId}
          />
        ))}
      </div>
    </div>
  );
}

function LessonLink({
  lesson,
  chapter,
  active,
}: {
  lesson: Lesson;
  chapter: Chapter;
  active: boolean;
}) {
  const locked = lesson.status === "locked" || chapter.locked;
  const href = lesson.type === "quiz" ? `/quiz/${lesson.id}` : `/lesson/${lesson.id}`;

  const Icon =
    lesson.type === "quiz"
      ? ListChecks
      : lesson.type === "pdf"
        ? FileText
        : lesson.status === "completed"
          ? CheckCircle2
          : Play;

  return (
    <Link
      href={locked ? "#" : href}
      onClick={(e) => {
        if (locked) {
          e.preventDefault();
          window.location.hash = "wallet-upgrade";
        }
      }}
      aria-disabled={locked}
      className={cn(
        "flex items-center gap-3 rounded-xl p-2.5 transition-all",
        active
          ? "border border-primary/25 bg-primary/5 shadow-sm"
          : locked
            ? "opacity-55 hover:bg-muted"
            : "hover:bg-muted",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          active
            ? "bg-primary text-white"
            : locked
              ? "bg-surface-high text-outline"
              : "bg-surface-high text-primary",
        )}
      >
        {locked ? <Lock className="size-3.5" /> : <Icon className="size-4" />}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-sm font-bold",
            active ? "text-primary" : "text-foreground",
          )}
        >
          {lesson.title}
        </span>
        <span className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
          {lesson.type === "quiz" ? (
            <>اختبار • {lesson.quiz?.questions} سؤال</>
          ) : lesson.type === "pdf" ? (
            <>ملف PDF</>
          ) : (
            <>
              <Clock className="size-3" />
              {lesson.duration}
            </>
          )}
        </span>
      </span>

      {active && (
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
          الحالي
        </span>
      )}
      {!locked && !active && (
        <ChevronLeft className="size-4 shrink-0 text-muted-foreground/60" />
      )}
    </Link>
  );
}
