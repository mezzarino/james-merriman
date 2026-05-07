# James Merriman – Travel Writing Blog

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-000000)
![ESLint](https://img.shields.io/badge/ESLint-9-purple)
![pnpm](https://img.shields.io/badge/pnpm-latest-F69220)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, fast, and accessibility‑focused personal travel writing platform built with **Next.js 16**, **TypeScript**, and **Wisp** as a headless CMS.  
Designed for performance, semantic HTML, WCAG 2.1 AA accessibility, and a calm developer experience.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [♿ Accessibility](#-accessibility)
- [🧪 Testing & Quality](#-testing--quality)
- [📦 Installation](#-installation)
- [🧪 Development](#-development)
- [✅ Linting & Formatting](#-linting--formatting)
- [📝 Content (Wisp CMS)](#-content-wisp-cms)
- [📁 Project Structure](#-project-structure)
- [🚀 Build for Production](#-build-for-production)
- [📄 License](#-license)

---

## ✨ Features

- ⚡ **Next.js 16** with App Router
- 📝 **Wisp CMS** for long‑form writing
- 🎨 **Tailwind CSS** styling
- 🧩 **shadcn/ui** component primitives
- 🛡️ **TypeScript** end‑to‑end type safety
- 🔍 **ESLint (Flat Config)** with strict rules
- 🅰️ **Accessible by design** (WCAG 2.1 AA)
- 📱 Fully responsive layout
- 🌗 Dark mode support
- 🚀 SEO‑friendly metadata & structured data

---

## 🛠️ Tech Stack

### Framework
- **Next.js 16** – App Router, Server Components, Metadata API

### Content Management
- **Wisp** – Markdown‑first headless CMS

### Styling & UI
- **Tailwind CSS**
- **shadcn/ui**
- **next/font** for optimized fonts

### Tooling
- **TypeScript**
- **ESLint (Flat Config)**
- **pnpm** package manager

---

## ♿ Accessibility

Accessibility is treated as a first‑class concern:

- Semantic HTML throughout (lists, landmarks, headings)
- WCAG 2.1 AA–compliant forms
- Proper programmatic field purpose (`autocomplete`)
- Visible focus states and sufficient control contrast
- Keyboard‑friendly navigation
- Reduced‑motion support
- Accessibility statement included

Automated checks (axe, Silktide) are supplemented with manual review.

---

## 🧪 Testing & Quality

The project uses **behaviour‑focused testing**, not snapshot testing.

### Tooling
- **Vitest**
- **@testing-library/react**
- **@testing-library/user-event**
- **jest‑axe** (accessibility regression testing)

### Coverage focus
- Forms (validation, focus management)
- Core content rendering
- Layout & landmarks
- Accessibility regressions at component and page level

### CI
GitHub Actions enforce:
- ✅ Linting
- ✅ Formatting
- ✅ Tests
- ✅ Production build

Deployments to Vercel are **blocked if CI fails**.

See `TESTING.md` for details.

---

## 📦 Installation

```bash
git clone https://github.com/mezzarino/james-merriman
cd james-merriman
pnpm install
```

---

## 🧪 Development

Start the development server:

```bash
pnpm dev
```

Visit:

```
http://localhost:3000
```

---

## ✅ Linting & Formatting

Run ESLint:

```bash
pnpm lint
```

Check formatting:

```bash
pnpm format:check
```

Format code:

```bash
pnpm format
```

---

## 📝 Content (Wisp CMS)

Content is managed via **Wisp**, exposed through a JSON API and rendered with custom components.

Learn more:  
https://wisp.blog

---

## 📁 Project Structure

```
src/
  app/            # App Router pages & layouts
  components/     # UI and content components
  hooks/          # Custom React hooks
  lib/            # Utilities & helpers
  styles/         # Global styles
public/
eslint.config.mjs
tailwind.config.ts
vitest.config.ts
```

---

## 🚀 Build for Production

```bash
pnpm build
pnpm start
```

---

## 📄 License

MIT
