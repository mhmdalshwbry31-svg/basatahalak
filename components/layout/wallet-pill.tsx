"use client";

import Link from "next/link";
import { Plus, Wallet } from "lucide-react";

export function WalletPill({ balance = 150 }: { balance?: number }) {
  return (
    <Link
      href="/wallet"
      className="group relative flex h-9 items-center gap-2 overflow-hidden rounded-full border border-energy/25 bg-gradient-to-l from-energy/10 to-transparent ps-3 pe-1.5 shadow-xs transition-all hover:border-energy/50 hover:shadow-md"
      aria-label={`رصيد المحفظة ${balance} جنيه`}
    >
      <span className="flex items-center gap-1.5 text-sm font-bold text-energy-dark">
        <Wallet className="size-4" />
        <span className="tabular-nums">{balance.toFixed(0)}</span>
        <span className="text-[11px] font-semibold text-energy-dark/70">ج.م</span>
      </span>
      <span className="flex size-5 items-center justify-center rounded-full bg-energy text-energy-foreground shadow-sm transition-transform group-hover:rotate-90">
        <Plus className="size-3.5" />
      </span>
    </Link>
  );
}
