import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

const cairo = Cairo({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "بسطتهالك | منصة تعليمية للثانوية العامة",
    template: "%s | بسطتهالك",
  },
  description:
    "منصة بسطتهالك التعليمية لطلاب الثانوية العامة المصرية — دروس مسجلة وبث مباشر واختبارات تفاعلية ومحفظة رقمية.",
  keywords: ["ثانوية عامة", "منصة تعليمية", "دروس اونلاين", "بسطتهالك"],
  openGraph: {
    title: "بسطتهالك | منصة تعليمية للثانوية العامة",
    description:
      "علّم نفسك ببساطة — دروس واختبارات ومتابعة مستمرة لطلاب الثانوية العامة.",
    locale: "ar_EG",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0058be",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <TooltipProvider delayDuration={150}>
          <Header />
          <div className="flex-1 pb-20 lg:pb-0">{children}</div>
          <MobileBottomNav />
        </TooltipProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
