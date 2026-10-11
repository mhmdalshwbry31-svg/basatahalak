"use client";

import Link from "next/link";
import { BookOpen, LogOut, Settings, User } from "lucide-react";
import { student } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-border/80 bg-background/60 shadow-xs p-0"
          aria-label="حسابي"
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-container text-sm font-bold text-white">
              {student.initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-foreground">{student.name}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {student.grade.label}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/wallet">
              <User className="size-4" />
              حسابي
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/course/physics">
              <BookOpen className="size-4" />
              دروسي
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="size-4" />
            الإعدادات
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" className="cursor-pointer">
          <LogOut className="size-4" />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
