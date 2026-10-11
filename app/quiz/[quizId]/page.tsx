import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, ClipboardCheck } from "lucide-react";
import { getLesson, quizQuestions, subjectToView } from "@/lib/data";
import { QuizShell } from "@/components/quiz/quiz-shell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ quizId: string }>;
}): Promise<Metadata> {
  const { quizId } = await params;
  const entry = getLesson(quizId);
  return {
    title: entry && entry.lesson.type === "quiz" ? entry.lesson.title : "اختبار تقييمي",
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const entry = getLesson(quizId);

  if (!entry) notFound();
  if (entry.lesson.type !== "quiz") redirect(`/lesson/${quizId}`);

  const { subject, chapter, lesson } = entry;
  const count = lesson.quiz?.questions ?? quizQuestions.length;
  const minutes = lesson.quiz?.minutes ?? 30;

  const questions = Array.from({ length: count }, (_, i) => {
    const base = quizQuestions[i % quizQuestions.length];
    return { ...base, id: `${base.id}-${i}` };
  });

  return (
    <div className="pb-24 lg:pb-8">
      {/* Top bar */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            الرئيسية
          </Link>
          <ChevronLeft className="size-3.5" />
          <Link href={`/course/${subject.slug}`} className="transition-colors hover:text-primary">
            {subject.title}
          </Link>
          <ChevronLeft className="size-3.5" />
          <Link
            href={`/lesson/${lesson.id}`}
            className="transition-colors hover:text-primary"
          >
            {chapter.title}
          </Link>
        </nav>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ClipboardCheck className="size-6" />
          </span>
          <div>
            <h1 className="text-lg font-extrabold text-foreground md:text-2xl">
              {lesson.title}
            </h1>
            <p className="text-xs font-semibold text-muted-foreground md:text-sm">
              {chapter.title} • {lesson.quiz?.attempts} • {lesson.quiz?.best}
            </p>
          </div>
        </div>
      </div>

      <QuizShell
        subject={subjectToView(subject)}
        chapter={chapter}
        minutes={minutes}
        questions={questions}
        quizLessonId={lesson.id}
      />
    </div>
  );
}
