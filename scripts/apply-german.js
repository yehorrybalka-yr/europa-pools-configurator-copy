const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const COLOR_LABELS = {
  blau: "Azurblau",
  weiss: "Kristallweiß",
  grau: "Hellgrau",
  sand: "Sandfarben",
};

const POOLS_DE = [
  ["gfk-pool-iceland", "Kompaktes rundes Tauchbecken mit in die Beckenwand integrierten Stufen. Ideal für kleine Grundstücke, Spa-Bereiche oder als Ergänzung zur Sauna."],
  ["gfk-pool-nova", "Klassischer Rechteckpool mit breiten Stufen über die gesamte kurze Seite — großzügiger und komfortabler Einstieg für die ganze Familie."],
  ["gfk-pool-lunaris", "Rechteckiges Becken mit kompakten Eckstufen — maximale Schwimmfläche bei minimalem Einstiegsbereich."],
  ["gfk-pool-nebula", "Rechteckpool mit mehrstufigen Eckstufen und integrierter Sitzbank zum Entspannen im Wasser."],
  ["gfk-pool-zenith", "Rechteckbecken mit abgeschrägten Ecken und markantem halbrunden römischem Einstieg an einem Kopfende."],
  ["gfk-pool-celeste", "Schmaler Rechteckpool zum Bahnenschwimmen mit symmetrischen Eckstufen an beiden Enden."],
  ["gfk-pool-aurora", "Schlichter Rechteckpool mit stufenloser Breite an der kurzen Seite — klarer architektonischer Stil."],
  ["gfk-pool-italien", "Rechteckbecken mit halbrundem römischem Vorsprung am Kopfende und klassischen Halbkreisstufen im Inneren."],
  ["gfk-pool-kuba", "Rechteckpool mit symmetrischen Eckstufen an beiden Ecken einer Seite — zwei bequeme Einstiege."],
  ["gfk-pool-nightfall", "Rechteckbecken mit breiten dreieckigen Eckstufen — platzsparend mit maximaler Schwimmlänge."],
  ["gfk-pool-midnight", "Rechteckpool mit zentralem Einstieg an der langen Seite — einzigartige seitliche Einstiegszone, die Kopfenden bleiben frei."],
  ["gfk-pool-spanien", "Rechteckbecken mit dekorativem Vorsprung am Kopfende, geschwungenen Eckstufen und integrierter Relaxzone."],
  ["gfk-pool-sunrise", "Klassischer Rechteckpool mit geraden Eckstufen — einfacher und funktionaler Familienpool."],
  ["gfk-pool-australien", "Rechteckbecken mit sanften halbrunden Eckstufen — weiche Einstiegslinien bei kompakter Fläche."],
  ["gfk-pool-orion", "Premium-Rechteckbecken mit breitem symmetrischem Paradeeinstieg in der Mitte und Relaxzonen an den Seiten."],
  ["gfk-pool-twilight", "Rechteckbecken mit römischem Rundkopfende und integrierten Halbkreisstufen im Einstiegsbereich."],
  ["gfk-pool-phoebus", "Rechteckbecken mit großer flachen Strandeinstiegszone — ideal für Kinder, Sonnenbaden und entspanntes Verweilen im Wasser."],
  ["gfk-pool-eclipse", "Moderner Rechteckpool mit komplexen Eckstufen um die Ecke und integrierter Sitzbank zur Entspannung."],
  ["gfk-pool-portugal", "Ovale „Kapsel“ mit geraden langen Seiten und abgerundeten Enden. Stufen sind im langen Beckenrand integriert."],
  ["gfk-pool-frankreich", "Designer-Becken in freier organischer Form mit geschwungenen Wellenlinien und Eckstufen."],
];

function patchPoolData(content) {
  let result = content;
  for (const [id, description] of POOLS_DE) {
    result = result.replace(
      new RegExp(`(id: "${id}"[\\s\\S]*?description: ")[^"]+(")`, "g"),
      `$1${description.replace(/"/g, '\\"')}$2`
    );
  }
  result = result.replace(/от /g, "ab ");
  result = result.replace(
    /availableColors: \["голубой", "белый", "серый", "песочный"\]/g,
    'availableColors: ["blau", "weiss", "grau", "sand"]'
  );
  result = result.replace(
    /availableColors: \["голубой","белый","серый","песочный"\]/g,
    'availableColors: ["blau", "weiss", "grau", "sand"]'
  );
  return result;
}

