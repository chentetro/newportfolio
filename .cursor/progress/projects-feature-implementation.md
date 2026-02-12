# 🎯 Projects Feature (Cards + Detail Pages) - Progress Tracker

## 📋 Project Overview

**Objective**: Implement a Projects feature where each project is displayed as a card with an image and hover overlay (technologies and languages). Clicking a card navigates to a dynamic project page that shows full details and a GitHub link, using a shared content source and strict accessibility/styling rules.

**Context**: The portfolio currently has a minimal `/projects` page. This feature will turn it into a content-driven, accessible, monochrome-styled projects section that follows your global styling, component testing, and progress-tracking standards.

**Status**: ✅ Complete  
**Phase**: 5 of 5  
**Progress**: 100% (7/7 steps completed + 1 documentation step)

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

- [x] **STEP-003**: Wire up `/projects` index page ✅
  - **Phase**: 3 – Projects Index Page
  - **Description**: Extend `app/projects/page.tsx` to render a grid of `ProjectCard`s under the existing `h1`.
  - **Success Criteria**: All projects from `content/projects.ts` are shown; heading hierarchy and semantics are correct.
  - **Completed**: Phase 3 implementation
  - **Notes**: Updated `app/projects/page.tsx` to import `ProjectCard` and `projects`, wrapped the h1 in a semantic `header` element with a descriptive paragraph, and created a responsive grid layout (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`) that maps over all projects. The page maintains proper heading hierarchy (h1 for page title), semantic structure (`main` → `section` → `div` → `header` + grid), and follows monochrome styling standards.

- [x] **STEP-004**: Implement `/projects/[slug]` dynamic page ✅
  - **Phase**: 4 – Dynamic Detail Page
  - **Description**: Create `[slug]/page.tsx` that loads a project by `slug` and shows details and GitHub link.
  - **Success Criteria**: Known slugs render correct data; unknown slugs call `notFound()`.
  - **Completed**: Phase 4 implementation
  - **Notes**: Created `app/projects/[slug]/page.tsx` with async params handling (Next.js 16 pattern), `generateStaticParams` for static generation of all project pages, and `notFound()` error handling. The page renders semantic HTML structure with proper heading hierarchy (h1 → h2 → h3), displays project image with priority loading, full description, technology and language badges, and GitHub link with all required accessibility attributes (aria-label, target="\_blank", rel="noopener noreferrer"). All styling follows monochrome foreground rules, mobile-first responsive design, and includes proper focus states and 44x44px touch targets.

- [x] **STEP-004--FIX**: Replace inline GitHub SVG with React Icons FaGithub component ✅
  - **Phase**: 4 – Dynamic Detail Page
  - **Description**: Refactor GitHub icon in project detail page to use React Icons `FaGithub` component instead of inline SVG for consistency with other components.
  - **Notes**: Replaced inline SVG GitHub icon (lines 143-154) with `FaGithub` from `react-icons/fa` to match the pattern used in `Footer.tsx` and other components. Maintains same styling (`w-5 h-5`) and accessibility (`aria-hidden="true"`). Code is cleaner and more maintainable.

- [x] **STEP-005**: Apply monochrome, mobile-first styling & accessibility ✅
  - **Phase**: 5 – Styling, Accessibility & Testing
  - **Description**: Ensure all project-related UI follows monochrome foreground rules, mobile-first layout, and accessibility guidelines.
  - **Success Criteria**: No non-gray foreground colors; correct ARIA labels, alt text, focus states, and touch targets.
  - **Completed**: Phase 5 implementation
  - **Notes**: Verified all styling and accessibility compliance in `app/projects/page.tsx` and `app/projects/[slug]/page.tsx`. All pages meet requirements: monochrome classes (`text-gray-*`, `border-gray-*`), semantic structure (`main`, `section`, `header`, `article`), proper heading hierarchy (h1 → h2 → h3), ARIA labels on interactive elements, meaningful alt text, 44x44px touch targets, and visible focus states. No code changes needed - all requirements already met.

- [x] **STEP-006**: Add tests for Projects index page ✅
  - **Phase**: 5 – Styling, Accessibility & Testing
  - **Description**: Add tests for `/projects` to validate structure, attributes, and rendering from content.
  - **Success Criteria**: Tests pass and match the component testing standards (heading hierarchy, stable selectors, direct attribute checks).
  - **Completed**: Phase 5 implementation
  - **Notes**: Created `tests/ProjectsPage.test.tsx` with comprehensive test coverage following `.cursor/rules/page-testing.mdc` checklist. Tests cover: core rendering & landmarks, heading hierarchy, semantic structure with stable selectors, accessibility (ARIA labels, icons, touch targets), links & navigation, content rendering, styling, and edge cases. All tests pass and verify monochrome styling, proper heading order, and accessibility requirements.

- [x] **STEP-007**: Add tests for project detail page ✅
  - **Phase**: 5 – Styling, Accessibility & Testing
  - **Description**: Add tests for `/projects/[slug]` covering slug handling, attributes, and content.
  - **Success Criteria**: Tests pass, including notFound behavior and GitHub link verification.
  - **Completed**: Phase 5 implementation
  - **Notes**: Created `tests/ProjectDetailPage.test.tsx` with comprehensive test coverage following `.cursor/rules/page-testing.mdc` checklist. Tests cover: core rendering & landmarks, heading hierarchy, semantic structure, accessibility, links & navigation (direct verification of GitHub link attributes), content rendering, error handling with `notFound()` mocking, and styling. Includes helper function `createMockParams()` for async component testing and proper mocking of `next/navigation` module. All tests pass including edge cases for invalid slugs and empty arrays.

### 🔄 In Progress

_(None – All phases complete.)_

### ⏳ Pending Steps

_(None – All steps completed.)_

### 📋 Additional Steps Not Included in the Original Plan

- [x] **STEP-008**: Add image error handling and fallback UI ✅
  - **Phase**: 4 – Dynamic Detail Page (Code Review Fix)
  - **Description**: Implement error handling for project images with fallback UI when images fail to load, addressing code review feedback about missing error state handling.
  - **Success Criteria**: Images gracefully handle load failures with accessible fallback UI; no broken image displays.
  - **Completed**: Code review fix implementation
  - **Notes**: Created `ProjectImage` client component (`app/components/ProjectImage.tsx`) that wraps `next/image` with error handling using `onError` handler and state management. When an image fails to load, displays a monochrome fallback UI with an image icon and "Image unavailable" message. Updated both `app/projects/[slug]/page.tsx` and `app/components/ProjectCard.tsx` to use the new `ProjectImage` component for consistent error handling across all project images. Fallback UI follows monochrome styling standards (gray scale only) and includes proper accessibility attributes (`role="img"`, `aria-label`). Moved `ProjectImageProps` interface to `app/types/projectimage.ts` following project's type organization pattern.

- [x] **STEP-009**: Update testing rules documentation with mocking guidance ✅
  - **Phase**: 5 – Styling, Accessibility & Testing (Documentation)
  - **Description**: Add mocking guidance for Next.js navigation functions and hooks to testing rules documentation.
  - **Success Criteria**: Both `page-testing.mdc` and `component-testing.mdc` include comprehensive mocking guidance with code examples.
  - **Completed**: Phase 5 documentation
  - **Notes**: Updated `.cursor/rules/page-testing.mdc` with new "Mocking Next.js Navigation Functions" section covering when to mock, common functions to mock (`notFound()`, `redirect()`, `useRouter()`, `usePathname()`), mocking patterns with Vitest, testing async page components, best practices, and what NOT to mock. Updated `.cursor/rules/component-testing.mdc` with new subsection "3.5. Mocking Next.js Hooks and Functions (When Needed)" covering when to mock Next.js hooks, what to mock, and guidelines. Both sections include code examples and follow existing documentation patterns.

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

**Overall Progress**: 100% (7/7 steps completed + 1 documentation step)

**Phase Breakdown**:

- Phase 1 – Data & Types Setup: 1/1 ✅
  - Steps: **STEP-001** ✅
- Phase 2 – Project Card Component: 1/1 ✅
  - Steps: **STEP-002** ✅
- Phase 3 – Projects Index Page: 1/1 ✅
  - Steps: **STEP-003** ✅
- Phase 4 – Dynamic Detail Page: 1/1 ✅
  - Steps: **STEP-004** ✅
- Phase 5 – Styling, Accessibility & Testing: 3/3 ✅
  - Steps: **STEP-005** ✅, **STEP-006** ✅, **STEP-007** ✅

---

## 🔗 Related Files

**Created**:

- `app/types/project.ts` ✅ (created - Project interface with Technology and Language union types)
- `content/projects.ts` ✅ (created - typed projects array with 4 example projects)
- `app/components/ProjectCard.tsx` ✅ (created - accessible, monochrome project card with hover/focus overlay and typed Project props; updated - replaced Image with ProjectImage component for error handling)

**Updated**:

- `app/projects/page.tsx` ✅ (updated - imports ProjectCard and projects, renders responsive grid with header and descriptive paragraph)

**Created** (continued):

- `app/projects/[slug]/page.tsx` ✅ (created - dynamic project detail page with static generation, notFound handling, semantic structure, and full accessibility; updated - refactored GitHub icon to use React Icons FaGithub component for consistency; updated - replaced Image with ProjectImage component for error handling)
- `app/components/ProjectImage.tsx` ✅ (created - client component with error handling and fallback UI for project images)
- `app/types/projectimage.ts` ✅ (created - ProjectImageProps interface following project's type organization pattern)

**Created** (continued):

- `tests/ProjectsPage.test.tsx` ✅ (created - comprehensive test suite for Projects index page following page-testing.mdc checklist with 7 test categories)
- `tests/ProjectDetailPage.test.tsx` ✅ (created - comprehensive test suite for project detail page with async component testing, notFound() mocking, and full page-testing.mdc checklist coverage)

**Updated** (continued):

- `.cursor/rules/page-testing.mdc` ✅ (updated - added "Mocking Next.js Navigation Functions" section with comprehensive guidance and code examples)
- `.cursor/rules/component-testing.mdc` ✅ (updated - added "3.5. Mocking Next.js Hooks and Functions (When Needed)" subsection with guidance for component-level mocking)

---

## 🔧 Incidental Fixes

_(Add entries here if you modify unrelated parts of the codebase while working on this feature.)_

---

## 📝 Notes

- `imageSrc` and `imageAlt` live in the content layer so components stay presentational and accessible.
- All new code should follow the existing component testing, styling, and progress-tracking standards.

---

_Last Updated: Phase 5 complete - All styling/accessibility verified, comprehensive test suites created for both pages, and testing rules documentation updated with mocking guidance (12 February 2026)_
