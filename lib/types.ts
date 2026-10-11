import type { LucideIcon } from "lucide-react";

export type GradeId = "first" | "second" | "third";

export interface Grade {
  id: GradeId;
  label: string;
  short: string;
}

export type LessonType = "video" | "pdf" | "quiz";
export type LessonStatus = "completed" | "current" | "available" | "locked";
export type Accent = "blue" | "orange" | "green" | "violet" | "rose" | "teal";

export interface QuizMeta {
  questions: number;
  minutes: number;
  attempts: string;
  best?: string;
}

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  subtitle?: string;
  duration?: string;
  status: LessonStatus;
  quiz?: QuizMeta;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  locked?: boolean;
  lessons: Lesson[];
}

export interface Subject {
  slug: string;
  title: string;
  teacher: string;
  teacherTitle?: string;
  description: string;
  progress: number;
  icon: LucideIcon;
  accent: Accent;
  lessonsCount: number;
  hours: number;
  level: "بصمة إلزامية" | "علمي علوم" | "علمي رياضة" | "أدبي";
  chapters: Chapter[];
}

export interface Announcement {
  id: string;
  tag: string;
  tagTone: Accent;
  title: string;
  description: string;
  time: string;
}

export interface ScheduleTask {
  id: string;
  time: string;
  period: string;
  title: string;
  subtitle: string;
  done: boolean;
  tone: Accent;
}

export interface WalletTransaction {
  id: string;
  label: string;
  date: string;
  method: string;
  amount: string;
  positive: boolean;
  status: "مكتمل" | "قيد التنفيذ";
  tone: Accent;
}

export interface QuizQuestion {
  id: string;
  statement: string;
  hint: string;
  options: string[];
  correctIndex: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  tone: Accent;
}

export interface PaymentMethod {
  id: "fawry" | "vodafone" | "card";
  title: string;
  subtitle: string;
  short: string;
}
