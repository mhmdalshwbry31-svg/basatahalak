"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { subjects } from "@/lib/data";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex h-9 w-full max-w-sm cursor-text items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3.5 text-sm text-muted-foreground shadow-xs transition-all hover:border-primary/40 hover:bg-white focus-visible:outline-none"
        aria-label="البحث في المنصة"
      >
        <Search className="size-4 text-muted-foreground" />
        <span className="flex-1 truncate text-start">ابحث عن مادة أو معلم...</span>
        <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          /
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} title="البحث في بسطتهالك">
        <Command className="rounded-xl">
          <CommandInput placeholder="ابحث عن مادة أو معلم..." autoFocus />
          <CommandList>
            <CommandEmpty>لا توجد نتائج مطابقة.</CommandEmpty>
            <CommandGroup heading="المواد الدراسية">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <CommandItem
                    key={subject.slug}
                    className="cursor-pointer"
                    onSelect={() => {
                      router.push(`/course/${subject.slug}`);
                      setOpen(false);
                    }}
                  >
                    <Icon className="size-4 text-primary" />
                    <span>{subject.title}</span>
                    <span className="ms-auto text-xs text-muted-foreground">
                      {subject.teacher}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandGroup heading="المعلمون">
              {subjects.map((subject) => (
                <CommandItem
                  key={`teacher-${subject.slug}`}
                  className="cursor-pointer"
                  onSelect={() => {
                    router.push(`/course/${subject.slug}`);
                    setOpen(false);
                  }}
                >
                  <span>{subject.teacher}</span>
                  <span className="ms-auto text-xs text-muted-foreground">
                    مادة {subject.title}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
