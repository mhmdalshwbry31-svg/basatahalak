"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Download, Flag, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LessonActions({
  pdfTitle,
  quizHref,
  shareText,
}: {
  pdfTitle: string;
  quizHref?: string;
  shareText: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "بسطتهالك", text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        toast.success("تم نسخ رابط الدرس");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 rounded-3xl border border-border/60 bg-white p-3.5 shadow-sm">
      <Button
        variant="secondary"
        size="default"
        className="gap-2 rounded-xl bg-energy text-energy-foreground shadow-md shadow-energy/25 hover:bg-energy/90"
        onClick={() => toast.loading("جاري تجهيز ملف PDF الخاص بالدرس...")}
      >
        <Download className="size-4" />
        تحميل ملخص {pdfTitle}
      </Button>

      {quizHref && (
        <Button
          variant="ghost"
          size="default"
          className="gap-2 rounded-xl text-primary hover:bg-primary/5"
          asChild
        >
          <Link href={quizHref}>
            <Sparkles className="size-4" />
            بدء اختبار سريع
          </Link>
        </Button>
      )}

      <div className="ms-auto flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          onClick={handleShare}
          aria-label="مشاركة الدرس"
        >
          {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          aria-label="الإبلاغ عن مشكلة"
          onClick={() =>
            toast.error("شكراً لبلاغك!", {
              description: "سنراجع المحاضرة ونرد عليك خلال 24 ساعة.",
            })
          }
        >
          <Flag className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          aria-label="نسخ الرابط"
          onClick={async () => {
            await navigator.clipboard.writeText(shareText);
            toast.success("تم نسخ رابط الدرس");
          }}
        >
          <Copy className="size-4" />
        </Button>
      </div>
    </div>
  );
}
