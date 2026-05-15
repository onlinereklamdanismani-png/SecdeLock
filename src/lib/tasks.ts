import { Task } from "@/types";

export const DAILY_TASKS: Task[] = [
  {
    id: "fajr-sunna",
    title: "Sabah Sünneti",
    description: "Sabah namazının 2 rekat sünnetini kıl",
    emoji: "🌅",
    xpReward: 15,
    category: "prayer",
    completed: false,
  },
  {
    id: "ayetel-kursi",
    title: "Ayetel Kürsi Oku",
    description: "Sabah ve akşam Ayetel Kürsi oku",
    emoji: "📖",
    xpReward: 20,
    category: "quran",
    completed: false,
  },
  {
    id: "sabah-zikir",
    title: "Sabah Zikri",
    description: "33 kez Sübhanallah, 33 kez Elhamdülillah, 34 kez Allahu Ekber",
    emoji: "📿",
    xpReward: 25,
    category: "zikir",
    completed: false,
  },
  {
    id: "kuran-okuma",
    title: "Kur'an Sayfası",
    description: "En az 1 sayfa Kur'an-ı Kerim oku",
    emoji: "🕌",
    xpReward: 30,
    category: "quran",
    completed: false,
  },
  {
    id: "duha-namaz",
    title: "Kuşluk Namazı",
    description: "2-12 rekat arası kuşluk namazı kıl",
    emoji: "☀️",
    xpReward: 20,
    category: "prayer",
    completed: false,
  },
  {
    id: "aksam-zikir",
    title: "Akşam Duaları",
    description: "Akşam tesbihatını oku",
    emoji: "🌇",
    xpReward: 20,
    category: "dua",
    completed: false,
  },
  {
    id: "istigfar",
    title: "100 İstiğfar",
    description: "100 kez istiğfar et",
    emoji: "🤲",
    xpReward: 25,
    category: "zikir",
    completed: false,
  },
];

export const MOTIVATIONAL_QUOTES = [
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    turkish: "Şüphesiz her güçlükle birlikte bir kolaylık vardır.",
    source: "İnşirah 94:6",
  },
  {
    arabic: "وَاللّٰهُ يُحِبُّ الصَّابِرِينَ",
    turkish: "Allah sabredenleri sever.",
    source: "Âl-i İmrân 3:146",
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    turkish: "Siz beni zikredin, ben de sizi zikredeyim.",
    source: "Bakara 2:152",
  },
  {
    arabic: "وَمَنْ يَتَوَكَّلْ عَلَى اللّٰهِ فَهُوَ حَسْبُهُ",
    turkish: "Kim Allah'a tevekkül ederse O, ona yeter.",
    source: "Talak 65:3",
  },
  {
    arabic: "أَلَا بِذِكْرِ اللّٰهِ تَطْمَئِنُّ الْقُلُوبُ",
    turkish: "Bilin ki, kalpler ancak Allah'ı zikretmekle huzur bulur.",
    source: "Ra'd 13:28",
  },
];
