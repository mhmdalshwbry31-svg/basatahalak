"use client";

import Link from "next/link";
import { ArrowLeft, BookOpenCheck } from "lucide-react";
import type { SubjectView } from "@/lib/data";
import { accentMap, subjectIcons } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SubjectCard({ subject }: { subject: SubjectView }) {
  const accent = accentMap[subject.accent];
  const Icon = subjectIcons[subject.slug];

  return (
    <Link
      href={`/course/${subject.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-xl hover:shadow-primary/5"
    >
      <div
        className={cn(
          "pointer-events-none absolute -bottom-10 -start-8 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20",
          accent.iconBg,
        )}
      />

      <div className="mb-4 flex items-start justify-between">
        <span
          className={cn(
            "flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
            accent.iconBg,
          )}
        >
          <Icon className={cn("size-7", accent.iconColor)} />
        </span>
        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
          {subject.level}
        </span>
      </div>

      <h3 className="text-lg font-extrabold tracking-tight text-foreground">
        {subject.title}
      </h3>
      <p className="mt-0.5 text-sm font-medium text-muted-foreground">
        {subject.teacher}
      </p>
      <p className="mt-1 text-xs text-muted-foreground/80">
        {subject.lessonsCount} درس • {subject.hours} ساعة تدريبية
      </p>

      <div className="mt-5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-muted-foreground">التقدم</span>
          <span className={cn("tabular-nums", accent.iconColor)}>
            {subject.progress}%
          </span>
        </div>
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "relative h-full rounded-full transition-all duration-1000 ease-out",
              accent.bar,
            )}
            style={{ width: `${subject.progress}%` }}
          >
            <span className="absolute inset-y-0 right-1 top-0 w-3 rounded-full bg-white/30 blur-[1px]" />
          </div>
        </div>
      </div>

      <span
        className={cn(
          "mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-muted py-2.5 text-sm font-bold text-foreground transition-all duration-300 group-hover:text-white",
          "group-hover:bg-primary",
        )}
      >
        <BookOpenCheck className="size-4" />
        استكمال التعلم
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
      </span>
    </Link>
  );
}
