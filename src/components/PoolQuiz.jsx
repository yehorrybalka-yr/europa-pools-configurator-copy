"use client";

import React, { useEffect, useState } from "react";
import { trackMetaContact, trackMetaInitiateCheckout, trackMetaLead } from "@/lib/meta-pixel";

const POOLS_DATA = [
  {
    id: "gfk-pool-iceland",
    name: "GFK Pool \"Iceland\"",
    description: "Kompaktes rundes Tauchbecken mit in die Beckenwand integrierten Stufen. Ideal für kleine Grundstücke, Spa-Bereiche oder als Ergänzung zur Sauna.",
    basePrice: "ab 2.000 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-iceland/",
    imageUrl: "/images/Iceland.png",
    tags: { budget: "economy", shape: "compact", size: "small", steps: "corner_steps", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-nova",
    name: "GFK Pool \"Nova\"",
    description: "Klassischer Rechteckpool mit breiten Stufen über die gesamte kurze Seite — großzügiger und komfortabler Einstieg für die ganze Familie.",
    basePrice: "ab 4.800 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-nova/",
    imageUrl: "/images/Nova.png",
    tags: { budget: "optimal", shape: "rectangular", size: "medium", steps: "wide_entry", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-lunaris",
    name: "GFK Pool \"Lunaris\"",
    description: "Rechteckiges Becken mit kompakten Eckstufen — maximale Schwimmfläche bei minimalem Einstiegsbereich.",
    basePrice: "ab 4.000 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-lunaris/",
    imageUrl: "/images/Lunaris.png",
    tags: { budget: "economy", shape: "rectangular", size: "medium", steps: "corner_steps", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-nebula",
    name: "GFK Pool \"Nebula\"",
    description: "Rechteckpool mit mehrstufigen Eckstufen und integrierter Sitzbank zum Entspannen im Wasser.",
    basePrice: "ab 4.000 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-nebula/",
    imageUrl: "/images/Nebula.png",
    tags: { budget: "economy", shape: "rectangular", size: "medium", steps: "relax_zone", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-zenith",
    name: "GFK Pool \"Zenith\"",
    description: "Rechteckbecken mit abgeschrägten Ecken und markantem halbrunden römischem Einstieg an einem Kopfende.",
    basePrice: "ab 3.150 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-zenith/",
    imageUrl: "/images/Zenith.png",
    tags: { budget: "economy", shape: "rounded", size: "medium", steps: "roman_steps", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-celeste",
    name: "GFK Pool \"Celeste\"",
    description: "Schmaler Rechteckpool zum Bahnenschwimmen mit symmetrischen Eckstufen an beiden Enden.",
    basePrice: "ab 5.200 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-%d1%81eleste/",
    imageUrl: "/images/Celeste.png",
    tags: { budget: "premium", shape: "rectangular", size: "large", steps: "wide_entry", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-aurora",
    name: "GFK Pool \"Aurora\"",
    description: "Schlichter Rechteckpool mit stufenloser Breite an der kurzen Seite — klarer architektonischer Stil.",
    basePrice: "ab 4.800 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-aurora/",
    imageUrl: "/images/Aurora.png",
    tags: { budget: "optimal", shape: "rectangular", size: "medium", steps: "wide_entry", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-italien",
    name: "GFK Pool \"Italien\"",
    description: "Rechteckbecken mit halbrundem römischem Vorsprung am Kopfende und klassischen Halbkreisstufen im Inneren.",
    basePrice: "ab 4.200 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-italien/",
    imageUrl: "/images/Italien.png",
    tags: { budget: "economy", shape: "rounded", size: "medium", steps: "roman_steps", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-kuba",
    name: "GFK Pool \"Kuba\"",
    description: "Rechteckpool mit symmetrischen Eckstufen an beiden Ecken einer Seite — zwei bequeme Einstiege.",
    basePrice: "ab 4.150 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-kuba/",
    imageUrl: "/images/Kuba.png",
    tags: { budget: "premium", shape: "rectangular", size: "medium", steps: "wide_entry", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-nightfall",
    name: "GFK Pool \"Nightfall\"",
    description: "Rechteckbecken mit breiten dreieckigen Eckstufen — platzsparend mit maximaler Schwimmlänge.",
    basePrice: "ab 4.500 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-nightfall/",
    imageUrl: "/images/Nightfall.png",
    tags: { budget: "optimal", shape: "rectangular", size: "medium", steps: "corner_steps", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-midnight",
    name: "GFK Pool \"Midnight\"",
    description: "Rechteckpool mit zentralem Einstieg an der langen Seite — einzigartige seitliche Einstiegszone, die Kopfenden bleiben frei.",
    basePrice: "ab 3.700 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-midnight/",
    imageUrl: "/images/Midnight.png",
    tags: { budget: "optimal", shape: "rectangular", size: "medium", steps: "corner_steps", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-spanien",
    name: "GFK Pool \"Spanien\"",
    description: "Rechteckbecken mit dekorativem Vorsprung am Kopfende, geschwungenen Eckstufen und integrierter Relaxzone.",
    basePrice: "ab 4.000 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-spanien/",
    imageUrl: "/images/Spanien.png",
    tags: { budget: "premium", shape: "rounded", size: "medium", steps: "relax_zone", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-sunrise",
    name: "GFK Pool \"Sunrise\"",
    description: "Klassischer Rechteckpool mit geraden Eckstufen — einfacher und funktionaler Familienpool.",
    basePrice: "ab 4.400 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-sunrise/",
    imageUrl: "/images/Sunrise.png",
    tags: { budget: "optimal", shape: "rectangular", size: "medium", steps: "corner_steps", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-australien",
    name: "GFK Pool \"Australien\"",
    description: "Rechteckbecken mit sanften halbrunden Eckstufen — weiche Einstiegslinien bei kompakter Fläche.",
    basePrice: "ab 4.300 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-australien/",
    imageUrl: "/images/Australien.png",
    tags: { budget: "economy", shape: "rectangular", size: "medium", steps: "corner_steps", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-orion",
    name: "GFK Pool \"Orion\"",
    description: "Premium-Rechteckbecken mit breitem symmetrischem Paradeeinstieg in der Mitte und Relaxzonen an den Seiten.",
    basePrice: "ab 7.500 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-orion/",
    imageUrl: "/images/Orion.png",
    tags: { budget: "premium", shape: "rectangular", size: "large", steps: "wide_entry", filtration: "overflow" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-twilight",
    name: "GFK Pool \"Twilight\"",
    description: "Rechteckbecken mit römischem Rundkopfende und integrierten Halbkreisstufen im Einstiegsbereich.",
    basePrice: "ab 3.700 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-twilight/",
    imageUrl: "/images/Twilight.png",
    tags: { budget: "optimal", shape: "rounded", size: "medium", steps: "roman_steps", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-phoebus",
    name: "GFK Pool \"Phoebus\"",
    description: "Rechteckbecken mit großer flachen Strandeinstiegszone — ideal für Kinder, Sonnenbaden und entspanntes Verweilen im Wasser.",
    basePrice: "ab 4.000 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-phoebus/",
    imageUrl: "/images/Phoebus.png",
    tags: { budget: "economy", shape: "rectangular", size: "medium", steps: "relax_zone", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-eclipse",
    name: "GFK Pool \"Eclipse\"",
    description: "Moderner Rechteckpool mit komplexen Eckstufen um die Ecke und integrierter Sitzbank zur Entspannung.",
    basePrice: "ab 4.300 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-eclipse/",
    imageUrl: "/images/Eclipse.png",
    tags: { budget: "premium", shape: "rectangular", size: "medium", steps: "relax_zone", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
  {
    id: "gfk-pool-portugal",
    name: "GFK Pool \"Portugal\"",
    description: "Ovale „Kapsel“ mit geraden langen Seiten und abgerundeten Enden. Stufen sind im langen Beckenrand integriert.",
    basePrice: "ab 5.000 €",
    productUrl: "https://www.europa-pool.com/produkt/gfk-pool-portugal/",
    imageUrl: "/images/Portugal.png",
    tags: { budget: "premium", shape: "capsule", size: "large", steps: "corner_steps", filtration: "skimmer" },
    availableColors: ["blau", "weiss", "grau", "sand"],
  },
];

const COLOR_LABELS = {
  "blau": "Azurblau",
  "weiss": "Kristallweiß",
  "grau": "Hellgrau",
  "sand": "Sandfarben"
};

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

const ADDON_ITEMS = {
  pavilion: '🌤️ Poolüberdachung "Eco Classic" — ab 5.750 €',
  heating: "🔥 Inverter-Wärmepumpe Aquajoy Model A 9 — ab 1.650 €",
  cleaner: "🤖 Aquajoy Cyclone C1 Pro (Kabellos) — ab 600 €",
  lighting: "💡 Schwimmbad LED Lampe RGBW — ab 110 €",
};

const MAX_SCORE = 15;

// Google Apps Script Web-App-URL (nach Deployment eintragen)
const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbzkHQ-2BjtFfEHu27NzyqhSC_glcb1u9q7uL9J-Mk6vhPb0oVlkqdg75uicdFpEZ9vQ/exec";

const CONTACT_STORAGE_KEY = "europa-pool-quiz-contact";
const CALL_PHONE_DISPLAY = "+49 176 288 589 27";
const CALL_PHONE_HREF = "tel:+4917628858927";
const EMAIL_HREF = "mailto:info@europa-pool.com";
const WHATSAPP_HREF = "https://wa.me/4917628858927";

const TOTAL_STEPS = QUESTIONS.length + 1;

function loadStoredContact() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (!raw) return null;
    const contact = JSON.parse(raw);
    if (contact?.name && contact?.phone && contact?.email) return contact;
    return null;
  } catch {
    return null;
  }
}

function saveStoredContact(contact) {
  localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contact));
}

function normalizeGermanPhone(phone) {
  return phone.replace(/[\s\-()./]/g, "");
}

function isValidGermanPhone(phone) {
  const cleaned = normalizeGermanPhone(phone);
  if (/^\+49[1-9]\d{6,12}$/.test(cleaned)) return true;
  if (/^0049[1-9]\d{6,12}$/.test(cleaned)) return true;
  if (/^0[1-9]\d{6,12}$/.test(cleaned)) return true;
  return false;
}

function isValidEmail(email) {
  const trimmed = email.trim();
  if (!trimmed.includes("@")) return false;
  const [local, domain] = trimmed.split("@");
  return Boolean(local && domain && domain.includes("."));
}

function getAnswerLabel(questionId, value) {
  const question = QUESTIONS.find((q) => q.id === questionId);
  if (!question) return value || "";
  if (question.type === "checkbox") {
    return (value || [])
      .map((v) => question.options.find((o) => o.value === v)?.label || v)
      .join(", ");
  }
  const option = question.options.find((o) => o.value === value);
  if (questionId === "color") return COLOR_LABELS[value] || value;
  return option?.label || value || "";
}

async function sendToGoogleSheets(contact, answers) {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn("GOOGLE_SCRIPT_URL ist nicht konfiguriert.");
    return { success: true, skipped: true };
  }

  const payload = {
    timestamp: new Date().toISOString(),
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    budget: getAnswerLabel("budget", answers.budget),
    shape: getAnswerLabel("shape", answers.shape),
    size: getAnswerLabel("size", answers.size),
    steps: getAnswerLabel("steps", answers.steps),
    filtration: getAnswerLabel("filtration", answers.filtration),
    color: getAnswerLabel("color", answers.color),
    addons: getAnswerLabel("addons", answers.addons || []),
  };

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Serverfehler");
  }

  return response.json();
}

function calculateResults(answers) {
  return POOLS_DATA.map((pool) => {
    let score = 0;
    if (pool.tags.budget === answers.budget) score += 4;
    if (pool.tags.shape === answers.shape) score += 3;
    if (pool.tags.filtration === answers.filtration) score += 3;
    if (pool.tags.size === answers.size) score += 3;
    if (pool.tags.steps === answers.steps) score += 2;
    const matchPercentage = Math.round((score / MAX_SCORE) * 100);
    return { ...pool, matchPercentage, score };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}

function ProgressBar({ currentStep, totalSteps }) {
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-500">
          Schritt {currentStep + 1} von {totalSteps}
        </span>
        <span className="font-semibold text-ocean-600">{progress}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ocean-600 to-aqua-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function OptionCard({ option, selected, type, onSelect }) {
  return (
    <label
      className={`group flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-4 transition-all duration-300 sm:p-5 ${
        selected
          ? "border-ocean-500 bg-ocean-50/70 shadow-md shadow-ocean-500/10"
          : "border-slate-200/80 bg-white/80 hover:border-ocean-300 hover:shadow-sm"
      }`}
    >
      <input
        type={type}
        checked={selected}
        onChange={onSelect}
        className="mt-1 h-4 w-4 shrink-0 border-slate-300 text-ocean-600 focus:ring-ocean-500"
      />
      <div className="min-w-0 flex-1">
        <span
          className={`block text-base font-semibold sm:text-lg ${
            selected ? "text-ocean-900" : "text-slate-800"
          }`}
        >
          {option.label}
        </span>
        {option.description && (
          <span className="mt-0.5 block text-sm text-slate-500">{option.description}</span>
        )}
      </div>
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          selected
            ? "border-ocean-500 bg-ocean-500"
            : "border-slate-300 group-hover:border-ocean-400"
        }`}
      >
        {selected && (
          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
          </svg>
        )}
      </div>
    </label>
  );
}

function PoolResultCard({ pool, userColor, rank }) {
  return (
    <a
      href={pool.productUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackMetaInitiateCheckout(pool.id, pool.name)}
      className="group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ocean-400 hover:shadow-xl hover:shadow-ocean-500/10"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-slate-100 sm:w-64 md:w-72 lg:w-80">
          <img
            src={pool.imageUrl}
            alt={pool.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          {rank === 1 && (
            <span className="absolute left-3 top-3 rounded-full bg-ocean-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              Beste Übereinstimmung
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-ocean-700 sm:text-xl">
                {pool.name}
              </h3>
              <span className="shrink-0 rounded-full border border-ocean-200 bg-ocean-50 px-2.5 py-1 text-xs font-semibold text-ocean-700">
                Übereinstimmung {pool.matchPercentage} %
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{pool.description}</p>

            {userColor && (
              <p className="mt-3 inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                ✓ Modell erhältlich in Ihrer Wunschfarbe{" "}
                <span className="font-bold">{userColor}</span>.
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-lg font-extrabold text-slate-900">{pool.basePrice}</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-ocean-600 transition-all group-hover:translate-x-1 group-hover:text-ocean-700">
              Zum Produkt
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function ContactButtons({ className = "" }) {
  const phoneIcon = (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  const emailIcon = (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const whatsappIcon = (
    <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  const buttons = [
    {
      id: "phone",
      href: CALL_PHONE_HREF,
      label: "Anrufen",
      sublabel: CALL_PHONE_DISPLAY,
      icon: phoneIcon,
      className:
        "border-2 border-transparent bg-gradient-to-r from-ocean-600 to-ocean-500 text-white shadow-md shadow-ocean-500/25 hover:from-ocean-700 hover:to-ocean-600",
    },
    {
      id: "email",
      href: EMAIL_HREF,
      label: "E-Mail schreiben",
      sublabel: "info@europa-pool.com",
      icon: emailIcon,
      className:
        "border-2 border-ocean-600 bg-white text-ocean-700 shadow-sm hover:bg-ocean-50",
    },
    {
      id: "whatsapp",
      href: WHATSAPP_HREF,
      label: "WhatsApp",
      sublabel: CALL_PHONE_DISPLAY,
      icon: whatsappIcon,
      className:
        "border-2 border-transparent bg-[#25D366] text-white shadow-md shadow-emerald-500/20 hover:bg-[#1ebe57]",
      external: true,
    },
  ];

  return (
    <div className={`mx-auto flex w-full max-w-md flex-col gap-3 ${className}`}>
      {buttons.map((btn) => (
        <a
          key={btn.id}
          href={btn.href}
          target={btn.external ? "_blank" : undefined}
          rel={btn.external ? "noopener noreferrer" : undefined}
          onClick={() => trackMetaContact(btn.id)}
          className={`flex w-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl px-4 py-3.5 text-center transition-all ${btn.className}`}
        >
          <span className="flex max-w-full items-center justify-center gap-2 text-sm font-bold sm:text-base">
            {btn.icon}
            <span className="truncate">{btn.label}</span>
          </span>
          <span className="max-w-full truncate text-xs font-medium opacity-85">{btn.sublabel}</span>
        </a>
      ))}
    </div>
  );
}

function ContactModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="w-full max-w-md max-h-[calc(100vh-2rem)] animate-fade-in-up overflow-y-auto rounded-3xl border border-white/60 bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 id="contact-modal-title" className="text-xl font-bold text-slate-900 sm:text-2xl">
              Kontaktieren Sie uns
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              Wählen Sie Ihren bevorzugten Kontaktweg — wir melden uns schnellstmöglich.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Schließen"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ContactButtons />
      </div>
    </div>
  );
}

function DirectContactBlock({ onOpen }) {
  return (
    <div className="mb-6 rounded-2xl border border-ocean-100 bg-gradient-to-br from-ocean-50/90 to-white p-4 text-center sm:mb-8 sm:p-5">
      <p className="text-sm font-semibold text-slate-800 sm:text-base">Schon einen Pool gewählt?</p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-3 inline-flex items-center justify-center rounded-xl border-2 border-ocean-500 bg-white px-5 py-2.5 text-sm font-semibold text-ocean-700 transition-all hover:bg-ocean-50"
      >
        Direkt kontaktieren
      </button>
    </div>
  );
}

function ContactScreen({ onBack, onSubmit, isSubmitting }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setPhoneError("");
    setEmailError("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) return;

    if (!isValidGermanPhone(trimmedPhone)) {
      setPhoneError(
        "Bitte geben Sie eine gültige deutsche Telefonnummer ein (z. B. +49 170 1234567 oder 0170 1234567)."
      );
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setEmailError(
        'Bitte geben Sie eine gültige E-Mail-Adresse ein (z. B. name@beispiel.de). Das Zeichen "@" ist erforderlich.'
      );
      return;
    }

    try {
      await onSubmit({
        name: trimmedName,
        phone: normalizeGermanPhone(trimmedPhone),
        email: trimmedEmail,
      });
    } catch {
      setSubmitError("Die Daten konnten nicht gespeichert werden. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 text-center sm:mb-8">
        <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">Fast geschafft!</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
          Bitte hinterlassen Sie Ihre Kontaktdaten — so erhalten Sie sofort Ihre persönliche
          Pool-Empfehlung auf Basis Ihrer Antworten.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Ihr Name
          </label>
          <input
            type="text"
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            placeholder="Max Mustermann"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Telefonnummer
          </label>
          <input
            type="tel"
            id="contact-phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError("");
            }}
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="+49 170 1234567"
            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:ring-2 ${
              phoneError
                ? "border-red-400 ring-2 ring-red-100"
                : "border-slate-200 focus:border-ocean-500 focus:ring-ocean-100"
            }`}
          />
          <p className="mt-1.5 text-xs text-slate-400">Format: +49 170 1234567 oder 0170 1234567</p>
          {phoneError && <p className="mt-2 text-xs font-medium text-red-600">{phoneError}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
            E-Mail-Adresse
          </label>
          <input
            type="email"
            id="contact-email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            required
            autoComplete="email"
            inputMode="email"
            placeholder="name@beispiel.de"
            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:ring-2 ${
              emailError
                ? "border-red-400 ring-2 ring-red-100"
                : "border-slate-200 focus:border-ocean-500 focus:ring-ocean-100"
            }`}
          />
          {emailError && <p className="mt-2 text-xs font-medium text-red-600">{emailError}</p>}
        </div>
        {submitError && <p className="text-sm font-medium text-red-600">{submitError}</p>}

        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 disabled:opacity-50 sm:px-5 sm:py-3"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-ocean-600 to-ocean-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ocean-500/25 transition-all hover:from-ocean-700 hover:to-ocean-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-3"
          >
            {isSubmitting ? "Wird gesendet…" : "Meine Ergebnisse anzeigen"}
            {!isSubmitting && (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function ResultsScreen({ answers, onRestart }) {
  const recommendedPools = calculateResults(answers);
  const selectedAddons = answers.addons || [];
  const userColor = COLOR_LABELS[answers.color] || answers.color;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 text-center sm:mb-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-600 to-aqua-400 text-2xl shadow-lg shadow-ocean-500/25">
          ✨
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Ihr idealer Pool ist bereit!
        </h2>
        <p className="mt-2 text-base text-slate-500">
          Auf Basis Ihrer Antworten haben wir passende Europa-Pool-GFK-Becken ausgewählt
        </p>
      </div>

      <ContactButtons className="mb-8 sm:mb-10" />

      <div className="space-y-4 sm:space-y-5">
        {recommendedPools.map((pool, index) => (
          <PoolResultCard key={pool.id} pool={pool} userColor={userColor} rank={index + 1} />
        ))}
      </div>

      {selectedAddons.length > 0 && (
        <div className="mt-8 rounded-2xl border border-ocean-100 bg-gradient-to-br from-ocean-50/80 to-aqua-300/10 p-5 sm:mt-10 sm:p-6">
          <h4 className="mb-4 text-lg font-bold text-slate-800">
            📦 Empfohlenes Originalzubehör für Ihr Becken
          </h4>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {selectedAddons.map((addon) => (
              <li
                key={addon}
                className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 p-3.5 text-sm font-medium text-slate-700 shadow-sm"
              >
                {ADDON_ITEMS[addon]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 w-full rounded-xl border-2 border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 transition-all hover:border-ocean-300 hover:bg-ocean-50 hover:text-ocean-700"
      >
        ↻ Quiz erneut starten
      </button>
    </div>
  );
}

export default function PoolQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [phase, setPhase] = useState("quiz");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState("forward");
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    if (phase === "results") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [phase]);

  const question = QUESTIONS[currentStep];
  const isLastStep = currentStep === QUESTIONS.length - 1;
  const canProceed = question.type === "radio" ? Boolean(answers[question.id]) : true;
  const showDirectContact = phase === "quiz" && currentStep === 0;

  const handleRadioChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (questionId, value) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [questionId]: next };
    });
  };

  const nextStep = async () => {
    if (isLastStep) {
      const storedContact = loadStoredContact();
      if (storedContact) {
        setIsSubmitting(true);
        try {
          await sendToGoogleSheets(storedContact, answers);
          setPhase("results");
          setDirection("forward");
        } catch {
          setPhase("results");
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setPhase("contact");
        setDirection("forward");
      }
    } else {
      setDirection("forward");
      setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection("back");
      setCurrentStep((s) => s - 1);
    }
  };

  const backFromContact = () => {
    setPhase("quiz");
    setDirection("back");
    setCurrentStep(QUESTIONS.length - 1);
  };

  const handleContactSubmit = async (contact) => {
    setIsSubmitting(true);
    try {
      await sendToGoogleSheets(contact, answers);
      saveStoredContact(contact);
      trackMetaLead();
      setPhase("results");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setPhase("quiz");
    setCurrentStep(0);
    setAnswers({});
    setDirection("forward");
  };

  const displayStep =
    phase === "results" ? TOTAL_STEPS - 1 : phase === "contact" ? QUESTIONS.length : currentStep;
  const animationClass =
    direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left";

  return (
    <div className="mx-auto w-full max-w-3xl">
      <ContactModal open={contactModalOpen} onClose={() => setContactModalOpen(false)} />

      <div className="mb-8 text-center sm:mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-ocean-50 px-4 py-1.5 text-sm font-medium text-ocean-700">
          <span>💧</span>
          Europa Pool — GFK-Beckenauswahl
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Finden Sie den idealen Pool
        </h1>
        <p className="mt-2 text-base text-slate-500 sm:text-lg">
          Beantworten Sie {QUESTIONS.length} Fragen — wir empfehlen die besten Modelle
        </p>
      </div>

      {showDirectContact && (
        <DirectContactBlock onOpen={() => setContactModalOpen(true)} />
      )}

      <div className="mb-6 sm:mb-8">
        <ProgressBar currentStep={displayStep} totalSteps={TOTAL_STEPS} />
      </div>

      <div
        key={phase === "results" ? "results" : phase === "contact" ? "contact" : currentStep}
        className={`rounded-3xl border border-white/60 bg-white/70 p-5 shadow-xl shadow-ocean-500/5 backdrop-blur-sm sm:p-8 md:p-10 ${animationClass}`}
      >
        {phase === "results" ? (
          <ResultsScreen answers={answers} onRestart={handleRestart} />
        ) : phase === "contact" ? (
          <ContactScreen
            onBack={backFromContact}
            onSubmit={handleContactSubmit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <>
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{question.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500 sm:text-base">{question.subtitle}</p>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {question.options.map((opt) => {
                const isSelected =
                  question.type === "radio"
                    ? answers[question.id] === opt.value
                    : (answers[question.id] || []).includes(opt.value);

                return (
                  <OptionCard
                    key={opt.value}
                    option={opt}
                    type={question.type}
                    selected={isSelected}
                    onSelect={() =>
                      question.type === "radio"
                        ? handleRadioChange(question.id, opt.value)
                        : handleCheckboxChange(question.id, opt.value)
                    }
                  />
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:mt-10">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-0 sm:px-5 sm:py-3"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Zurück
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={!canProceed || isSubmitting}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-ocean-600 to-ocean-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ocean-500/25 transition-all hover:from-ocean-700 hover:to-ocean-600 hover:shadow-ocean-500/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:px-6 sm:py-3"
              >
                {isSubmitting ? "Wird geladen…" : "Weiter"}
                {!isSubmitting && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
