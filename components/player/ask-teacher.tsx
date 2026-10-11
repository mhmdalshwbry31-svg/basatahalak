"use client";

import { useState } from "react";
import { Bot, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  from: "student" | "teacher";
  text: string;
  time: string;
}

const teacherReplies = [
  "بالتأكيد! سنشرح هذه النقطة بالتفصيل في الدقيقة 15:20 من الفيديو — تابع معنا. 💪",
  "سؤال ممتاز! أضف هذه الملاحظة إلى ملخصك: هذه القاعدة تأتي دائماً في أسئلة الامتحانات.",
  "لاحظ أن هذا الجزء يعتمد على قاعدة الدرس السابق. راجع دقيقة 08:30 ثم عد للسؤال.",
  "تمام، سيوضح لك المعلم هذه الفكرة بأمثلة عملية في المحاضرة القادمة بإذن الله.",
];

let replyIndex = 0;

export function AskTeacher() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "teacher",
      text: "أهلاً بك! أنا مساعد المعلم الذكي. اسألني عن أي نقطة في الدرس وسأجيبك فوراً. 😊",
      time: "الآن",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "student", text, time: "الآن" },
    ]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "teacher",
          text: teacherReplies[replyIndex % teacherReplies.length],
          time: "الآن",
        },
      ]);
      replyIndex += 1;
      setTyping(false);
    }, 1400);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-border/70 bg-surface-low/50 p-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageCircle className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-foreground">اسأل المعلم</h3>
            <p className="text-[11px] font-semibold text-muted-foreground">
              رد فوري على أسئلتك
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-bold text-success">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-success" />
          </span>
          متصل الآن
        </span>
      </div>

      <div className="no-scrollbar flex max-h-72 flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col gap-1 max-w-[88%]",
              msg.from === "student" ? "items-start" : "items-end self-end",
            )}
          >
            <div
              className={cn(
                "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                msg.from === "student"
                  ? "rounded-tr-none bg-surface-high text-foreground"
                  : "rounded-tl-none bg-primary text-white shadow-md shadow-primary/15",
              )}
            >
              {msg.text}
            </div>
            <span
              className={cn(
                "text-[10px] font-medium text-muted-foreground",
                msg.from === "teacher" && "flex items-center gap-1",
              )}
            >
              {msg.from === "teacher" && <Bot className="size-3" />}
              {msg.from === "teacher" ? "مساعد المعلم الذكي" : "أنت"} • {msg.time}
            </span>
          </div>
        ))}

        {typing && (
          <div className="flex items-end gap-1.5 self-end rounded-2xl rounded-tl-none bg-primary/10 px-3.5 py-2.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 animate-bounce rounded-full bg-primary/60"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border/70 bg-surface-low/30 p-3">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder="اكتب سؤالك هنا..."
            className="w-full rounded-xl border border-border bg-white py-2.5 pe-3 ps-11 text-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-3 focus:ring-primary/10"
            aria-label="اكتب سؤالك"
          />
          <Button
            type="button"
            size="icon-sm"
            onClick={send}
            disabled={!input.trim() || typing}
            className="absolute end-1.5 top-1/2 -translate-y-1/2 rounded-lg"
            aria-label="إرسال السؤال"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
