import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ChevronLeft, Home, Lock, PlayCircle, Star, Trophy } from "lucide-react";
import { getLesson, student, subjects } from "@/lib/data";
import { VideoPlayer } from "@/components/player/video-player";
import { LessonActions } from "@/components/player/lesson-actions";
import { AskTeacher } from "@/components/player/ask-teacher";
import { UpNext } from "@/components/player/up-next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLesson(slug);
  return { title: entry ? entry.lesson.title : "درس" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getLesson(slug);

  if (!entry) notFound();
  if (entry.lesson.type === "quiz") redirect(`/quiz/${slug}`);

  const { subject, chapter, lesson, next } = entry;
  const firstQuiz = chapter.lessons.find((l) => l.type === "quiz");

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 lg:px-8 lg:py-8">
      {/* Breadcrumb + progress */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Link href="/" className="flex items-center gap-1 transition-colors hover:text-primary">
            <Home className="size-3.5" />
            الرئيسية
          </Link>
          <ChevronLeft className="size-3.5" />
          <Link href={`/course/${subject.slug}`} className="transition-colors hover:text-primary">
            {subject.title}
          </Link>
          <ChevronLeft className="size-3.5" />
          <span className="text-foreground">{chapter.title}</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[11px] font-semibold text-muted-foreground">
              نسبة الإنجاز في {subject.title}
            </span>
            <div className="relative h-2 w-36 overflow-hidden rounded-full bg-muted sm:w-44">
              <div
                className="absolute inset-y-0 right-0 flex items-center justify-end rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${subject.progress}%` }}
              >
                <span className="size-2 rounded-full bg-energy shadow-[0_0_8px_rgba(254,166,25,0.9)]" />
              </div>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-xl border border-border/70 bg-white px-3 py-2 text-sm font-bold text-foreground shadow-sm">
            <Star className="size-4 fill-energy text-energy" />
            +50 نقطة
          </span>
        </div>
      </div>

      <h1 className="text-xl font-extrabold tracking-tight text-foreground md:text-3xl">
        {lesson.title}
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Video column */}
        <div className="space-y-4 lg:col-span-8">
          <VideoPlayer
            studentName={student.name}
            studentPhone={student.phone}
            posterLabel={lesson.title}
          />

          <LessonActions
            pdfTitle="الدرس"
            quizHref={firstQuiz ? `/quiz/${firstQuiz.id}` : undefined}
            shareText={`شاهد ${lesson.title} مع ${subject.teacher} على بسطتهالك`}
          />

          {/* Next lesson */}
          {next ? (
            <Link
              href={
                next.status === "locked"
                  ? "/wallet"
                  : next.type === "quiz"
                    ? `/quiz/${next.id}`
                    : `/lesson/${next.id}`
              }
              className="group flex items-center gap-4 rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:border-primary/25 hover:shadow-md"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                {next.status === "locked" ? (
                  <Lock className="size-5" />
                ) : (
                  <PlayCircle className="size-6" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {next.status === "locked" ? "محتوى مقفل" : "الدرس التالي"}
                </p>
                <p className="truncate text-sm font-bold text-foreground">
                  {next.title}
                </p>
                {next.status === "locked" && (
                  <p className="text-xs font-semibold text-primary">
                    فعّل اشتراكك لمتابعة التعلم
                  </p>
                )}
              </div>
              <ArrowLeft className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" />
            </Link>
          ) : (
            <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-br from-energy to-energy-dark p-5 text-white shadow-lg shadow-energy/20">
              <Trophy className="size-9" />
              <div>
                <p className="text-base font-extrabold">أكملت جميع دروس هذه الوحدة! 🎉</p>
                <p className="text-sm text-white/85">
                  تقدم الآن إلى اختبار تقييمي لتعزيز ما تعلمته.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5 lg:col-span-4">
          <AskTeacher />
          <UpNext chapter={chapter} currentLessonId={lesson.id} />
        </div>
      </div>

      {/* Footer nav strip */}
      <div className="flex items-center justify-between border-t border-border/70 pt-5 text-xs font-semibold text-muted-foreground">
        <span>
          {subject.lessonsCount} درس متاح في مادة {subject.title}
        </span>
        <span className="flex items-center gap-1">
          <Star className="size-3.5 fill-energy text-energy" />
          {subjects.length} مواد في حسابك
        </span>
      </div>
    </div>
  );
}
