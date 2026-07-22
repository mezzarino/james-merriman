# James Merriman – Travel Writer

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3-06B6D4)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-000000)
![ESLint](https://img.shields.io/badge/ESLint-9-purple)
![pnpm](https://img.shields.io/badge/pnpm-latest-F69220)
![License](https://img.shields.io/badge/License-Source--Available-blue)

A modern, fast, and accessibility‑focused personal travel writing **and photography** platform built with **Next.js 16**, **TypeScript**, **Cloudinary**, and **Wisp** as a headless CMS.
Designed for performance, semantic HTML, WCAG 2.1 AA accessibility, and a calm developer experience.

**The project is intentionally editorial in nature, with no focus on advertising, tracking, or growth‑driven monetisation.**

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
- [📸 Photography](#-photography)
- [📁 Project Structure](#-project-structure)
- [🚀 Build for Production](#-build-for-production)
- [📄 License](#-license)

---

## ✨ Features

- ⚡ **Next.js 16** with App Router
- 📝 **Wisp CMS** for long‑form writing
- 📸 **Photography gallery** with filtering and lightbox
- ☁️ **Cloudinary** image delivery with dynamic transforms and watermarking
- 🎨 **Tailwind CSS** styling
- 🧩 **shadcn/ui** component primitives
- 🛡️ **TypeScript** end‑to‑end type safety
- 🔍 **ESLint (Flat Config)** with strict rules
- 🅰️ **Accessible by design** (WCAG 2.1 AA)
- 📱 Fully responsive layout
- 🚀 SEO‑friendly metadata, Open Graph, and structured data

---

## 🛠️ Tech Stack

### Framework

- **Next.js 16** – App Router, Server Components, Metadata API

### Content & Media

- **Wisp** – Markdown‑first headless CMS for writing
- **Cloudinary** – Image hosting, optimisation, and transformations

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
- Keyboard‑friendly navigation (including galleries and lightbox)
- Reduced‑motion support
- Accessibility statement included

Automated checks (axe, Silktide) are supplemented with manual review.

---

## 🧪 Testing & Quality

The project uses **behaviour‑focused testing**, not snapshot testing.

### Tooling

- **Vitest** (unit tests and coverage reporting)
- **@testing-library/react**
- **@testing-library/user-event**
- **jest‑axe** (accessibility regression testing)

### Coverage focus

- Forms (validation, focus management)
- Core content rendering
- Layout & landmarks
- Photography gallery and lightbox behaviour
- Accessibility regressions at component and page level

### Coverage

Test coverage reports can be generated with:

```bash
pnpm test:coverage
```

### CI

GitHub Actions enforce:

- ✅ Linting
- ✅ Formatting
- ✅ Tests
- ✅ Production build

Deployments to Vercel are **blocked if CI fails**.

See `TESTING.md` for full details.

---

## 📦 Installation

```bash
git clone https://github.com/mezzarino/james-merriman
cd james-merriman
corepack enable
corepack prepare pnpm@11.15.0 --activate
pnpm install
```

> Note: this project uses pnpm 11.15.0 for local development and deployments. Using a different pnpm version can cause lockfile or Vercel install issues.

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

## 📸 Photography

The photography section is powered by **Cloudinary** and includes:

- Server‑rendered gallery with ISR caching
- Tag‑based category filtering
- Accessible, keyboard‑friendly lightbox
- Progressive image loading and preloading
- Central watermarking via Cloudinary overlays

Individual image pages include:

- Canonical URLs
- Open Graph images
- `ImageObject` structured data
- Licencing metadata

---

## 📁 Project Structure

```
src/
  app/            # App Router pages & layouts
  components/     # UI, gallery, and content components
  hooks/          # Custom React hooks
  lib/            # Utilities & helpers (Cloudinary, CMS, SEO)
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

This project is released under a **Source‑Available License**.

You may view the source code for personal or internal evaluation purposes,
but copying, modification, redistribution, or commercial use is not permitted
without explicit written permission.

See the [LICENSE](./LICENSE) file for full terms.
