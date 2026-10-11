"use client";

import { useState } from "react";
import { Bell, CheckCheck, Flame, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Accent } from "@/lib/types";
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

const toneIcon: Record<Accent, typeof Bell> = {
  blue: Wallet,
  orange: Flame,
  green: ShieldCheck,
  violet: Sparkles,
  rose: Sparkles,
  teal: Sparkles,
};

export function NotificationsBell() {
  const [items, setItems] = useState(notifications);
  const unread = items.filter((n) => !n.read).length;

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative rounded-full border border-border/80 bg-background/60 shadow-xs"
          aria-label="الإشعارات"
        >
          <Bell className="size-4" />
          {unread > 0 && (
            <span className="absolute -end-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white ring-2 ring-background">
              {unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[min(92vw,22rem)]">
        <DropdownMenuLabel className="flex items-center justify-between pe-2">
          <span>الإشعارات</span>
          <button
            type="button"
            onClick={markAllRead}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <CheckCheck className="size-3.5" />
            قراءة الكل
          </button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-1 p-1">
          {items.map((item) => {
            const Icon = toneIcon[item.tone];
            return (
              <DropdownMenuItem
                key={item.id}
                className={cn(
                  "cursor-pointer items-start gap-2.5 rounded-lg px-2 py-2",
                  !item.read && "bg-primary/5",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
                    !item.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    {item.title}
                    {!item.read && (
                      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                    )}
                  </span>
                  <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                  <span className="text-[11px] text-muted-foreground/80">
                    {item.time}
                  </span>
                </span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center cursor-pointer text-center text-sm font-medium text-primary">
          عرض كل الإشعارات
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