function patchIndexHtml() {
  let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

  html = html.replace('lang="ru"', 'lang="de"');
  html = html.replace("<title>Constant Pool Конфигуратор</title>", "<title>Constant Pool Konfigurator</title>");

  const replacements = [
    ["Интерактивный помощник", "Interaktiver Berater"],
    ["Подберите идеальный бассейн", "Finden Sie den idealen Pool"],
    ["Ответьте на несколько простых вопросов. Наша система проанализирует ваши параметры и моментально подберет подходящую чашу с точными размерами и ценами из нашего каталога.", "Beantworten Sie ein paar einfache Fragen. Unser System analysiert Ihre Angaben und schlägt sofort passende Becken mit exakten Maßen und Preisen aus unserem Katalog vor."],
    ["Время: всего 2 минуты", "Dauer: nur 2 Minuten"],
    ["Точные размеры по каталогу", "Exakte Maße aus dem Katalog"],
    ["Расчет оборудования", "Zubehör-Empfehlung"],
    ["Начать подбор чаши →", "Beckenauswahl starten →"],
    ["Шаг 1 из 7", "Schritt 1 von 7"],
    ["0% выполнено", "0 % abgeschlossen"],
    ["← Назад", "← Zurück"],
    ["Далее →", "Weiter →"],
    ["Ваш идеальный бассейн готов!", "Ihr idealer Pool ist bereit!"],
    ["На основе ваших ответов мы подобрали наиболее подходящие конфигурации чаш Constant Pool.", "Auf Basis Ihrer Antworten haben wir die passendsten Constant-Pool-GFK-Becken-Konfigurationen für Sie zusammengestellt."],
    ["📦 Рекомендуемое оригинальное оборудование к вашей чаше:", "📦 Empfohlenes Originalzubehör für Ihr Becken:"],
    ["↻ Пройти квиз заново", "↻ Quiz erneut starten"],
    ['`Шаг ${currentStep + 1} из ${QUESTIONS.length}`', '`Schritt ${currentStep + 1} von ${QUESTIONS.length}`'],
    ['`${progress}% выполнено`', '`${progress} % abgeschlossen`'],
    ['"Показать результат 🎉"', '"Ergebnis anzeigen 🎉"'],
    ['"Далее →"', '"Weiter →"'],
    ['const userColor = answers.color || "выбранном";', 'const userColor = COLOR_LABELS[answers.color] || answers.color || "gewünschten";'],
    ["Совпадение ${pool.percent}%", "Übereinstimmung ${pool.percent} %"],
    ["📐 Размер конфигурации:", "📐 Konfigurationsgröße:"],
    ["✓ Доступен в цвете:", "✓ Erhältlich in Farbe:"],
    ["Перейти к товару →", "Zum Produkt →"],
    ['от 5.750 €', 'ab 5.750 €'],
    ['от 1.650 €', 'ab 1.650 €'],
    ['от 600 €', 'ab 600 €'],
    ['от 110 €', 'ab 110 €'],
  ];

  for (const [from, to] of replacements) html = html.split(from).join(to);

  html = patchPoolData(html);

  // Insert COLOR_LABELS before POOLS_DATA
  if (!html.includes("const COLOR_LABELS")) {
    html = html.replace(
      "        const POOLS_DATA = [",
      `        const COLOR_LABELS = ${JSON.stringify(COLOR_LABELS, null, 10).replace(/\n/g, "\n        ")};\n\n        const POOLS_DATA = [`
    );
  }

  // QUESTIONS block replacement
  html = html.replace(
    /const QUESTIONS = \[[\s\S]*?\];\n\n        let currentStep/,
    `const QUESTIONS = [
          {
            id: "budget",
            title: "Wie hoch ist Ihr geplantes Budget für das Poolbecken?",
            type: "radio",
            options: [
              { value: "economy", label: "Economy / Einstieg — bis 3.400 €", description: "Iceland, Phoebus, Lunaris, Italien und weitere attraktive Modelle" },
              { value: "optimal", label: "Optimal — 3.400 – 4.200 €", description: "Nova, Aurora, Nightfall, Sunrise, Twilight und vergleichbare Becken" },
              { value: "premium", label: "Premium / Flaggschiff — ab 4.300 €", description: "Orion, Kuba, Portugal, Celeste, Eclipse und Top-Modelle" }
            ]
          },
          {
            id: "shape",
            title: "Welche Beckenform bevorzugen Sie?",
            type: "radio",
            options: [
              { value: "compact", label: "Rundes Tauchbecken", description: "Kompaktes Becken für Spa, Terrasse oder kleines Grundstück" },
              { value: "rectangular", label: "Klassisches Rechteck", description: "Klare Geometrie, maximale Schwimmlänge" },
              { value: "rounded", label: "Mit rundem / römischem Kopfende", description: "Dekorativer Vorsprung oder halbrunder Einstieg am Kopfende" },
              { value: "capsule", label: "Ovale Kapsel", description: "Gerade lange Seiten und sanft abgerundete Enden" },
              { value: "organic", label: "Freie organische Form", description: "Geschwungene Linien und individuelle Designer-Geometrie" }
            ]
          },
          { id: "size", title: "Welche ungefähre Größe benötigen Sie?", type: "radio", options: [{ value: "small", label: "Kompakt (bis 5–6 Meter)" }, { value: "medium", label: "Mittel / Familie (6–8 Meter)" }, { value: "large", label: "Großzügig / Sport (über 8 Meter)" }] },
          {
            id: "steps",
            title: "Welche Art von Einstieg und Stufen bevorzugen Sie?",
            type: "radio",
            options: [
              { value: "corner_steps", label: "Kompakte Eckstufen", description: "Einstieg in der Ecke oder am Beckenrand — maximale Schwimmfläche" },
              { value: "wide_entry", label: "Breiter Einstieg", description: "Stufen über die gesamte Breite, symmetrisch oder als Paradeeinstieg" },
              { value: "roman_steps", label: "Römische / halbrunde Stufen", description: "Klassischer eleganter Einstieg mit sanfter Rundung" },
              { value: "relax_zone", label: "Relaxzone / flacher Einstieg", description: "Strandeinstieg, Sitzbank oder Lounge-Bereich im Wasser" }
            ]
          },
          { id: "filtration", title: "Welchen Filtertyp planen Sie?", type: "radio", options: [{ value: "skimmer", label: "Skimmer (Wasserspiegel leicht unter dem Rand)" }, { value: "overflow", label: "Überlauf / Spiegelbecken (Wasser bündig mit dem Boden)" }] },
          { id: "color", title: "Welche Beckenfarbe wünschen Sie?", type: "radio", options: [{ value: "blau", label: "Azurblau" }, { value: "weiss", label: "Kristallweiß" }, { value: "grau", label: "Hellgrau" }, { value: "sand", label: "Sandfarben" }] },
          { id: "addons", title: "Was möchten Sie zur Ausstattung hinzufügen? (Mehrfachauswahl möglich)", type: "checkbox", options: [{ value: "pavilion", label: "Schiebebare Poolüberdachung" }, { value: "heating", label: "Wärmepumpe (Wassererwärmung)" }, { value: "cleaner", label: "Poolroboter zur automatischen Reinigung" }, { value: "lighting", label: "LED-Beleuchtung" }] }
        ];

        let currentStep`
  );

  fs.writeFileSync(path.join(ROOT, "index.html"), html);
}

