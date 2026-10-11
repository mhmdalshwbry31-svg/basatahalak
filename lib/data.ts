import {
  Atom,
  BookMarked,
  Calculator,
  Dna,
  Globe,
  GraduationCap,
  Landmark,
  Languages,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type {
  Accent,
  Announcement,
  Chapter,
  Grade,
  NotificationItem,
  PaymentMethod,
  QuizQuestion,
  ScheduleTask,
  Subject,
  WalletTransaction,
} from "./types";

export const grades: Grade[] = [
  { id: "first", label: "الصف الأول الثانوي", short: "أولى ثانوي" },
  { id: "second", label: "الصف الثاني الثانوي", short: "تانية ثانوي" },
  { id: "third", label: "الصف الثالث الثانوي", short: "تالتة ثانوي" },
];

export const student = {
  name: "أحمد محمد",
  phone: "01012345678",
  grade: grades[2],
  initials: "أم",
  wallet: 150.0,
  streakDays: 7,
};

export const accentMap: Record<
  Accent,
  { iconBg: string; iconColor: string; solid: string; border: string; bar: string }
> = {
  blue: {
    iconBg: "bg-blue-50",
    iconColor: "text-primary",
    solid: "bg-primary",
    border: "border-primary/20",
    bar: "bg-primary",
  },
  orange: {
    iconBg: "bg-orange-50",
    iconColor: "text-energy-dark",
    solid: "bg-energy",
    border: "border-energy/20",
    bar: "bg-energy",
  },
  green: {
    iconBg: "bg-emerald-50",
    iconColor: "text-success",
    solid: "bg-success",
    border: "border-success/20",
    bar: "bg-success",
  },
  violet: {
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    solid: "bg-violet-600",
    border: "border-violet-500/20",
    bar: "bg-violet-600",
  },
  rose: {
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    solid: "bg-rose-600",
    border: "border-rose-500/20",
    bar: "bg-rose-600",
  },
  teal: {
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    solid: "bg-teal-600",
    border: "border-teal-500/20",
    bar: "bg-teal-600",
  },
};

function buildChapters(subject: string): Chapter[] {
  return [
    {
      id: `${subject}-c1`,
      number: 1,
      title: "الوحدة الأولى: الأساسيات",
      subtitle: "مدخل شامل للمنهج",
      lessons: [
        { id: `${subject}-c1-l1`, type: "video", title: "1.1 مقدمة وتعريفات أساسية", duration: "14:20", status: "completed" },
        { id: `${subject}-c1-l2`, type: "video", title: "1.2 شرح الدرس الأول بالتفصيل", duration: "32:05", status: "completed" },
        { id: `${subject}-c1-l3`, type: "video", title: "1.3 حل نماذج ومسائل تدريبية", duration: "41:40", status: "current" },
        { id: `${subject}-c1-l4`, type: "pdf", title: "ملزمة مراجعة الوحدة الأولى", status: "available" },
        { id: `${subject}-c1-l5`, type: "quiz", title: `اختبار تقييمي: الوحدة الأولى`, quiz: { questions: 15, minutes: 25, attempts: "المحاولة 1/3" }, status: "available" },
      ],
    },
    {
      id: `${subject}-c2`,
      number: 2,
      title: "الوحدة الثانية: التطبيقات",
      subtitle: "أمثلة وتمارين عملية",
      lessons: [
        { id: `${subject}-c2-l1`, type: "video", title: "2.1 التطبيقات العملية", duration: "25:30", status: "available" },
        { id: `${subject}-c2-l2`, type: "pdf", title: "ملخص قوانين الوحدة الثانية", status: "available" },
        { id: `${subject}-c2-l3`, type: "quiz", title: `اختبار تقييمي: الوحدة الثانية`, quiz: { questions: 12, minutes: 20, attempts: "المحاولة 1/3" }, status: "available" },
      ],
    },
    {
      id: `${subject}-c3`,
      number: 3,
      title: "الوحدة الثالثة: مراجعة نهائية",
      subtitle: "لأولئك المشتركين في الاشتراك الشامل",
      locked: true,
      lessons: [
        { id: `${subject}-c3-l1`, type: "video", title: "3.1 مراجعة ليلة الامتحان (جزء 1)", duration: "58:00", status: "locked" },
        { id: `${subject}-c3-l2`, type: "video", title: "3.2 مراجعة ليلة الامتحان (جزء 2)", duration: "62:15", status: "locked" },
        { id: `${subject}-c3-l3`, type: "quiz", title: "الاختبار الشامل النهائي", quiz: { questions: 20, minutes: 45, attempts: "المحاولة 1/2" }, status: "locked" },
      ],
    },
  ];
}

const physicsChapters: Chapter[] = [
  {
    id: "physics-c1",
    number: 1,
    title: "الكهرباء التيارية وقانون أوم",
    subtitle: "التفاعلات والظواهر الكهربائية",
    lessons: [
      { id: "ph-1-1", type: "video", title: "1.1 مفاهيم الكهربية الأساسية", subtitle: "التيار الكهربي وطبيعة الموصلات", duration: "12:45", status: "completed" },
      { id: "ph-1-2", type: "video", title: "1.2 قانون أوم وقانونا كيرشوف", subtitle: "العلاقة بين الجهد والتيار", duration: "45:00", status: "current" },
      { id: "ph-1-3", type: "video", title: "1.3 توصيل المقاومات (توالي وتوازي)", subtitle: "الدوائر الكهربية المعقدة", duration: "38:20", status: "available" },
      { id: "ph-1-4", type: "pdf", title: "ملزمة ملخص الباب الأول + مسائل محلولة", status: "available" },
      { id: "ph-1-5", type: "quiz", title: "اختبار تقييمي: الباب الأول", quiz: { questions: 20, minutes: 30, attempts: "المحاولة 1/3", best: "--/100" }, status: "available" },
    ],
  },
  {
    id: "physics-c2",
    number: 2,
    title: "التأثير المغناطيسي للتيار",
    subtitle: "المغناطيسية والمواد المغناطيسية",
    lessons: [
      { id: "ph-2-1", type: "video", title: "2.1 القوة المغناطيسية المؤثرة على تيار", duration: "40:10", status: "available" },
      { id: "ph-2-2", type: "video", title: "2.2 عزم الازدواج والمراوح", duration: "27:35", status: "available" },
      { id: "ph-2-3", type: "pdf", title: "مسائل امتحانات سابقة - الباب الثاني", status: "available" },
      { id: "ph-2-4", type: "quiz", title: "اختبار تقييمي: الباب الثاني", quiz: { questions: 15, minutes: 25, attempts: "المحاولة 1/3" }, status: "available" },
    ],
  },
  {
    id: "physics-c3",
    number: 3,
    title: "الحث الكهرومغناطيسي",
    subtitle: "توليد التيار المتردد",
    lessons: [
      { id: "ph-3-1", type: "video", title: "3.1 القوة الدافعة الكهربية الحثية", duration: "44:50", status: "available" },
      { id: "ph-3-2", type: "video", title: "3.2 الحث الذاتي والمواد المغناطيسية", duration: "33:15", status: "locked" },
      { id: "ph-3-3", type: "quiz", title: "اختبار تقييمي: الباب الثالث", quiz: { questions: 15, minutes: 25, attempts: "المحاولة 1/3" }, status: "locked" },
    ],
  },
  {
    id: "physics-c4",
    number: 4,
    title: "دوائر التيار المتردد",
    subtitle: "مفاهيم متقدمة",
    lessons: [
      { id: "ph-4-1", type: "video", title: "4.1 المكثف في دائرة التيار المتردد", duration: "39:00", status: "locked" },
      { id: "ph-4-2", type: "pdf", title: "ملخص شامل: التيار المتردد", status: "locked" },
    ],
  },
  {
    id: "physics-c5",
    number: 5,
    title: "الفيزياء الحديثة",
    subtitle: "يتطلب اشتراك الحزمة الشاملة",
    locked: true,
    lessons: [
      { id: "ph-5-1", type: "video", title: "5.1 فرضية الكم - أينشتاين", duration: "52:30", status: "locked" },
      { id: "ph-5-2", type: "video", title: "5.2 الفيزياء النووية", duration: "47:10", status: "locked" },
      { id: "ph-5-3", type: "quiz", title: "الاختبار الشامل", quiz: { questions: 20, minutes: 45, attempts: "المحاولة 1/2" }, status: "locked" },
    ],
  },
];

export const subjects: Subject[] = [
  {
    slug: "physics",
    title: "الفيزياء",
    teacher: "م/ محمد علي",
    teacherTitle: "كبير معلمي الفيزياء - خبير المركز القومي للامتحانات",
    description:
      "استمتع برحلة تعليمية شيقة تغطي كافة جوانب المنهج من الميكانيكا إلى الفيزياء الحديثة مع شرح مبسط وتطبيقات عملية لكل درس.",
    progress: 65,
    icon: Atom,
    accent: "blue",
    lessonsCount: 36,
    hours: 12,
    level: "علمي رياضة",
    chapters: physicsChapters,
  },
  {
    slug: "chemistry",
    title: "الكيمياء",
    teacher: "م/ خالد يوسف",
    teacherTitle: "أستاذ الكيمياء - الثانوية العامة",
    description:
      "شرح مبسط لتفاعلات الكيمياء العضوية وغير العضوية مع تدريبات على جميع أفكار الامتحانات السابقة.",
    progress: 42,
    icon: GraduationCap,
    accent: "orange",
    lessonsCount: 30,
    hours: 10,
    level: "علمي علوم",
    chapters: buildChapters("chemistry"),
  },
  {
    slug: "arabic",
    title: "اللغة العربية",
    teacher: "أ/ علاء منصور",
    teacherTitle: "خبير اللغة العربية - موجه لغة عربية",
    description:
      "النحو والصرف والبلاغة والأدب وقصة الأيام بأسلوب مبسط يناسب جميع المستويات مع تمارين تفاعلية.",
    progress: 90,
    icon: BookMarked,
    accent: "green",
    lessonsCount: 42,
    hours: 14,
    level: "بصمة إلزامية",
    chapters: buildChapters("arabic"),
  },
  {
    slug: "math",
    title: "الرياضيات",
    teacher: "م/ أحمد زكي",
    teacherTitle: "أستاذ الرياضيات - ثانوية عامة",
    description:
      "التفاضل والتكامل والجبر والهندسة الفراغية وحل أسئلة امتحانات سابقة بنمط الثانوية العامة الجديد.",
    progress: 25,
    icon: Calculator,
    accent: "violet",
    lessonsCount: 48,
    hours: 16,
    level: "علمي رياضة",
    chapters: buildChapters("math"),
  },
  {
    slug: "biology",
    title: "الأحياء",
    teacher: "م/ سارة عبد الرحمن",
    teacherTitle: "أستاذة الأحياء - الثانوية العامة",
    description:
      "شرح تفاعلي لأجهزة الجسم وعلم الوراثة والوظائف الحيوية مع رسوم توضيحية وأسئلة تجميعات.",
    progress: 58,
    icon: Dna,
    accent: "teal",
    lessonsCount: 33,
    hours: 11,
    level: "علمي علوم",
    chapters: buildChapters("biology"),
  },
  {
    slug: "english",
    title: "اللغة الإنجليزية",
    teacher: "أ/ هبة الله مصطفى",
    teacherTitle: "معلمة لغة إنجليزية - IELTS",
    description:
      "قواعد اللغة والترجمة والتعبير وفهم المقروء بأسلوب عصري مبسط يجعل اللغة الإنجليزية سهلة وممتعة.",
    progress: 31,
    icon: Languages,
    accent: "rose",
    lessonsCount: 40,
    hours: 13,
    level: "بصمة إلزامية",
    chapters: buildChapters("english"),
  },
  {
    slug: "history",
    title: "التاريخ",
    teacher: "أ/ محمود فؤاد",
    teacherTitle: "خبير مادة التاريخ - ثانوية عامة",
    description:
      "التاريخ الحديث والمعاصر بصياغة واضحة مع ربط الأحداث والمواقف بأفكار الامتحان المباشرة.",
    progress: 12,
    icon: Landmark,
    accent: "orange",
    lessonsCount: 25,
    hours: 8,
    level: "أدبي",
    chapters: buildChapters("history"),
  },
  {
    slug: "geography",
    title: "الجغرافيا",
    teacher: "أ/ منى الشاذلي",
    teacherTitle: "موجهة الجغرافيا - الثانوية العامة",
    description:
      "الطبيعة والاقتصاد والجغرافيا البشرية بخرائط تفاعلية وملخصات مرنة تسهل المذاكرة والحفظ.",
    progress: 48,
    icon: Globe,
    accent: "teal",
    lessonsCount: 27,
    hours: 9,
    level: "أدبي",
    chapters: buildChapters("geography"),
  },
];

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    tag: "بث مباشر قادم",
    tagTone: "orange",
    title: "مراجعة ليلة الامتحان: الفيزياء",
    description: "غداً في تمام الساعة 8:00 مساءً مع المستر محمد علي.",
    time: "قبل 10 دقائق",
  },
  {
    id: "ann-2",
    tag: "نتائج الامتحانات",
    tagTone: "green",
    title: "ظهور نتائج الاختبار الشامل",
    description: "الآن يمكنك معرفة ترتيبك على مستوى الجمهورية في مادة اللغة العربية.",
    time: "قبل ساعتين",
  },
  {
    id: "ann-3",
    tag: "عروض الاشتراكات",
    tagTone: "blue",
    title: "خصم 25% على الحزمة الشاملة",
    description: "عرض محدود لمدة أسبوع — اشترك الآن ووفر رصيد محفظتك.",
    time: "أمس",
  },
  {
    id: "ann-4",
    tag: "تحديث المحتوى",
    tagTone: "violet",
    title: "إضافة ملزمة الكيمياء العضوية",
    description: "تم إضافة الملزمة الشاملة للباب الرابع كيمياء مع حلول نموذجية.",
    time: "منذ يومين",
  },
];

