"use client";

import Link from "next/link";
import { CalendarDays, PlayCircle, Wallet, Zap } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { student } from "@/lib/data";

function StatTile({
  icon,
  value,
  suffix,
  label,
  tone = "text-white",
}: {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  tone?: string;
}) {
  const animated = useCountUp(value, { duration: 1600 });

  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
      <span className={tone}>{icon}</span>
      <span className="text-2xl font-extrabold leading-tight tabular-nums md:text-3xl">
        {animated}
        {suffix && (
          <span className="ms-0.5 text-base font-bold">{suffix}</span>
        )}
      </span>
      <span className="text-xs font-medium opacity-80">{label}</span>
    </div>
  );
}

export function DashboardHero() {
  const firstName = student.name.split(" ")[0];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/95 to-primary-container shadow-xl shadow-primary/20">
      {/* Decorative layers */}
      <svg
        className="pointer-events-none absolute inset-0 size-full opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0 100 C 20 0 50 0 100 100" fill="transparent" stroke="white" strokeWidth="0.4" />
        <path d="M0 80 C 30 20 60 20 100 80" fill="transparent" stroke="white" strokeWidth="0.4" />
        <path d="M0 60 C 40 40 70 40 100 60" fill="transparent" stroke="white" strokeWidth="0.4" />
      </svg>
      <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-energy/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/3 size-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-8 p-6 text-white md:flex-row md:items-center md:justify-between md:gap-10 lg:p-10">
        <div className="max-w-xl space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Zap className="size-3.5 text-energy" />
            مرحباً بعودتك يا بطل
          </span>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
            أهلاً، {firstName}! 👋
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-white/85 md:text-base">
            أنت تقوم بعمل رائع هذا الأسبوع، أكملت{" "}
            <span className="font-bold text-energy">80%</span> من أهدافك
            التعليمية. استمر في التألق! 🔥
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/lesson/ph-1-2"
              className="inline-flex items-center gap-2 rounded-xl bg-energy px-5 py-2.5 text-sm font-bold text-energy-foreground shadow-lg shadow-energy/30 transition-all hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
            >
              <PlayCircle className="size-4" />
              استكمال الدرس الأخير
            </Link>
            <Link
              href="/#schedule"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <CalendarDays className="size-4" />
              عرض الجدول
            </Link>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 md:w-auto md:min-w-72 md:grid-cols-1 lg:min-w-80">
          <StatTile
            icon={<PlayCircle className="size-5" />}
            value={12}
            label="درس تم مشاهدته"
          />
          <StatTile
            icon={<Zap className="size-5 text-energy" />}
            value={85}
            suffix="%"
            label="متوسط الاختبارات"
          />
          <div className="col-span-2 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl md:col-span-1">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium opacity-80">رصيد المحفظة</span>
              <span className="text-2xl font-extrabold tabular-nums md:text-3xl">
                {student.wallet.toFixed(0)}
                <span className="ms-1 text-sm font-bold">ج.م</span>
              </span>
            </div>
            <Wallet className="size-9 text-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
