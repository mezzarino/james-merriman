# Testing Strategy

This project uses a lightweight, behaviour‑focused testing strategy designed for a content‑driven Next.js site.

The goal is to catch real regressions (accessibility, forms, layout) without introducing brittle or noisy tests.

---

## Tooling

- **Vitest** – test runner
- **@testing-library/react** – component testing via user behaviour
- **@testing-library/user-event** – realistic user interactions
- **jest-axe** – automated accessibility regression testing
- **JSDOM** – DOM environment for unit tests

Playwright is optional and not required for core coverage.

---

## What We Test

### ✅ Components

- **SocialLinks**
  - Accessible names for icon‑only links
  - No WCAG violations

- **ContactForm**
  - Required‑field validation
  - Focus management on error
  - Successful submission
  - Accessibility compliance

### ✅ Layout & Accessibility

- Skip‑to‑content link exists and targets `<main>`
- `<main>` landmark is present
- Reduced‑motion handling does not break rendering

### ✅ Pages

- Home page: no accessibility violations
- Contact page: no accessibility violations

### ✅ Core Content

- **BlogContent**
  - Main content renders
  - Title, author, and parsed HTML appear
  - No accessibility violations

---

## What We Do NOT Test

The following are intentionally not tested:

- Tailwind CSS classes or layout
- Snapshot tests
