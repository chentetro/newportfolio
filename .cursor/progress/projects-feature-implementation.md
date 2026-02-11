# 🎯 Projects Feature (Cards + Detail Pages) - Progress Tracker

## 📋 Project Overview

**Objective**: Implement a Projects feature where each project is displayed as a card with an image and hover overlay (technologies and languages). Clicking a card navigates to a dynamic project page that shows full details and a GitHub link, using a shared content source and strict accessibility/styling rules.

**Context**: The portfolio currently has a minimal `/projects` page. This feature will turn it into a content-driven, accessible, monochrome-styled projects section that follows your global styling, component testing, and progress-tracking standards.

**Status**: 🔄 In Progress  
**Phase**: 1 of 5  
**Progress**: 14% (1/7 steps completed)

**Success Metrics**:

- All projects rendered from a single, typed data source in `content/`.
- Each project card shows the correct image and reveals technologies & languages on hover.
- Clicking a card navigates to `/projects/[slug]` which renders the correct project data.
- All interactive elements are accessible (ARIA labels, alt text, focus states, 44x44 touch targets).
- Tests cover heading hierarchy, semantic structure, attributes, and edge cases.

**Timeline**: 1–2 iterations, depending on number of projects and test depth.

**Scope**:

- **Included**:
  - Project types/interfaces in `types/`.
  - Projects content in `content/`.
  - `ProjectCard` component.
  - `/projects` index page implementation.
  - `/projects/[slug]` dynamic detail pages.
  - Tests aligned with component testing standards.
- **Excluded**:
  - CMS / external data sources.
  - Advanced filtering or search UI.
  - Heavy animation beyond simple hover/focus transitions.

---

## 🎯 Implementation Plan

### Phase 1 – Data & Types Setup

- Define a `Project` interface and supporting union types (e.g., `Technology`) in `types/project.ts`.
- Include fields: `slug`, `title`, `shortDescription`, `description`, `technologies`, `languages`, `githubUrl`, `imageSrc`, and `imageAlt`.
- Create `content/projects.ts` exporting a typed `projects: Project[]` array with realistic data.

### Phase 2 – Project Card Component

- Create `ProjectCard` in `app/components/ProjectCard.tsx` that accepts a `Project` prop.
- Render an image (`next/image`) using `imageSrc` and `imageAlt`, title, and short description.
- Add a hover overlay (via `group-hover`) that displays technology and language badges.
- Wrap the card with `Link` to `/projects/{slug}`, including `aria-label` for accessibility.
- Apply Tailwind classes for mobile-first layout, monochrome foregrounds, and focus states.

### Phase 3 – Projects Index Page

- Update `app/projects/page.tsx` to import `projects` and `ProjectCard`.
- Keep the existing `h1` as the page title and add a short descriptive paragraph.
- Render a responsive grid of `ProjectCard`s (single column on mobile, multi-column on larger screens).
- Ensure correct heading hierarchy and semantic structure (`main`, `section`).

### Phase 4 – Dynamic Project Detail Page

- Add `app/projects/[slug]/page.tsx` that:
  - Imports `projects` and uses `params.slug` to find the matching project.
  - Exposes `generateStaticParams` to prebuild static pages for all slugs.
  - Calls `notFound()` when no project matches the slug.
- Render a layout with:
  - `h1` for the project title and supporting text.
  - Main project image (using `imageSrc` and `imageAlt`).
  - Sections with `h2` headings for "About this project", "Stack & languages", and "Repository".
  - Badges for technologies and languages.
  - A GitHub link with `href`, `target="_blank"`, `rel="noopener noreferrer"`, and an `aria-label`.

### Phase 5 – Styling, Accessibility & Testing

- Ensure all text/icons/borders use only monochrome Tailwind classes (`text-gray-*`, `bg-gray-*`, `border-gray-*`, black/white).
- Optionally use very light pastel background tints (e.g., `bg-blue-50`) only for section backgrounds, not for text.
- Add appropriate `aria-label`s to interactive elements and ensure all images have meaningful `alt` text.
- Maintain correct heading hierarchy and semantic HTML (`main`, `section`, `article`, `header`).
- Confirm touch target sizes and visible focus styles.
- Add tests:
  - `tests/ProjectsPage.test.tsx` – headings order, semantic structure, card rendering, attributes.
  - `tests/ProjectDetailPage.test.tsx` – slug resolution, content rendering, GitHub link attributes, notFound behavior.
- Optionally add simple performance tests for rerender under 100ms.

---

## ✅ Progress Tracking

### ✅ Completed Steps

- [x] **STEP-001**: Data & types setup in `app/types/project.ts` and `content/projects.ts` ✅
  - **Phase**: 1 – Data & Types Setup
  - **Description**: Define `Project` interface and create `projects` array with all required fields including `imageSrc` and `imageAlt`.
  - **Success Criteria**: `projects` is strongly typed and used in both pages and components without TypeScript errors.
  - **Completed**: Phase 1 implementation
  - **Notes**: Created `app/types/project.ts` with `Technology`, `Language`, and `Project` types following existing type patterns. Created `content/projects.ts` with 4 example projects using existing GitHub base URL and image path. Types are ready for use in components and pages.

- [x] **STEP-001--FIX**: Refine `projects` typing using `satisfies Project[]` ✅
  - **Phase**: 1 – Data & Types Setup
  - **Description**: Update `content/projects.ts` to use `satisfies Project[]` instead of a direct `Project[]` annotation on the `projects` export and refine project metadata.
  - **Notes**: Keeps `projects` strongly typed while preserving literal types for better inference in consuming components, and removes the duplicate `Python` entry from both technologies and languages for the data visualization project by keeping `Python` only in `languages`.