export const schedule: ScheduleTask[] = [
  {
    id: "s1",
    time: "10:00",
    period: "صباحاً",
    title: "مشاهدة درس الكيمياء الحرارية",
    subtitle: "الباب الثاني - المحاضرة 4",
    done: true,
    tone: "orange",
  },
  {
    id: "s2",
    time: "02:00",
    period: "ظهراً",
    title: "حل اختبار الفيزياء الأسبوعي",
    subtitle: "20 سؤال - مدة 45 دقيقة",
    done: false,
    tone: "blue",
  },
  {
    id: "s3",
    time: "05:30",
    period: "مساءً",
    title: "مراجعة قواعد اللغة العربية",
    subtitle: "الوحدة الثانية: النحو والصرف",
    done: false,
    tone: "green",
  },
  {
    id: "s4",
    time: "08:00",
    period: "مساءً",
    title: "بث مباشر: مراجعة الرياضيات",
    subtitle: "مع مستر أحمد زكي - تفاضل",
    done: false,
    tone: "violet",
  },
];

export const transactions: WalletTransaction[] = [
  {
    id: "t1",
    label: "شحن رصيد - كارت بسطتهالك",
    date: "12 أكتوبر 2023 - 04:20 م",
    method: "كارت ذكي",
    amount: "+ 100.00 ج.م",
    positive: true,
    status: "مكتمل",
    tone: "blue",
  },
  {
    id: "t2",
    label: "شراء دورة «الفيزياء للثانوية»",
    date: "10 أكتوبر 2023 - 09:15 ص",
    method: "محفظة النظام",
    amount: "- 250.00 ج.م",
    positive: false,
    status: "مكتمل",
    tone: "orange",
  },
  {
    id: "t3",
    label: "شحن رصيد - فوري",
    date: "05 أكتوبر 2023 - 11:45 ص",
    method: "فوري (مرجع 5543)",
    amount: "+ 300.00 ج.م",
    positive: true,
    status: "مكتمل",
    tone: "blue",
  },
  {
    id: "t4",
    label: "تجديد اشتراك اللغة العربية",
    date: "01 أكتوبر 2023 - 06:10 م",
    method: "فودافون كاش",
    amount: "- 120.00 ج.م",
    positive: false,
    status: "مكتمل",
    tone: "rose",
  },
  {
    id: "t5",
    label: "تحويل لهدية لأختك سلمى",
    date: "29 سبتمبر 2023 - 03:40 م",
    method: "محفظة النظام",
    amount: "- 50.00 ج.م",
    positive: false,
    status: "قيد التنفيذ",
    tone: "violet",
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    statement:
      "إذا زادت شدة التيار الكهربائي المار في موصل إلى الضعف، فماذا يحدث للمقاومة الكهربائية لهذا الموصل عند ثبوت درجة الحرارة؟",
    hint: "اختر الإجابة الصحيحة",
    options: ["تزداد إلى الضعف", "تقل إلى النصف", "تظل ثابتة ولا تتغير", "تزداد إلى أربعة أمثالها"],
    correctIndex: 2,
  },
  {
    id: "q2",
    statement: "وحدة قياس القوة الدافعة الكهربية هي:",
    hint: "تذكر تعريف الوحدات الأساسية",
    options: ["الأمبير", "الفولت", "الأوم", "الوات"],
    correctIndex: 1,
  },
  {
    id: "q3",
    statement: "عند توصيل مقاومتين متساويتين على التوازي فإن المقاومة المكافئة:",
    hint: "تطبيق قانون التوصيل على التوازي",
    options: ["تساوي قيمة إحداهما", "تساوي مجموع المقاومتين", "تساوي نصف قيمة إحداهما", "تتوقف على الجهد"],
    correctIndex: 2,
  },
  {
    id: "q4",
    statement: "الشحنات المتشابهة في نوعها عند التقارب:",
    hint: "القاعدة الأساسية للشحنات الكهربية",
    options: ["تتجاذب", "تتنافر", "لا يتأثران", "تتحول إلى شحنات متعاكسة"],
    correctIndex: 1,
  },
  {
    id: "q5",
    statement: "أي من الآتي يُعد وحدة قياس للقوة؟",
    hint: "تذكر النظام الدولي للوحدات",
    options: ["الجول", "النيوتن", "الباسكال", "الكولوم"],
    correctIndex: 1,
  },
  {
    id: "q6",
    statement: "طاقة الوضع للمقذوف لأعلى عند نقطة أقصى ارتفاع تكون:",
    hint: "تحليل الطاقة الميكانيكية",
    options: ["صفر", "الحد الأقصى", "الحد الأدنى", "ثابتة طوال الحركة"],
    correctIndex: 1,
  },
  {
    id: "q7",
    statement: "الزمن الدوري لعملية اهتزازية زاويتها ω يُعطى بالعلاقة:",
    hint: "العلاقة بين الزمن الدوري والتردد الزاوي",
    options: ["T = ω²", "T = 1/ω", "T = 2π/ω", "T = ω/2π"],
    correctIndex: 2,
  },
  {
    id: "q8",
    statement: "عند ثبوت الجهد الكهربي، زيادة المقاومة تؤدي إلى:",
    hint: "تطبيق قانون أوم",
    options: ["زيادة شدة التيار", "نقصان شدة التيار", "ثبات شدة التيار", "انعدام التيار دائماً"],
    correctIndex: 1,
  },
  {
    id: "q9",
    statement: "الكثافة النسبية لسائل تُحسب بقسمة:",
    hint: "علاقات الكثافة",
    options: ["كتلته على حجمه", "كثافته على كثافة الماء", "وزنه على حجمه", "حجمه على كتلته"],
    correctIndex: 1,
  },
  {
    id: "q10",
    statement: "الموجة الصوتية في الهواء تُعد من الموجات:",
    hint: "اتجاه الحركة بالنسبة لاتجاه انتشار الموجة",
    options: ["الطولية", "المستعرضة", "الكهرومغناطيسية", "الساكنة"],
    correctIndex: 0,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "بث مباشر يبدأ بعد ساعة",
    description: "مراجعة ليلة الامتحان في الفيزياء مع مستر محمد علي.",
    time: "منذ 5 دقائق",
    read: false,
    tone: "orange",
  },
  {
    id: "n2",
    title: "ظهرت نتيجتك في الاختبار الشامل",
    description: "حصلت على 88% في اللغة العربية — أنت ضمن العشرة الأوائل!",
    time: "منذ 30 دقيقة",
    read: false,
    tone: "green",
  },
  {
    id: "n3",
    title: "تم استلام رصيد الشحن",
    description: "تم إضافة 100 ج.م إلى محفظتك بنجاح.",
    time: "منذ ساعة",
    read: false,
    tone: "blue",
  },
  {
    id: "n4",
    title: "تذكير بالجدول اليومي",
    description: "لديك درس كيمياء في تمام الساعة 10:00 صباحاً.",
    time: "منذ 3 ساعات",
    read: true,
    tone: "violet",
  },
  {
    id: "n5",
    title: "عرض جديد",
    description: "خصم 25% على الحزمة الشاملة حتى نهاية الأسبوع.",
    time: "أمس",
    read: true,
    tone: "rose",
  },
];