function patchPoolQuiz() {
  let jsx = fs.readFileSync(path.join(ROOT, "src/components/PoolQuiz.jsx"), "utf8");
  jsx = patchPoolData(jsx);

  jsx = jsx.replace(
    /const QUESTIONS = \[[\s\S]*?\];\n\nconst ADDON_ITEMS/,
    `const COLOR_LABELS = ${JSON.stringify(COLOR_LABELS, null, 2)};

const QUESTIONS = [
  {
    id: "budget",
    title: "Wie hoch ist Ihr geplantes Budget für das Poolbecken?",
    subtitle: "Wir schlagen Modelle in Ihrer Preisklasse vor",
    type: "radio",
    options: [
      { value: "economy", label: "Economy / Einstieg — bis 3.400 €", description: "Iceland, Phoebus, Lunaris, Italien und weitere attraktive Modelle" },
      { value: "optimal", label: "Optimal — 3.400 – 4.200 €", description: "Nova, Aurora, Nightfall, Sunrise, Twilight und vergleichbare Becken" },
      { value: "premium", label: "Premium / Flaggschiff — ab 4.300 €", description: "Orion, Kuba, Portugal, Celeste, Eclipse und Top-Modelle" },
    ],
  },
  {
    id: "shape",
    title: "Welche Beckenform bevorzugen Sie?",
    subtitle: "Die Form bestimmt Stil und Funktionalität",
    type: "radio",
    options: [
      { value: "compact", label: "Rundes Tauchbecken", description: "Kompaktes Becken für Spa, Terrasse oder kleines Grundstück" },
      { value: "rectangular", label: "Klassisches Rechteck", description: "Klare Geometrie, maximale Schwimmlänge" },
      { value: "rounded", label: "Mit rundem / römischem Kopfende", description: "Dekorativer Vorsprung oder halbrunder Einstieg am Kopfende" },
      { value: "capsule", label: "Ovale Kapsel", description: "Gerade lange Seiten und sanft abgerundete Enden" },
      { value: "organic", label: "Freie organische Form", description: "Geschwungene Linien und individuelle Designer-Geometrie" },
    ],
  },
  {
    id: "size",
    title: "Welche ungefähre Größe benötigen Sie?",
    subtitle: "Geben Sie die gewünschte Beckenlänge an",
    type: "radio",
    options: [
      { value: "small", label: "Kompakt", description: "Bis 6 Meter" },
      { value: "medium", label: "Mittel / Familie", description: "6 – 8 Meter" },
      { value: "large", label: "Großzügig / Sport", description: "Über 8 Meter" },
    ],
  },
  {
    id: "steps",
    title: "Welche Art von Einstieg und Stufen bevorzugen Sie?",
    subtitle: "Stufen beeinflussen Komfort und Erscheinungsbild",
    type: "radio",
    options: [
      { value: "corner_steps", label: "Kompakte Eckstufen", description: "Einstieg in der Ecke oder am Beckenrand — maximale Schwimmfläche" },
      { value: "wide_entry", label: "Breiter Einstieg", description: "Stufen über die gesamte Breite, symmetrisch oder als Paradeeinstieg" },
      { value: "roman_steps", label: "Römische / halbrunde Stufen", description: "Klassischer eleganter Einstieg mit sanfter Rundung" },
      { value: "relax_zone", label: "Relaxzone / flacher Einstieg", description: "Strandeinstieg, Sitzbank oder Lounge-Bereich im Wasser" },
    ],
  },
  {
    id: "filtration",
    title: "Welchen Filtertyp planen Sie?",
    subtitle: "Der Filtertyp bestimmt Wasserspiegel und Optik",
    type: "radio",
    options: [
      { value: "skimmer", label: "Skimmer", description: "Wasserspiegel leicht unter dem Beckenrand" },
      { value: "overflow", label: "Überlauf / Spiegelbecken", description: "Wasser bündig mit dem Boden — Infinity-Effekt" },
    ],
  },
  {
    id: "color",
    title: "Welche Beckenfarbe wünschen Sie?",
    subtitle: "Die GFK-Farbe beeinflusst den Wasserton",
    type: "radio",
    options: [
      { value: "blau", label: "Azurblau", description: "Klassischer Resort-Look" },
      { value: "weiss", label: "Kristallweiß", description: "Türkiser Wassereffekt" },
      { value: "grau", label: "Hellgrau", description: "Modernes Minimaldesign" },
      { value: "sand", label: "Sandfarben", description: "Tropischer Strand-Look" },
    ],
  },
  {
    id: "addons",
    title: "Was möchten Sie zur Ausstattung hinzufügen?",
    subtitle: "Optional — eine oder mehrere Optionen wählbar",
    type: "checkbox",
    options: [
      { value: "pavilion", label: "Schiebebare Poolüberdachung", description: "Ganzjährige Nutzung" },
      { value: "heating", label: "Wärmepumpe", description: "Wassererwärmung zu jeder Jahreszeit" },
      { value: "cleaner", label: "Poolroboter", description: "Automatische Beckenreinigung" },
      { value: "lighting", label: "LED-Beleuchtung", description: "Mehrfarbige Poolbeleuchtung" },
    ],
  },
];

const ADDON_ITEMS`
  );

  jsx = jsx.replace(
    /pavilion:.*\n  lighting:.*\n\};/,
    `pavilion: '🌤️ Poolüberdachung "Eco Classic" — ab 5.750 €',
  heating: "🔥 Inverter-Wärmepumpe Aquajoy Model A 9 — ab 1.650 €",
  cleaner: "🤖 Aquajoy Cyclone C1 Pro (Kabellos) — ab 600 €",
  lighting: "💡 Schwimmbad LED Lampe RGBW — ab 110 €",
};`
  );

  const ui = [
    ["Шаг {currentStep + 1} из {totalSteps}", "Schritt {currentStep + 1} von {totalSteps}"],
    ["Лучшее совпадение", "Beste Übereinstimmung"],
    ["Совпадение {pool.matchPercentage}%", "Übereinstimmung {pool.matchPercentage} %"],
    ["✓ Модель доступна в вашем любимом", "✓ Modell erhältlich in Ihrer Wunschfarbe"],
    [" цвете.", "."],
    ["Перейти к товару", "Zum Produkt"],
    ["Ваш идеальный бассейн готов!", "Ihr idealer Pool ist bereit!"],
    ["На основе ваших ответов мы подобрали GFK-чаши Constant Pool", "Auf Basis Ihrer Antworten haben wir passende Constant-Pool-GFK-Becken ausgewählt"],
    ["📦 Рекомендуемое оригинальное оборудование к вашей чаше", "📦 Empfohlenes Originalzubehör für Ihr Becken"],
    ["↻ Пройти квиз заново", "↻ Quiz erneut starten"],
    ["Constant Pool — Подбор GFK-чаши", "Constant Pool — GFK-Beckenauswahl"],
    ["Найдите идеальный бассейн", "Finden Sie den idealen Pool"],
    ["Ответьте на {QUESTIONS.length} вопросов — мы подберём лучшие модели", "Beantworten Sie {QUESTIONS.length} Fragen — wir empfehlen die besten Modelle"],
    ["Назад", "Zurück"],
    ["Показать результат", "Ergebnis anzeigen"],
    ["Далее", "Weiter"],
    ["const userColor = answers.color;", "const userColor = COLOR_LABELS[answers.color] || answers.color;"],
  ];
  for (const [from, to] of ui) jsx = jsx.split(from).join(to);

  fs.writeFileSync(path.join(ROOT, "src/components/PoolQuiz.jsx"), jsx);
}

