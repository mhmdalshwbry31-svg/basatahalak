import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  FileDown,
  FileText,
  Info,
  ListChecks,
  Lock,
  Play,
  RotateCcw,
} from "lucide-react";
import type { Chapter, Lesson } from "@/lib/types";
import type { SubjectView } from "@/lib/data";
import { cn } from "@/lib/utils";

export function LessonRow({
  lesson,
  subject,
  chapter,
}: {
  lesson: Lesson;
  subject: SubjectView;
  chapter: Chapter;
}) {
  const isLocked = lesson.status === "locked" || chapter.locked;

  if (lesson.type === "quiz") {
    return (
      <div
        className={cn(
          "group flex items-center gap-4 rounded-2xl border border-border/60 border-s-4 border-s-energy bg-white p-4 shadow-sm transition-all hover:shadow-md",
          isLocked && "cursor-not-allowed border-s-outline opacity-70",
        )}
      >
        <span className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-energy/10">
          <ListChecks className="size-8 text-energy-dark" />
        </span>

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-bold text-foreground">
            {lesson.title}
          </h4>
          {lesson.quiz && (
            <p className="text-xs font-semibold text-muted-foreground">
              {lesson.quiz.questions} سؤال • {lesson.quiz.minutes} دقيقة •{" "}
              {lesson.quiz.attempts}
            </p>
          )}
        </div>

        {isLocked ? (
          <LockedCta subject={subject} />
        ) : (
          <div className="flex shrink-0 items-center gap-3">
            {lesson.quiz?.best && (
              <div className="hidden text-end sm:block">
                <p className="text-[10px] font-semibold text-muted-foreground">
                  أفضل نتيجة
                </p>
                <p className="text-sm font-extrabold text-energy-dark tabular-nums">
                  {lesson.quiz.best}
                </p>
              </div>
            )}
            <Link
              href={`/quiz/${lesson.id}`}
              className="rounded-xl bg-energy px-4 py-2 text-xs font-bold text-energy-foreground shadow-md shadow-energy/25 transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              دخول الامتحان
            </Link>
          </div>
        )}
      </div>
    );
  }

  const isCompleted = lesson.status === "completed";

  return (
    <div
      className={cn(
        "group flex items-center gap-4 rounded-2xl border border-border/60 border-s-4 bg-white p-4 shadow-sm transition-all hover:shadow-md",
        isCompleted
          ? "border-s-success"
          : lesson.status === "current"
            ? "border-s-primary shadow-md"
            : "border-s-transparent",
        isLocked && "cursor-not-allowed border-s-outline opacity-70",
      )}
    >
      {/* Thumb */}
      <div
        className={cn(
          "relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl",
          lesson.type === "pdf"
            ? "bg-primary/10"
            : "bg-gradient-to-br from-primary to-primary/80",
        )}
      >
        {lesson.type === "pdf" ? (
          <FileText className="size-8 text-primary" />
        ) : (
          <>
            <Play
              className={cn(
                "size-8 text-white transition-transform group-hover:scale-110",
                lesson.status === "current" && "animate-pulse",
              )}
            />
            {lesson.status === "current" && (
              <span className="absolute inset-0 flex items-center justify-center bg-primary/20" />
            )}
          </>
        )}

        {lesson.type === "video" && lesson.duration && (
          <span className="absolute bottom-1 end-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white tabular-nums">
            {lesson.duration}
          </span>
        )}

        {lesson.status === "current" && (
          <span className="absolute start-1 top-1 rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
            جاري المتابعة
          </span>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {isCompleted && (
          <span className="mb-1 flex items-center gap-1 text-xs font-bold text-success">
            <CheckCircle2 className="size-3.5" />
            تم المشاهدة
          </span>
        )}
        {lesson.status === "current" && (
          <span className="mb-1 flex items-center gap-1 text-xs font-bold text-primary">
            <Play className="size-3.5" />
            الدرس الحالي
          </span>
        )}
        <h4 className="truncate text-base font-bold text-foreground">
          {lesson.title}
        </h4>
        {lesson.subtitle && (
          <p className="truncate text-xs text-muted-foreground">
            {lesson.subtitle}
          </p>
        )}
        {lesson.type === "pdf" && (
          <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-primary">
            <FileDown className="size-3.5" />
            ملف PDF قابل للتحميل
          </p>
        )}
      </div>

      {/* Actions */}
      {isLocked ? (
        <LockedCta subject={subject} />
      ) : (
        <div className="flex shrink-0 items-center gap-2">
          {lesson.type === "pdf" ? (
            <span className="hidden items-center gap-1.5 rounded-xl bg-surface-high px-3 py-2 text-xs font-bold text-foreground sm:flex">
              <FileDown className="size-3.5" />
              تحميل
            </span>
          ) : (
            <>
              {lesson.type === "video" && (
                <span className="hidden items-center gap-1 text-xs font-semibold text-muted-foreground sm:flex">
                  <Clock className="size-3.5" />
                  {lesson.duration}
                </span>
              )}
              <Link
                href={`/lesson/${lesson.id}`}
                className={cn(
                  "rounded-xl px-4 py-2 text-xs font-bold transition-all hover:-translate-y-0.5",
                  lesson.status === "current"
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-surface-high text-foreground hover:bg-primary hover:text-white",
                )}
              >
                {isCompleted ? (
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="size-3.5" />
                    إعادة
                  </span>
                ) : (
                  "ابدأ الآن"
                )}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function LockedCta({ subject }: { subject: SubjectView }) {
  return (
    <Link
      href="/wallet"
      className="group/cta flex shrink-0 flex-col items-center gap-1 rounded-xl px-2 py-2 text-center transition-colors hover:bg-muted"
      aria-label="اشترك لفتح هذا الدرس"
    >
      <Lock className="size-4 text-outline" />
      <span className="flex items-center gap-1 text-[11px] font-bold text-outline">
        <Info className="size-3" />
        يتطلب الاشتراك
      </span>
      <span className="text-[10px] font-semibold text-primary opacity-0 transition-opacity group-hover/cta:opacity-100">
        اشترك في {subject.title} الآن
      </span>
    </Link>
  );
}
