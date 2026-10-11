"use client";

import { useState } from "react";
import { Check, ChevronDown, GraduationCap } from "lucide-react";
import { grades } from "@/lib/data";
import type { GradeId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function GradeSwitcher() {
  const [gradeId, setGradeId] = useState<GradeId>("third");
  const active = grades.find((g) => g.id === gradeId)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 rounded-full border border-border/80 bg-background/60 px-3 text-sm font-semibold text-foreground shadow-xs"
        >
          <GraduationCap className="size-4 text-primary" />
          <span className="hidden sm:inline">{active.short}</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>اختر صفك الدراسي</DropdownMenuLabel>
        <DropdownMenuGroup>
          {grades.map((grade) => (
            <DropdownMenuItem
              key={grade.id}
              onClick={() => setGradeId(grade.id)}
              className="cursor-pointer"
            >
              {grade.label}
              {grade.id === gradeId && (
                <Check className="ms-auto size-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
