# Europa Pool Quiz

Interaktiver Quiz-Konfigurator zur Auswahl des passenden GFK-Poolbeckens.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- Bereit für Deployment auf **Vercel**

## Start

```bash
npm install
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000).

Für die eigenständige HTML-Version öffnen Sie `index.html` im Browser.

## Projektstruktur

```
index.html                  # Eigenständiger Quiz-Konfigurator (Deutsch)
src/
├── app/                    # App Router (Layout, Page, Styles)
├── components/
│   └── PoolQuiz.jsx        # React-Komponente des Quiz
└── images/                 # Produktbilder in public/images/
```

## Anpassung

- **Becken:** Array `POOLS_DATA` in `index.html` oder `src/components/PoolQuiz.jsx`
- **Fragen:** Array `QUESTIONS` in denselben Dateien
- **Produktlinks:** Feld `productUrl` je Becken

## Deployment auf Vercel

```bash
npx vercel
```

Oder Repository über [vercel.com/new](https://vercel.com/new) verbinden.
