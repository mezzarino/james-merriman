# James Merriman – Travel Writing Blog

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC)
![ShadcnUI](https://img.shields.io/badge/shadcn-ui-000000)
![ESLint](https://img.shields.io/badge/ESLint-9-purple)
![pnpm](https://img.shields.io/badge/pnpm-latest-F69220)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, fast, and fully type‑safe personal writing/blogging platform built with **Next.js 15**, **TypeScript**, and **Wisp** as the headless CMS. Designed for speed, accessibility, and excellent developer experience.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🧪 Development](#-development)
- [✅ Linting & Formatting](#-linting--formatting)
- [📝 Content (Wisp CMS)](#-content-wisp-cms)
- [📁 Project Structure](#-project-structure)
- [🚀 Build for Production](#-build-for-production)
- [📄 License](#-license)

---

## ✨ Features

- ⚡ **Next.js 15** with App Router & Turbopack
- 📝 **Wisp CMS** for blog management
- 🎨 **Tailwind CSS** styling
- 🧩 **Shadcn UI** component library
- 🛡️ **TypeScript** for full type safety
- 🔍 **ESLint (Flat Config)** for strict code analysis
- 🅰️ **Optimized fonts** via `next/font`
- 🌗 Dark mode support
- 📱 Fully responsive UI
- 🚀 SEO-friendly metadata

---

## 🛠️ Tech Stack

### Framework

- **Next.js 15**: App Router, Turbopack, TypeScript

### Content Management

- **Wisp**: Markdown-friendly CMS

### Styling & UI

- **Tailwind CSS**
- **Shadcn UI**
- **next/font** optimization

### Tooling

- **TypeScript**
- **ESLint (Flat Config)**
- **pnpm** package manager

---

## 📦 Installation

```bash
git clone https://github.com/mezzarino/james-merriman
cd james-merriman
pnpm install
```

---

## 🧪 Development

Start development server:

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

Fix issues:

```bash
pnpm lint:fix
```

Format code:

```bash
pnpm format
```

---

## 📝 Content (Wisp CMS)

Content is managed through **Wisp**, which exposes an API consumed by the blog.

Learn more: https://wisp.blog

---

## 📁 Project Structure

```
src/
  app/
  components/
  lib/
  styles/
public/
tailwind.config.ts
eslint.config.mjs
```

---

## 🚀 Build for Production

```bash
pnpm build
pnpm start
```
