import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { student } from "@/lib/data";
import { WalletDashboard } from "@/components/wallet/wallet-dashboard";

export const metadata: Metadata = {
  title: "المحفظة والاشتراكات",
};

export default function WalletPage() {
  return (
    <div className="pb-24 lg:pb-8">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Home className="size-3.5" />
            الرئيسية
          </Link>
          <ChevronLeft className="size-3.5" />
          <span className="text-foreground">المحفظة والاشتراكات</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <span className="text-lg font-extrabold">{student.initials}</span>
          </span>
          <div>
            <h1 className="text-lg font-extrabold text-foreground md:text-2xl">
              أهلاً {student.name.split(" ")[0]} 👋
            </h1>
            <p className="text-xs font-semibold text-muted-foreground md:text-sm">
              إدارة رصيدك واشتراكاتك في مكان واحد
            </p>
          </div>
        </div>
      </div>

      <WalletDashboard initialBalance={student.wallet} />
    </div>
  );
}
