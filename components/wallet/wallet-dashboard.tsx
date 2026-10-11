"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  Gift,
  Landmark,
  Loader2,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Ticket,
  Wallet as WalletIcon,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import {
  accentMap,
  paymentMethods,
  rechargeAmounts,
  transactions,
} from "@/lib/data";
import type { Accent, PaymentMethod } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function formatCardInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, 14).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function toneClasses(tone: Accent) {
  const map = accentMap[tone];
  return {
    bg: map.iconBg,
    color: map.iconColor,
  };
}

export function WalletDashboard({ initialBalance }: { initialBalance: number }) {
  const [balance, setBalance] = useState(initialBalance);
  const [cardCode, setCardCode] = useState("");
  const [amount, setAmount] = useState(rechargeAmounts[1]);
  const [method, setMethod] = useState<PaymentMethod["id"]>("fawry");
  const [tab, setTab] = useState("card");
  const [processing, setProcessing] = useState(false);

  const digits = useMemo(() => cardCode.replace(/\s/g, ""), [cardCode]);
  const cardValid = digits.length === 14 && /^[0-9]+$/.test(digits);

  const handleCardRecharge = () => {
    if (!cardValid) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      const value = 100;
      setBalance((b) => b + value);
      setCardCode("");
      toast.success(`تم شحن ${value} ج.م بنجاح إلى محفظتك 🎉`, {
        description: "كارت بسطتهالك شُحن بنجاح.",
      });
    }, 1200);
  };

  const handleDirectRecharge = () => {
    if (amount <= 0) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setBalance((b) => b + amount);
      toast.success(`طلب دفع ${amount} ج.م قيد التنفيذ`, {
        description: `الدفع عبر ${paymentMethods.find((m) => m.id === method)?.title} يرجى إتمام التحويل.`,
      });
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 lg:px-8">
      {/* Balance hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[#0a4bb5] to-[#08398f] p-6 text-white shadow-xl shadow-primary/20 md:p-8">
        <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 size-48 rounded-full bg-energy/30 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
              <WalletIcon className="size-4 text-energy" />
              رصيد محفظة بسطتهالك
            </div>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-extrabold tabular-nums tracking-tight md:text-6xl">
                {balance.toFixed(2)}
              </span>
              <span className="mb-1.5 text-lg font-bold text-white/70">ج.م</span>
            </div>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-white/70">
              <ShieldCheck className="size-3.5 text-energy" />
              محفظة آمنة ومضمونة — تُستخدم للاشتراك في المواد والدورات
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Button
              variant="outline"
              className="gap-2 rounded-2xl border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              onClick={() => setTab("card")}
            >
              <Ticket className="size-4" />
              شحن بكارت
            </Button>
            <Button
              className="gap-2 rounded-2xl bg-energy text-energy-foreground shadow-lg shadow-energy/30 hover:bg-energy/90"
              onClick={() => setTab("direct")}
            >
              <Zap className="size-4" />
              اشحن الآن
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Recharge */}
        <section className="lg:col-span-7">
          <Tabs value={tab} onValueChange={setTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 rounded-2xl p-1">
              <TabsTrigger value="card" className="gap-2 rounded-xl">
                <Ticket className="size-4" />
                كارت بسطتهالك
              </TabsTrigger>
              <TabsTrigger value="direct" className="gap-2 rounded-xl">
                <Zap className="size-4" />
                شحن مباشر
              </TabsTrigger>
              <TabsTrigger value="gift" className="gap-2 rounded-xl">
                <Gift className="size-4" />
                إهداء
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card">
              <div className="space-y-4 rounded-3xl border border-border/60 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-foreground">شحن بكارت الشحن</h3>
                    <p className="text-xs font-semibold text-muted-foreground">
                      كشط الطبقة الفضية وأدخل الرقم السري المكون من 14 رقمًا.
                    </p>
                  </div>
                  <Badge className="gap-1 rounded-full bg-primary/10 text-primary">
                    <Sparkles className="size-3" />
                    فوري
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Input
                    dir="ltr"
                    value={cardCode}
                    onChange={(e) => setCardCode(formatCardInput(e.target.value))}
                    placeholder="XXXX XXXX XXXX XX"
                    inputMode="numeric"
                    className="h-14 text-center font-mono text-lg font-bold tracking-[0.3em] shadow-inner"
                  />
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span
                      className={cn(
                        cardValid
                          ? "text-success"
                          : "text-muted-foreground",
                      )}
                    >
                      {cardValid
                        ? "✓ كارت صالح للشحن"
                        : `أدخل ${digits.length}/14 رقمًا متبقيًا`}
                    </span>
                    <span className="text-muted-foreground">مثال: 4589 2311 9980 12</span>
                  </div>
                </div>

                <Button
                  className="w-full gap-2 rounded-2xl bg-energy text-energy-foreground shadow-lg shadow-energy/25 hover:bg-energy/90 disabled:opacity-50"
                  size="lg"
                  disabled={!cardValid || processing}
                  onClick={handleCardRecharge}
                >
                  {processing ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="size-5" />
                  )}
                  {processing ? "جاري الشحن..." : "شحن الكارت الآن"}
                </Button>

                <div className="rounded-2xl border border-border/60 bg-surface-low/60 p-4 text-xs font-semibold text-muted-foreground">
                  <p className="mb-1 flex items-center gap-1.5 text-foreground">
                    <QrCode className="size-4 text-primary" />
                    من أين تحصل على كارت الشحن؟
                  </p>
                  كروت بسطتهالك متوفرة لدى جميع الموزعين المعتمدين ومكاتب البريد، بقيم 50 / 100 / 200 / 500 ج.م.
                </div>
              </div>
            </TabsContent>

            <TabsContent value="direct">
              <div className="space-y-4 rounded-3xl border border-border/60 bg-white p-6 shadow-sm">
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">اختر القيمة</h3>
                  <p className="text-xs font-semibold text-muted-foreground">
                    سيتم إضافة الرصيد إلى محفظتك فور إتمام التحويل.
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {rechargeAmounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value)}
                      className={cn(
                        "flex flex-col items-center gap-0.5 rounded-2xl border-2 py-3 transition-all",
                        amount === value
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-border/70 bg-white hover:border-primary/30",
                      )}
                    >
                      <span className="text-base font-extrabold tabular-nums text-foreground">
                        {value}
                      </span>
                      <span className="text-[10px] font-semibold text-muted-foreground">ج.م</span>
                    </button>
                  ))}
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold text-muted-foreground">
                    وسيلة الدفع
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {paymentMethods.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 transition-all",
                          method === m.id
                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                            : "border-border/70 bg-white hover:border-primary/30",
                        )}
                      >
                        <MethodIcon id={m.id} />
                        <span className="text-xs font-extrabold text-foreground">{m.title}</span>
                        <span className="text-[10px] font-semibold text-muted-foreground">
                          {m.subtitle}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2 rounded-2xl bg-energy text-energy-foreground shadow-lg shadow-energy/25 hover:bg-energy/90"
                  disabled={processing}
                  onClick={handleDirectRecharge}
                >
                  {processing ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <CreditCard className="size-5" />
                  )}
                  {processing ? "جاري تجهيز الدفع..." : `ادفع ${amount} ج.م`}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="gift">
              <div className="space-y-4 rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center">
                <Gift className="mx-auto size-12 text-primary" />
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">أهدِ التعلم لمن تحب</h3>
                  <p className="mx-auto max-w-md text-sm font-semibold text-muted-foreground">
                    اشترِ كارت شحن أو باقة دروس كهدية لصديقك، وسيتم إرسالها إليه فورًا عبر واتساب.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button className="gap-2 rounded-2xl">
                    <Gift className="size-4" />
                    اشترِ كارت هدية
                  </Button>
                  <Button variant="outline" className="gap-2 rounded-2xl">
                    <Smartphone className="size-4" />
                    إهداء عبر واتساب
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Current plan */}
        <section className="lg:col-span-5">
          <div className="rounded-3xl border border-border/60 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-foreground">
                <BadgeCheck className="size-5 text-energy-dark" />
                باقاتي الحالية
              </h3>
              <Button variant="ghost" size="sm" className="text-xs text-primary">
                عرض الكل
              </Button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm ring-1 ring-primary/15">
                  <AtomIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-extrabold text-foreground">الفيزياء — الفصل الثالث</p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    يتبقى 27 يومًا من الاشتراك
                  </p>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white ring-1 ring-border/50">
                    <div className="h-full w-2/3 rounded-full bg-primary" />
                  </div>
                </div>
                <Button size="sm" className="rounded-xl bg-energy text-energy-foreground shadow-md shadow-energy/25">
                  تجديد
                </Button>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-border/70 p-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-muted-foreground">
                  <AtomIcon className="opacity-50" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-extrabold text-foreground">الحزمة الشاملة (كل المواد)</p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    خصم 25% على الاشتراك السنوي
                  </p>
                </div>
                <Button size="sm" variant="outline" className="rounded-xl">
                  اشترك
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Transactions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-foreground">سجل المعاملات</h3>
          <span className="text-xs font-semibold text-muted-foreground">
            {transactions.length} معاملة
          </span>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
          <div className="divide-y divide-border/60">
            {transactions.map((tx) => {
              const tone = toneClasses(tx.tone);
              return (
                <div key={tx.id} className="flex items-center gap-4 p-4">
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-2xl",
                      tone.bg,
                      tone.color,
                    )}
                  >
                    {tx.positive ? (
                      <ArrowDownLeft className="size-5" />
                    ) : (
                      <ArrowUpRight className="size-5" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-extrabold text-foreground">{tx.label}</p>
                    <p className="truncate text-xs font-semibold text-muted-foreground">
                      {tx.date} • {tx.method}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={cn(
                        "text-sm font-extrabold tabular-nums",
                        tx.positive ? "text-success" : "text-destructive",
                      )}
                    >
                      {tx.amount}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full text-[10px]",
                        tx.status === "مكتمل"
                          ? "border-success/30 bg-success/10 text-success"
                          : "border-border bg-surface text-muted-foreground",
                      )}
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function MethodIcon({ id }: { id: PaymentMethod["id"] }) {
  const cls = "size-6";
  if (id === "fawry") return <Landmark className={cls} />;
  if (id === "vodafone") return <Smartphone className={cls} />;
  return <CreditCard className={cls} />;
}

function AtomIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", className)}
    >
      <circle cx="12" cy="12" r="1" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </svg>
  );
}
