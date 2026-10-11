"use client";

import { useRef } from "react";
import { Bell, ChevronLeft, ChevronRight, Clock, Radio } from "lucide-react";
import { announcements } from "@/lib/data";
import { accentMap } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AnnouncementsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-foreground">
          <span className="h-8 w-1.5 rounded-full bg-energy" />
          آخر التحديثات
        </h2>
        <div className="hidden gap-2 sm:flex">
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={() => scroll(1)}
            aria-label="التالي"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={() => scroll(-1)}
            aria-label="السابق"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {announcements.map((ann) => {
          const accent = accentMap[ann.tagTone];
          const Icon = ann.tag.includes("بث") ? Radio : Bell;
          return (
            <article
              key={ann.id}
              className="group relative flex min-w-[min(88vw,22rem)] max-w-[22rem] snap-start items-center gap-4 overflow-hidden rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg sm:min-w-[24rem]"
            >
              <div
                className={cn(
                  "pointer-events-none absolute -bottom-10 -end-10 size-28 rounded-full opacity-10 blur-2xl transition-transform duration-500 group-hover:scale-150",
                  accent.solid,
                )}
              />
              <span
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg",
                  accent.solid,
                )}
              >
                <Icon className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <span
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-wider",
                    accent.iconColor,
                  )}
                >
                  {ann.tag}
                </span>
                <h3 className="mt-0.5 truncate text-base font-bold text-foreground">
                  {ann.title}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                  {ann.description}
                </p>
                <span className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground/80">
                  <Clock className="size-3" />
                  {ann.time}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
