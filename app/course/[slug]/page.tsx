import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { notFound } from "next/navigation";
import { getSubject, subjectToView } from "@/lib/data";
import { CourseHero } from "@/components/course/course-hero";
import { CourseExplorer } from "@/components/course/course-explorer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return {};
  return {
    title: `كورس ${subject.title} - ${subject.teacher}`,
    description: subject.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 lg:px-8 lg:py-10">
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
        <Link href="/" className="flex items-center gap-1 transition-colors hover:text-primary">
          <Home className="size-3.5" />
          الرئيسية
        </Link>
        <ChevronLeft className="size-3.5" />
        <span className="text-foreground">{subject.title}</span>
      </nav>

      <CourseHero subject={subject} />
      <CourseExplorer subject={subjectToView(subject)} />
    </div>
  );
}
