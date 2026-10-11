"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  CircleAlert,
  FileCheck2,
  Flag,
  Hourglass,
  RotateCcw,
  Send,
  Timer,
  XCircle,
} from "lucide-react";
import type { Chapter, QuizQuestion } from "@/lib/types";
import type { SubjectView } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const OPTION_LETTERS = ["أ", "ب", "ج", "د", "هـ"];

function formatClock(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function QuizShell({
  subject,
  chapter,
  minutes,
  questions,
  quizLessonId,
  onAutoSubmit,
}: {
  subject: SubjectView;
  chapter: Chapter;
  minutes: number;
  questions: QuizQuestion[];
  quizLessonId: string;
  onAutoSubmit?: () => void;
}) {
  const total = questions.length;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;

  const autoSubmitRef = useCallback(() => {
    setSubmitted(true);
    onAutoSubmit?.();
  }, [onAutoSubmit]);

  // Timer
  useEffect(() => {
    if (submitted) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          autoSubmitRef();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [submitted, autoSubmitRef]);

  const question = questions[current];
  const selected = answers[question.id];

  const selectAnswer = (index: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: index }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
  };

  const goTo = (index: number) => {
    setCurrent(Math.min(Math.max(index, 0), total - 1));
  };

  const score = useMemo(() => {
    return questions.reduce((acc, q) => {
      return answers[q.id] === q.correctIndex ? acc + 1 : acc;
    }, 0);
  }, [answers, questions]);

  const percentage = Math.round((score / total) * 100);
  const lowTime = timeLeft <= 5 * 60;

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6 py-6">
        <div
          className={cn(
            "flex flex-col items-center gap-5 rounded-3xl border p-8 text-center shadow-xl",
            percentage >= 50
              ? "border-success/30 bg-success/5"
              : "border-destructive/30 bg-destructive/5",
          )}
        >
          <span
            className={cn(
              "flex size-20 items-center justify-center rounded-full text-white shadow-lg",
              percentage >= 50 ? "bg-success" : "bg-destructive",
            )}
          >
            {percentage >= 50 ? (
              <CheckCircle2 className="size-10" />
            ) : (
              <XCircle className="size-10" />
            )}
          </span>
          <div className="space-y-1">
            <p className="text-4xl font-extrabold tabular-nums text-foreground">
              {percentage}%
            </p>
            <p className="text-sm font-semibold text-muted-foreground">
              {percentage >= 50 ? "أداء رائع، واصل التألق! 🎉" : "لا بأس، أعد المحاولة لتتفوق!"}
            </p>
          </div>

          <div className="grid w-full max-w-sm grid-cols-3 gap-3">
            <ResultStat
              icon={<CheckCircle2 className="size-4 text-success" />}
              label="إجابات صحيحة"
              value={score}
            />
            <ResultStat
              icon={<XCircle className="size-4 text-destructive" />}
              label="إجابات خاطئة"
              value={total - score - (total - Object.keys(answers).length)}
            />
            <ResultStat
              icon={<Hourglass className="size-4 text-primary" />}
              label="الوقت المستغرق"
              value={`${formatClock(minutes * 60 - timeLeft)}`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setFlagged(new Set());
                setCurrent(0);
                setTimeLeft(minutes * 60);
              }}
              className="gap-2"
            >
              <RotateCcw className="size-4" />
              إعادة الاختبار
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/lesson/${quizLessonId}`}>العودة للدرس</Link>
            </Button>
          </div>
        </div>

        {/* Review */}
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-extrabold text-foreground">
            <FileCheck2 className="size-5 text-primary" />
            مراجعة الإجابات
          </h3>
          {questions.map((q, idx) => {
            const user = answers[q.id];
            const correct = user === q.correctIndex;
            return (
              <div
                key={q.id}
                className={cn(
                  "rounded-2xl border p-4",
                  correct
                    ? "border-success/30 bg-success/5"
                    : user === undefined
                      ? "border-border/60 bg-surface-low/40"
                      : "border-destructive/30 bg-destructive/5",
                )}
              >
                <p className="text-sm font-bold text-foreground">
                  {idx + 1}. {q.statement}
                </p>
                <div className="mt-2 space-y-1 text-xs font-semibold">
                  <p
                    className={cn(
                      "flex items-center gap-1.5",
                      user !== undefined && correct ? "text-success" : "text-muted-foreground",
                    )}
                  >
                    <CheckCircle2 className="size-3.5" />
                    إجابتك: {user !== undefined ? OPTION_LETTERS[user] : "لم تجب"} — {q.options[user] ?? ""}
                  </p>
                  {user !== q.correctIndex && (
                    <p className="flex items-center gap-1.5 text-success">
                      <CircleAlert className="size-3.5" />
                      الإجابة الصحيحة: {OPTION_LETTERS[q.correctIndex]} — {q.options[q.correctIndex]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 px-4 py-6 lg:px-8">
      {/* Sticky header */}
      <div className="sticky top-16 z-30 -mx-4 space-y-3 border-b border-border/70 bg-background/95 px-4 py-3 backdrop-blur-md lg:top-[4.5rem]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
              {subject.title} • {chapter.title}
            </p>
            <h2 className="text-base font-extrabold text-foreground sm:text-lg">
              السؤال{" "}
              <span className="text-primary tabular-nums">
                {(current + 1).toString().padStart(2, "0")}
              </span>
              <span className="mx-1.5 text-border">/</span>
              <span className="text-muted-foreground tabular-nums">
                {total.toString().padStart(2, "0")}
              </span>
            </h2>
          </div>

          <div
            className={cn(
              "flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-border",
              lowTime && "ring-destructive/40",
            )}
          >
            <div className="flex flex-col items-end leading-none">
              <span className="text-[10px] font-semibold text-muted-foreground">
                الوقت المتبقي
              </span>
              <span
                className={cn(
                  "text-lg font-extrabold tabular-nums",
                  lowTime ? "text-destructive animate-pulse" : "text-foreground",
                )}
              >
                {formatClock(timeLeft)}
              </span>
            </div>
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-full",
                lowTime ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary",
              )}
            >
              <Timer className="size-5" />
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-surface-high">
          <div
            className="absolute inset-y-0 right-0 flex items-center justify-end rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          >
            <span className="-me-1 h-full w-3 rounded-full bg-white/30 blur-[2px]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Question */}
        <div className="space-y-4 lg:col-span-8">
          <div className="rounded-3xl border border-border/60 bg-white p-6 shadow-lg shadow-primary/5 transition-all duration-500 hover:border-primary/15 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <span className="size-2 rounded-full bg-energy" />
                  {question.hint}
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={toggleFlag}
                  className={cn(
                    "rounded-full",
                    flagged.has(question.id) && "bg-energy/15 text-energy-dark",
                  )}
                  aria-label="وضع علامة"
                >
                  <Flag
                    className={cn(
                      "size-4",
                      flagged.has(question.id) && "fill-energy text-energy-dark",
                    )}
                  />
                </Button>
              </div>

              <h3 className="text-lg font-extrabold leading-relaxed text-foreground md:text-xl">
                {question.statement}
              </h3>

              {/* Decorative diagram */}
              {current === 0 && (
                <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-primary/30 bg-gradient-to-br from-primary/5 via-surface-low to-energy/10">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Bookmark className="size-10 text-primary/40" />
                    <p className="text-xs font-semibold text-muted-foreground">
                      الشكل التوضيحي للسؤال (دائرة كهربية)
                    </p>
                  </div>
                  <span className="absolute end-3 bottom-3 rounded-lg bg-white/80 px-2 py-1 text-[10px] font-bold text-muted-foreground backdrop-blur">
                    اضغط للتكبير
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {question.options.map((option, index) => {
                const isSelected = selected === index;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectAnswer(index)}
                    className={cn(
                      "group relative flex items-center gap-3 overflow-hidden rounded-2xl border-2 bg-surface-low/60 p-4 text-start transition-all duration-200",
                      isSelected
                        ? "border-primary bg-white shadow-lg shadow-primary/10"
                        : "border-transparent hover:border-primary/25 hover:bg-white",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl text-base font-extrabold shadow-sm transition-colors",
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-white text-muted-foreground group-hover:text-primary",
                      )}
                    >
                      {OPTION_LETTERS[index]}
                    </span>
                    <span className="text-sm font-bold text-foreground md:text-base">
                      {option}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="absolute end-3 top-1/2 size-5 -translate-y-1/2 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation footer */}
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              size="default"
              className="gap-2"
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
            >
              <ArrowRight className="size-4" />
              السابق
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  if (current === total - 1) setSubmitOpen(true);
                  else goTo(current + 1);
                }}
              >
                {current === total - 1 ? "عرض النتيجة" : "التالي"}
                <ArrowLeft className="size-4" />
              </Button>
              <Button className="gap-2 bg-energy text-energy-foreground shadow-lg shadow-energy/25 hover:bg-energy/90">
                <Send className="size-4" />
                تأكيد الإجابة
              </Button>
            </div>
          </div>
        </div>

        {/* Navigator */}
        <div className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-44 space-y-5 rounded-3xl border border-border/60 bg-white p-5 shadow-md">
            <h3 className="text-base font-extrabold text-foreground">خريطة الأسئلة</h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const answered = answers[q.id] !== undefined;
                const isFlagged = flagged.has(q.id);
                const active = index === current;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => goTo(index)}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-xl text-xs font-extrabold transition-all",
                      active
                        ? "bg-primary text-white shadow-md ring-2 ring-primary/30"
                        : answered
                          ? "bg-primary/70 text-white hover:opacity-85"
                          : isFlagged
                            ? "border-2 border-energy bg-energy/10 text-energy-dark"
                            : "bg-surface text-muted-foreground hover:bg-surface-high",
                    )}
                    aria-label={`السؤال ${index + 1}`}
                  >
                    {isFlagged ? <Flag className="size-3.5" /> : index + 1}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2.5 border-t border-border/70 pt-4 text-xs font-semibold">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>الأسئلة المحلولة</span>
                <span className="font-extrabold text-primary tabular-nums">
                  {answeredCount} / {total}
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>الوقت المنقضي</span>
                <span className="font-extrabold text-foreground tabular-nums">
                  {formatClock(minutes * 60 - timeLeft)}
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>أسئلة معلّمة</span>
                <span className="font-extrabold text-energy-dark tabular-nums">
                  {flagged.size}
                </span>
              </div>

              <Button
                className="mt-2 w-full gap-2 bg-energy text-energy-foreground shadow-lg shadow-energy/25 hover:bg-energy/90"
                onClick={() => setSubmitOpen(true)}
              >
                <Send className="size-4" />
                إنهاء وتسليم الامتحان
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile submit bar */}
      <div className="fixed inset-x-0 bottom-14 z-30 border-t border-border/70 bg-background/95 p-3 backdrop-blur-lg lg:hidden">
        <Button
          className="w-full gap-2 bg-energy text-energy-foreground shadow-lg shadow-energy/25"
          onClick={() => setSubmitOpen(true)}
        >
          <Send className="size-4" />
          إنهاء وتسليم الامتحان ({answeredCount}/{total})
        </Button>
      </div>

      {/* Submit confirmation */}
      <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <DialogContent className="max-w-md text-center sm:max-w-lg">
          <DialogHeader className="items-center gap-3 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-energy/15 text-energy-dark">
              <CircleAlert className="size-10" />
            </span>
            <DialogTitle className="text-xl font-extrabold">
              هل أنت متأكد من التسليم؟
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              لقد أجبت على{" "}
              <span className="font-extrabold text-primary">{answeredCount}</span>{" "}
              أسئلة فقط من أصل{" "}
              <span className="font-extrabold text-foreground">{total}</span>. بمجرد
              التسليم، لن تتمكن من العودة لتعديل إجاباتك.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={() => setSubmitOpen(false)}>
              تراجع ومتابعة
            </Button>
            <Button
              onClick={() => {
                setSubmitOpen(false);
                setSubmitted(true);
              }}
            >
              نعم، قم بالتسليم
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ResultStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-border/60 bg-white p-4 shadow-sm">
      {icon}
      <span className="text-xl font-extrabold tabular-nums text-foreground">{value}</span>
      <span className="text-[11px] font-semibold text-muted-foreground">{label}</span>
    </div>
  );
}
