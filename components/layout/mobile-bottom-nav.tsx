"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PenLine, User, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/course/physics", label: "دروسي", icon: PenLine },
  { href: "/quiz/physics-ch1", label: "امتحانات", icon: PenLine },
  { href: "/wallet", label: "المحفظة", icon: Wallet },
  { href: "/wallet", label: "حسابي", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="التنقل السريع"
    >
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" />
              )}
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
