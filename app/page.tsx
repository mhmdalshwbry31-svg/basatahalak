import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { subjects, subjectToView } from "@/lib/data";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { SubjectCard } from "@/components/dashboard/subject-card";
import { AnnouncementsSection } from "@/components/dashboard/announcements";
import { ScheduleCard } from "@/components/dashboard/schedule-card";
import { StreakCard } from "@/components/dashboard/streak-card";

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-6 lg:px-8 lg:py-10">
      <DashboardHero />

      <AnnouncementsSection />

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-foreground">
            <span className="h-8 w-1.5 rounded-full bg-primary" />
            موادي الدراسية
          </h2>
          <Link
            href="/course/physics"
            className="flex items-center gap-1 text-sm font-bold text-primary hover:underline"
          >
            عرض الكل
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.slug} subject={subjectToView(subject)} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ScheduleCard />
        </div>
        <StreakCard />
      </div>
    </div>
  );
}
