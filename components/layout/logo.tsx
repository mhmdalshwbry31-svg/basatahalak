import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex shrink-0 items-center gap-2.5", className)}
      aria-label="بسطتهالك - الصفحة الرئيسية"
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-container shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
        <GraduationCap className="size-5 text-white" />
        <span className="absolute -end-2 -top-2 size-5 rounded-full bg-energy/80 blur-[6px]" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            بسطتهالك
          </span>
          <span className="mt-1 text-[10px] font-medium text-muted-foreground">
            منصة الثانوية العامة
          </span>
        </span>
      )}
    </Link>
  );
}
