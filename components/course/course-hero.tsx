import Link from "next/link";
import { Award, PlayCircle } from "lucide-react";
import type { Subject } from "@/lib/types";
import { accentMap } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CourseHero({ subject }: { subject: Subject }) {
  const accent = accentMap[subject.accent];
  const Icon = subject.icon;
  const circumference = 2 * Math.PI * 88;
  const offset = circumference - (circumference * subject.progress) / 100;

  const continueLesson =
    subject.chapters
      .flatMap((c) => c.lessons)
      .find((l) => l.status === "current" || l.status === "available") ?? null;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70 border-s-8 border-s-primary bg-white shadow-sm">
      <div className="pointer-events-none absolute -end-16 -top-16 size-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 right-1/4 size-48 rounded-full bg-energy/10 blur-2xl" />

      <div className="relative flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:gap-12 lg:p-10">
        <div className="flex-1 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              المادة الأساسية
            </span>
            <span className="size-1.5 rounded-full bg-border" />
            <span className="text-xs font-semibold text-muted-foreground">
              {subject.lessonsCount} درس • {subject.hours} ساعة تدريبية
            </span>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold",
                accent.iconBg,
                accent.iconColor,
              )}
            >
              {subject.level}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-14 items-center justify-center rounded-2xl",
                accent.iconBg,
              )}
            >
              <Icon className={cn("size-7", accent.iconColor)} />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-4xl">
                {subject.title} للثانوية العامة
              </h1>
              <p className="text-sm font-semibold text-muted-foreground">
                {subject.teacher}
              </p>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {subject.description}
          </p>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-border/70 bg-surface-low/50 p-3">
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-full text-sm font-extrabold text-white shadow",
                accent.solid,
              )}
            >
              {subject.teacher.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">{subject.teacher}</p>
              <p className="text-xs text-muted-foreground">{subject.teacherTitle}</p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-4 lg:w-72">
          <div className="relative flex size-44 items-center justify-center">
            <svg className="size-full -rotate-90" viewBox="0 0 192 192">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="var(--color-surface-highest)"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold tabular-nums text-primary">
                {subject.progress}%
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                تم الإنجاز
              </span>
            </div>
          </div>

          {continueLesson && (
            <Link
              href={`/lesson/${continueLesson.id}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0"
            >
              <PlayCircle className="size-4" />
              استكمال التعلم
            </Link>
          )}

          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Award className="size-4 text-energy-dark" />
            احصل على شهادة إتمام عند 100%
          </p>
        </div>
      </div>
    </section>
  );
}
