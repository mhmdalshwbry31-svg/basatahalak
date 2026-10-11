import { Flame, Trophy, Users } from "lucide-react";
import { student } from "@/lib/data";

export function StreakCard() {
  const ring = 364.4;
  const offset = ring - (ring * student.streakDays) / 10;

  return (
    <section className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-energy to-energy-dark p-6 text-white text-center shadow-lg shadow-energy/20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.25),transparent)]" />

      <div className="relative flex size-28 items-center justify-center">
        <svg className="size-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="9"
          />
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={ring}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Flame className="size-5 text-white/90" />
          <span className="text-4xl font-extrabold leading-none tabular-nums">
            {student.streakDays}
          </span>
          <span className="text-[11px] font-semibold opacity-80">أيام متواصلة</span>
        </div>
      </div>

      <div className="relative space-y-1">
        <h3 className="text-lg font-extrabold">أنت متفوق! 🔥</h3>
        <p className="max-w-60 text-sm leading-relaxed text-white/85">
          حافظ على استمرارك لمدة 3 أيام أخرى لتحصل على وسام «المثابر».
        </p>
      </div>

      <button
        type="button"
        className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-bold text-energy-dark shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
      >
        <Users className="size-4" />
        تحدى الأصدقاء
      </button>

      <p className="relative flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
        <Trophy className="size-3.5" />
        التحدي الأسبوعي: المركز 3 من 128 طالباً
      </p>
    </section>
  );
}
