export type UsageType = "private" | "commercial";
export type PlotSize = "compact" | "medium" | "large";
export type BudgetRange = "economy" | "standard" | "premium";
export type ConstructionType = "composite" | "frame" | "concrete";

export interface PoolTags {
  usage: UsageType[];
  plotSize: PlotSize[];
  budget: BudgetRange[];
  construction: ConstructionType[];
}

export interface Pool {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  tags: PoolTags;
  productUrl: string;
}

export interface QuizAnswers {
  usage: UsageType | null;
  plotSize: PlotSize | null;
  budget: BudgetRange | null;
  construction: ConstructionType | null;
}

export interface QuizOption<T extends string = string> {
  value: T;
  label: string;
  description: string;
  icon: string;
}

export interface QuizQuestion<T extends string = string> {
  id: keyof QuizAnswers;
  title: string;
  subtitle: string;
  options: QuizOption<T>[];
}

export const INITIAL_ANSWERS: QuizAnswers = {
  usage: null,
  plotSize: null,
  budget: null,
  construction: null,
};

export const POOLS_DATA: Pool[] = [
  {
    id: "aqua-start-24",
    name: "AquaStart 24",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
    description:
      "Компактный композитный бассейн для небольших участков и частного использования. Быстрый монтаж за 3–5 дней.",
    price: "от 890 000 ₽",
    tags: {
      usage: ["private"],
      plotSize: ["compact"],
      budget: ["economy"],
      construction: ["composite"],
    },
    productUrl: "https://example.com/pools/aquastart-24",
  },
  {
    id: "aqua-start-32",
    name: "AquaStart 32",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    description:
      "Универсальная модель для семейного отдыха. Композитная чаша с антискользящим покрытием и LED-подсветкой.",
    price: "от 1 250 000 ₽",
    tags: {
      usage: ["private"],
      plotSize: ["medium"],
      budget: ["standard"],
      construction: ["composite"],
    },
    productUrl: "https://example.com/pools/aquastart-32",
  },
  {
    id: "frame-pro-40",
    name: "FramePro 40",
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2f2?w=800&q=80",
    description:
      "Каркасный бассейн повышенной прочности. Идеален для коммерческих объектов с сезонной эксплуатацией.",
    price: "от 1 680 000 ₽",
    tags: {
      usage: ["commercial", "private"],
      plotSize: ["medium", "large"],
      budget: ["standard"],
      construction: ["frame"],
    },
    productUrl: "https://example.com/pools/framepro-40",
  },
  {
    id: "frame-pro-52",
    name: "FramePro 52",
    image: "https://images.unsplash.com/photo-1582268611955-ebfd161ef9cf?w=800&q=80",
    description:
      "Большой каркасный бассейн для отелей и SPA-комплексов. Усиленная конструкция и система фильтрации Pro.",
    price: "от 2 450 000 ₽",
    tags: {
      usage: ["commercial"],
      plotSize: ["large"],
      budget: ["standard", "premium"],
      construction: ["frame"],
    },
    productUrl: "https://example.com/pools/framepro-52",
  },
  {
    id: "concrete-infinity-60",
    name: "Infinity Concrete 60",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description:
      "Бетонный бассейн с эффектом «бесконечного края». Премиальное решение для элитных резиденций и бизнес-объектов.",
    price: "от 4 900 000 ₽",
    tags: {
      usage: ["private", "commercial"],
      plotSize: ["large"],
      budget: ["premium"],
      construction: ["concrete"],
    },
    productUrl: "https://example.com/pools/infinity-concrete-60",
  },
  {
    id: "concrete-lap-25",
    name: "LapPool Concrete 25",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    description:
      "Узкий бетонный бассейн для спортивных тренировок. Подходит для фитнес-клубов и частных домов с ограниченной площадью.",
    price: "от 3 200 000 ₽",
    tags: {
      usage: ["private", "commercial"],
      plotSize: ["compact", "medium"],
      budget: ["premium"],
      construction: ["concrete"],
    },
    productUrl: "https://example.com/pools/lap-pool-concrete-25",
  },
  {
    id: "composite-business-45",
    name: "Business Composite 45",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    description:
      "Композитная модель для коммерческой эксплуатации: базы отдыха, гостиницы, wellness-центры.",
    price: "от 2 100 000 ₽",
    tags: {
      usage: ["commercial"],
      plotSize: ["medium", "large"],
      budget: ["standard", "premium"],
      construction: ["composite"],
    },
    productUrl: "https://example.com/pools/business-composite-45",
  },
  {
    id: "composite-family-28",
    name: "Family Composite 28",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    description:
      "Доступный композитный бассейн для дачи и загородного дома. Минимальные затраты на обслуживание.",
    price: "от 980 000 ₽",
    tags: {
      usage: ["private"],
      plotSize: ["compact", "medium"],
      budget: ["economy", "standard"],
      construction: ["composite"],
    },
    productUrl: "https://example.com/pools/family-composite-28",
  },
  {
    id: "frame-economy-20",
    name: "Frame Economy 20",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    description:
      "Бюджетный каркасный бассейн для быстрого старта бизнеса. Лёгкая транспортировка и сборка.",
    price: "от 720 000 ₽",
    tags: {
      usage: ["commercial", "private"],
      plotSize: ["compact"],
      budget: ["economy"],
      construction: ["frame"],
    },
    productUrl: "https://example.com/pools/frame-economy-20",
  },
  {
    id: "concrete-resort-80",
    name: "Resort Concrete 80",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    description:
      "Флагманская бетонная модель для курортов и аквапарков. Индивидуальный дизайн и зоны для детей.",
    price: "от 8 500 000 ₽",
    tags: {
      usage: ["commercial"],
      plotSize: ["large"],
      budget: ["premium"],
      construction: ["concrete"],
    },
    productUrl: "https://example.com/pools/resort-concrete-80",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "usage",
    title: "Для чего вам нужен бассейн?",
    subtitle: "Выберите основной тип использования",
    options: [
      {
        value: "private",
        label: "Частное использование",
        description: "Для дома, дачи или загородной резиденции",
        icon: "🏡",
      },
      {
        value: "commercial",
        label: "Коммерческое использование",
        description: "Отель, SPA, фитнес-клуб или база отдыха",
        icon: "🏢",
      },
    ],
  },
  {
    id: "plotSize",
    title: "Какой размер участка?",
    subtitle: "Это поможет подобрать оптимальные габариты",
    options: [
      {
        value: "compact",
        label: "Компактный",
        description: "До 50 м² — небольшой участок или терраса",
        icon: "📐",
      },
      {
        value: "medium",
        label: "Средний",
        description: "50–150 м² — стандартный загородный участок",
        icon: "📏",
      },
      {
        value: "large",
        label: "Большой",
        description: "Более 150 м² — просторная территория",
        icon: "🗺️",
      },
    ],
  },
  {
    id: "budget",
    title: "Какой у вас бюджет?",
    subtitle: "Мы подберём варианты в вашем ценовом диапазоне",
    options: [
      {
        value: "economy",
        label: "Эконом",
        description: "До 1 000 000 ₽ — оптимальное соотношение цены и качества",
        icon: "💰",
      },
      {
        value: "standard",
        label: "Стандарт",
        description: "1 000 000 – 3 000 000 ₽ — расширенная комплектация",
        icon: "💎",
      },
      {
        value: "premium",
        label: "Премиум",
        description: "От 3 000 000 ₽ — индивидуальный проект и премиум-материалы",
        icon: "👑",
      },
    ],
  },
  {
    id: "construction",
    title: "Какой тип конструкции предпочитаете?",
    subtitle: "Каждый тип имеет свои преимущества",
    options: [
      {
        value: "composite",
        label: "Композитный",
        description: "Готовая чаша, быстрый монтаж, минимальное обслуживание",
        icon: "🔷",
      },
      {
        value: "frame",
        label: "Каркасный",
        description: "Гибкость размеров, доступная цена, сезонная эксплуатация",
        icon: "🔧",
      },
      {
        value: "concrete",
        label: "Бетонный",
        description: "Максимальная долговечность, любая форма и дизайн",
        icon: "🏗️",
      },
    ],
  },
];

export function filterPools(answers: QuizAnswers): Pool[] {
  const activeFilters = Object.entries(answers).filter(
    (entry): entry is [keyof QuizAnswers, string] => entry[1] !== null,
  );

  if (activeFilters.length === 0) return POOLS_DATA;

  const scored = POOLS_DATA.map((pool) => {
    let score = 0;
    for (const [key, value] of activeFilters) {
      if (pool.tags[key].includes(value as never)) {
        score += 1;
      }
    }
    return { pool, score };
  });

  const maxScore = Math.max(...scored.map((s) => s.score));
  if (maxScore === 0) return POOLS_DATA.slice(0, 3);

  return scored
    .filter((s) => s.score === maxScore || s.score === maxScore - 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((s) => s.pool);
}