export const paymentMethods: PaymentMethod[] = [
  { id: "fawry", title: "فوري", subtitle: "دفع نقدي", short: "Fawry" },
  { id: "vodafone", title: "فودافون كاش", subtitle: "محفظة موبايل", short: "Vodafone Cash" },
  { id: "card", title: "بطاقة بنكية", subtitle: "فيزا / ماستر كارد", short: "Card" },
];

export const rechargeAmounts = [50, 100, 200, 500];

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getLesson(slug: string): {
  subject: Subject;
  chapter: Chapter;
  lesson: Chapter["lessons"][number];
  prev: Chapter["lessons"][number] | null;
  next: Chapter["lessons"][number] | null;
} | null {
  for (const subject of subjects) {
    for (const chapter of subject.chapters) {
      const index = chapter.lessons.findIndex((l) => l.id === slug);
      if (index >= 0) {
        const prev = chapter.lessons[index - 1] ?? null;
        const next = chapter.lessons[index + 1] ?? null;
        return { subject, chapter, lesson: chapter.lessons[index], prev, next };
      }
    }
  }
  return null;
}

export const featuredIcon: LucideIcon = Sparkles;

/** Subject without the LucideIcon component — safe to pass to Client Components. */
export type SubjectView = Omit<Subject, "icon">;

export function subjectToView(subject: Subject): SubjectView {
  const { icon, ...view } = subject;
  void icon;
  return view;
}

export const subjectIcons: Record<string, LucideIcon> = {
  physics: Atom,
  chemistry: GraduationCap,
  arabic: BookMarked,
  math: Calculator,
  biology: Dna,
  english: Languages,
  history: Landmark,
  geography: Globe,
};

export function subjectIcon(slug: string): LucideIcon {
  return subjectIcons[slug] ?? Sparkles;
}
