"use client";

import { Search } from "lucide-react";
import { Logo } from "./logo";
import { GradeSwitcher } from "./grade-switcher";
import { SearchDialog } from "./search-dialog";
import { NotificationsBell } from "./notifications";
import { WalletPill } from "./wallet-pill";
import { UserMenu } from "./user-menu";
import { student } from "@/lib/data";
import { useState } from "react";

export function Header() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 lg:px-8">
        <Logo />

        <div className="hidden md:block md:ms-2">
          <GradeSwitcher />
        </div>

        <div className="hidden flex-1 justify-center lg:flex">
          <SearchDialog />
        </div>

        <div className="ms-auto flex items-center gap-2 md:gap-2.5">
          {mobileSearchOpen && (
            <div className="lg:hidden">
              <SearchDialog />
            </div>
          )}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full border border-border/80 bg-background/60 text-muted-foreground shadow-xs lg:hidden"
            aria-label="البحث"
          >
            <Search className="size-4" />
          </button>

          <WalletPill balance={student.wallet} />
          <NotificationsBell />
          <UserMenu />
        </div>
      </div>

      {/* Mobile secondary row */}
      <div className="border-t border-border/60 lg:hidden">
        <div className="mx-auto flex h-11 w-full max-w-7xl items-center gap-2 px-4">
          <GradeSwitcher />
          <span className="ms-auto text-xs font-medium text-muted-foreground">
            أهلاً، {student.name.split(" ")[0]} 👋
          </span>
        </div>
      </div>
    </header>
  );
}