function patchLayout() {
  // layout.tsx is updated directly in the repo
}

function patchReadme() {
  fs.writeFileSync(
    path.join(ROOT, "README.md"),
    `# Constant Pool Quiz

Interaktiver Quiz-Konfigurator zur Auswahl des passenden GFK-Poolbeckens.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- Bereit für Deployment auf **Vercel**

## Start

\`\`\`bash
npm install
npm run dev
\`\`\`

Öffnen Sie [http://localhost:3000](http://localhost:3000).

Für die eigenständige HTML-Version öffnen Sie \`index.html\` im Browser.

## Projektstruktur

\`\`\`
index.html                  # Eigenständiger Quiz-Konfigurator (Deutsch)
src/
├── app/                    # App Router (Layout, Page, Styles)
├── components/
│   └── PoolQuiz.jsx        # React-Komponente des Quiz
└── images/                 # Produktbilder (via public/images verlinkt)
\`\`\`

## Anpassung

- **Becken:** Array \`POOLS_DATA\` in \`index.html\` oder \`src/components/PoolQuiz.jsx\`
- **Fragen:** Array \`QUESTIONS\` in denselben Dateien
- **Produktlinks:** Feld \`productUrl\` je Becken

## Deployment auf Vercel

\`\`\`bash
npx vercel
\`\`\`

Oder Repository über [vercel.com/new](https://vercel.com/new) verbinden.
`
  );
}

patchIndexHtml();
patchPoolQuiz();
patchLayout();
patchReadme();
console.log("German translation applied.");
