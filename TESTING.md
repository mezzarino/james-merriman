# Testing Strategy

This project uses a **lightweight, behaviour‑focused testing strategy** designed for a content‑driven Next.js App Router site.

The goal is to catch **real regressions** (accessibility, interaction, navigation, forms) without introducing brittle, implementation‑specific, or animation‑driven tests.

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

#### **SocialLinks**

- Accessible names for icon‑only links
- Correct link semantics
- No WCAG violations

---

#### **AccessibleAccordion**

- Renders FAQ questions and heading
- Expands/collapses answers via click
- Maintains correct ARIA attributes for disclosure
- No basic accessibility violations

---

#### **LazyRender**

- Renders a placeholder before intersection
- Loads children only after the element enters view
- Supports client-only rendering without layout shift
- Accessible fallback state when not yet visible

---

#### **FigureImage**

- Renders image and caption together
- Shows loading placeholder until `onLoad`
- Removes placeholder after image load
- Preserves accessible alt text

---

#### **BlogPostList**

- Renders post title, description, and author metadata
- Supports list navigation and content preview
- Uses stable `next/image` and lazy loading mocks in tests
- No basic accessibility violations

---

#### **ContactForm**

- Required‑field validation
- Focus management on validation errors
- Successful submission flow
- Accessibility compliance (WCAG 2.1 AA)

---

#### **AdvancedGallery**

- Images render from provided data
- Category filters correctly include/exclude images
- “Latest photos” resets filters
- Clicking an image opens the lightbox
- No basic accessibility violations

**Intentionally not tested:**

- Masonry layout
- Animation timing
- Skeleton loaders
- Cloudinary URL generation

---

#### **Lightbox**

- Renders as an accessible dialog
- Keyboard navigation:
  - `Escape` closes
  - Arrow keys navigate
- Next / previous controls work
- No accessibility violations

**Intentionally not tested:**

- Drag physics / swipe thresholds
- Animation transitions
- Image loading effects
- Cloudinary transformations

These behaviours are validated visually and are intentionally excluded to avoid brittle tests.

---

### ✅ Layout & Accessibility

- Skip‑to‑content link exists and targets `<main>`
- `<main>` landmark is present
- Reduced‑motion handling does not break rendering
- Layout components have no WCAG violations

---

### ✅ Pages (Accessibility Regression)

- **Home page**
  - No WCAG violations
- **Contact page**
  - No WCAG violations

> Page‑level tests intentionally focus on **accessibility only**.
> Content correctness and routing are covered indirectly by component tests and manual QA.

---

### ✅ Core Content

#### **BlogContent**

- Main content renders
- Title, author, and parsed HTML appear
- Links render correctly
- No accessibility violations

---

### ✅ CommentForm

The comment form intentionally has **lighter coverage** than the main contact form.

- Validation and submission logic are handled by well‑tested libraries  
  (`react-hook-form`, `zod`, `shadcn/ui`)
- The form is rendered within blog pages that already have page‑level
  accessibility regression tests

As a safeguard, **CommentForm includes a single accessibility regression test**
using `jest-axe` to ensure labels, ARIA attributes, contrast, and programmatic
field purpose remain compliant with WCAG 2.1 AA.

---

## What We Do NOT Test

The following are intentionally **not** tested:

- Tailwind CSS classes or layout
- Framer Motion animations or transitions
- Cloudinary integration details
- Image loading strategies
- Snapshot tests

These areas are either:

- Visual concerns better handled by manual review, or
- Third‑party behaviour already covered by upstream libraries

---

## Guiding Principles

- ✅ Test **what users rely on**
- ✅ Test **accessibility and interaction**
- ❌ Avoid testing implementation details
- ❌ Avoid snapshot‑driven development
- ❌ Avoid animation‑coupled assertions

---

## Notes on App Router Testing

- App Router pages are async Server Components
- Page‑level tests resolve pages before rendering
- Some React warnings are expected in unit tests and do not indicate production issues
- Accessibility tests are wrapped in `act()` where required

---

✅ This strategy provides **high confidence**, **low maintenance**, and **production‑grade coverage** for a content‑driven site.