- [x] **STEP-002**: Implement `ProjectCard` component ✅
  - **Phase**: 2 – Project Card Component
  - **Description**: Build a card that shows project image, title, short description, and hover overlay with technologies and languages.
  - **Success Criteria**: Card is keyboard-focusable, uses `Link` to `/projects/{slug}`, and reveals stack info on hover.
  - **Notes**: Created `ProjectCard` with `Project`-typed props using `next/image` and `next/link`. The card is fully monochrome for foreground elements, mobile-first, uses a hover/focus overlay (`group-hover` and `group-focus-within`) to reveal technologies and languages, and includes proper ARIA labels, alt text, explicit 44x44px touch target sizing on the interactive link, and focus ring. A dedicated `tests/ProjectCard.test.tsx` file verifies structure, accessibility, monochrome styling, and edge cases.

- [x] **STEP-002--FIX**: Use a stable selector for the description paragraph in `ProjectCard` tests ✅
  - **Phase**: 2 – Project Card Component
  - **Description**: Update `tests/ProjectCard.test.tsx` to avoid selecting the overlay's "Stack" label when asserting the description paragraph.
  - **Notes**: Replaced `container.querySelector('p')` in the "stable selectors" test with a more specific selector (`'div.flex.flex-col.gap-2.p-4 > p'`) that targets the content area's description paragraph rather than the overlay labels, aligning with the testing standards for stable selectors.

### 🔄 In Progress

_(None – Phase 1 and Phase 2 complete, ready for Phase 3.)_

### ⏳ Pending Steps

- [ ] **STEP-003**: Wire up `/projects` index page
  - **Phase**: 3 – Projects Index Page
  - **Description**: Extend `app/projects/page.tsx` to render a grid of `ProjectCard`s under the existing `h1`.
  - **Success Criteria**: All projects from `content/projects.ts` are shown; heading hierarchy and semantics are correct.

- [ ] **STEP-004**: Implement `/projects/[slug]` dynamic page
  - **Phase**: 4 – Dynamic Detail Page
  - **Description**: Create `[slug]/page.tsx` that loads a project by `slug` and shows details and GitHub link.
  - **Success Criteria**: Known slugs render correct data; unknown slugs call `notFound()`.

- [ ] **STEP-005**: Apply monochrome, mobile-first styling & accessibility
  - **Phase**: 5 – Styling, Accessibility & Testing
  - **Description**: Ensure all project-related UI follows monochrome foreground rules, mobile-first layout, and accessibility guidelines.
  - **Success Criteria**: No non-gray foreground colors; correct ARIA labels, alt text, focus states, and touch targets.

- [ ] **STEP-006**: Add tests for Projects index page
  - **Phase**: 5 – Styling, Accessibility & Testing
  - **Description**: Add tests for `/projects` to validate structure, attributes, and rendering from content.
  - **Success Criteria**: Tests pass and match the component testing standards (heading hierarchy, stable selectors, direct attribute checks).

- [ ] **STEP-007**: Add tests for project detail page
  - **Phase**: 5 – Styling, Accessibility & Testing
  - **Description**: Add tests for `/projects/[slug]` covering slug handling, attributes, and content.
  - **Success Criteria**: Tests pass, including notFound behavior and GitHub link verification.

### 📋 Additional Steps Not Included in the Original Plan

_(None yet.)_

### 🚫 Blocked Items

_(None.)_

---

## 🧪 Testing Checkpoints

- **Checkpoint 1 (After STEP-003)**
  - `/projects` renders all cards from `content/projects.ts` without runtime errors.
  - Basic structural tests for headings and card count pass.

- **Checkpoint 2 (After STEP-004)**
  - `/projects/[slug]` shows correct content for valid slugs and 404/notFound for invalid slugs.

- **Checkpoint 3 (After STEP-006 & STEP-007)**
  - All projects-related tests pass, including accessibility checks (alt, aria-label, link attributes).

- **Checkpoint 4 (After full completion)**
  - Edge cases (e.g., empty languages array) are handled gracefully and performance checks are within threshold.

---

## 📊 Progress Summary

**Overall Progress**: 28% (2/7 steps completed)

**Phase Breakdown**:

- Phase 1 – Data & Types Setup: 1/1 ✅
  - Steps: **STEP-001** ✅
- Phase 2 – Project Card Component: 1/1 ✅
  - Steps: **STEP-002** ✅
- Phase 3 – Projects Index Page: 0/1
  - Steps: **STEP-003**
- Phase 4 – Dynamic Detail Page: 0/1
  - Steps: **STEP-004**
- Phase 5 – Styling, Accessibility & Testing: 0/3
  - Steps: **STEP-005**, **STEP-006**, **STEP-007**

---

## 🔗 Related Files

**Created**:

- `app/types/project.ts` ✅ (created - Project interface with Technology and Language union types)
- `content/projects.ts` ✅ (created - typed projects array with 4 example projects)
- `app/components/ProjectCard.tsx` ✅ (created - accessible, monochrome project card with hover/focus overlay and typed Project props)

**Planned / To Be Created or Updated**:

- `app/projects/page.tsx` (extend existing minimal page)
- `app/projects/[slug]/page.tsx`
- `tests/ProjectsPage.test.tsx`
- `tests/ProjectDetailPage.test.tsx`

---

## 🔧 Incidental Fixes

_(Add entries here if you modify unrelated parts of the codebase while working on this feature.)_

---

## 📝 Notes

- `imageSrc` and `imageAlt` live in the content layer so components stay presentational and accessible.
- All new code should follow the existing component testing, styling, and progress-tracking standards.

_Last Updated: Phase 2 – STEP-002--FIX applied (ProjectCard description selector in tests refined to avoid overlay labels and improve selector stability)._
