# 🎯 Image Carousel for Life Page - Progress Tracker

## 📋 Project Overview

**Objective**: Implement a horizontal image carousel component for the Life page that displays a scrollable collection of photos with navigation arrows. The carousel will follow the project's monochrome design system, accessibility standards, and component testing requirements.

**Context**: The Life page currently only has a basic heading. Adding an image carousel will showcase life moments in an engaging, accessible way. The carousel should support smooth scrolling, keyboard navigation, and work seamlessly on mobile and desktop devices.

**Status**: 🔄 In Progress | **Phase**: 1 of 4 | **Progress**: 29% (2/7 steps completed)

**Success Metrics**:

- ImageCarousel component renders with horizontal scrolling functionality
- Navigation arrows (left/right) enable smooth scrolling through images
- All images are properly optimized using Next.js Image component
- Component follows monochrome design system (gray scale for foreground elements)
- Component passes all accessibility requirements (WCAG AA)
- Responsive design works on mobile (375px+) and desktop
- 100% test coverage for component logic
- Images are organized in `public/images/life/` folder
- Life images data is stored in `content/life.ts` following project patterns

**Timeline**:

- **Phase 1**: Type Definitions & Content Structure (30 minutes)
- **Phase 2**: Carousel Component Development (2-3 hours)
- **Phase 3**: Integration & Styling (1 hour)
- **Phase 4**: Testing & Accessibility (1-2 hours)

**Scope**:

- ✅ Type definition for `CarouselItem` interface
- ✅ Content file `content/life.ts` with life images array
- ✅ `ImageCarousel` component with navigation arrows
- ✅ Horizontal scrolling with smooth behavior
- ✅ Integration into Life page
- ✅ CSS for scrollbar hiding
- ✅ Comprehensive test suite
- ❌ Auto-play functionality (future enhancement)
- ❌ Touch/swipe gestures (future enhancement)
- ❌ Image lightbox/modal (future enhancement)

---

## 🎯 Implementation Plan

### Phase 1: Type Definitions & Content Structure

- Create `CarouselItem` interface in `app/types/carousel.ts` with `id`, `imageUrl`, and `imageAlt` fields
- Create `content/life.ts` exporting a typed `lifeImages: CarouselItem[]` array
- Follow the same pattern as `content/projects.ts` using `satisfies CarouselItem[]`
- Prepare folder structure: `public/images/life/` for user's photos

### Phase 2: Carousel Component Development

- Create `ImageCarousel` component in `app/components/ImageCarousel.tsx` as a client component
- Implement horizontal scrollable container with `overflow-x-auto`
- Add left/right navigation buttons with disabled states based on scroll position
- Use `useRef` and `useState` to manage scroll state and button visibility
- Implement smooth scrolling behavior with `scrollTo` method
- Use Next.js `Image` component for optimized image rendering
- Add proper `sizes` attribute for responsive image loading
- Ensure all interactive elements meet 44x44px touch target minimum

### Phase 3: Integration & Styling

- Update `app/life/page.tsx` to import and use `ImageCarousel` component
- Import `lifeImages` from `content/life.ts`
- Add CSS to `app/globals.css` for scrollbar hiding (webkit and Firefox)
- Apply monochrome styling to all foreground elements (buttons, borders, icons)
- Ensure proper heading hierarchy (h1 for page title, h2 for carousel title)
- Verify mobile-first responsive design
- Test horizontal overflow prevention

### Phase 4: Testing & Accessibility

- Create `tests/ImageCarousel.test.tsx` following component testing standards
- Test core functionality: rendering, image display, navigation buttons
- Test structural hierarchy: heading order, semantic HTML
- Test accessibility: ARIA labels, keyboard navigation, focus states, touch targets
- Test styling: monochrome classes, responsive design, scrollbar hiding
- Test interactive behavior: button clicks, scroll state updates, disabled states
- Test edge cases: empty array, single image, many images
- Verify all tests pass and meet coverage requirements

---

## ✅ Progress Tracking

### ✅ Completed Steps

- [x] **STEP-001**: Create type definition for `CarouselItem` interface ✅
  - **Phase**: 1 – Type Definitions & Content Structure
  - **Completed**: Phase 1 implementation
  - **Notes**: Created `app/types/carousel.ts` with `CarouselItem` interface containing `id: string`, `imageUrl: string`, and `imageAlt: string` fields. Type is properly exported and follows the same pattern as `app/types/project.ts` with JSDoc comments.

- [x] **STEP-002**: Create content file for life images ✅
  - **Phase**: 1 – Type Definitions & Content Structure
  - **Completed**: Phase 1 implementation
  - **Notes**: Created `content/life.ts` exporting `lifeImages: CarouselItem[]` array using `satisfies CarouselItem[]` pattern. Includes 3 placeholder entries with example image paths pointing to `public/images/life/` folder. Follows same pattern as `content/projects.ts`.

### 🔄 In Progress

_(None - implementation not started)_

### ⏳ Pending Steps

- [ ] **STEP-003**: Create ImageCarousel component structure
  - **Phase**: 2 – Carousel Component Development
  - **Description**: Create `app/components/ImageCarousel.tsx` as a client component (`'use client'`). Accept `title: string` and `items: CarouselItem[]` props. Set up basic structure with section, header with h2, and scrollable container div.
  - **Success Criteria**: Component renders without errors; accepts props correctly; basic structure is in place.
  - **Testing Requirements**: Component renders with provided props; basic structure test passes.
  - **Estimated Effort**: 30 minutes
  - **Dependencies**: STEP-001 (requires CarouselItem type)
  - **Commit Strategy**: Can be committed independently

- [ ] **STEP-004**: Implement scrollable image container and navigation buttons
  - **Phase**: 2 – Carousel Component Development
  - **Description**: Add horizontal scrollable container with `overflow-x-auto`, `flex`, and `gap-4` classes. Implement left/right navigation buttons with `useRef` for container reference and `useState` for scroll state tracking. Add `checkScrollability` function to update button disabled states. Implement `scroll` function for smooth scrolling behavior.
  - **Success Criteria**: Container scrolls horizontally; navigation buttons appear and control scrolling; buttons disable appropriately at scroll boundaries.
  - **Testing Requirements**: Manual testing: buttons scroll container; buttons disable at start/end; smooth scrolling works.
  - **Estimated Effort**: 1-2 hours
  - **Dependencies**: STEP-003 (requires component structure)
  - **Commit Strategy**: Can be committed independently

- [ ] **STEP-005**: Add Next.js Image components and styling
  - **Phase**: 2 – Carousel Component Development
  - **Description**: Map over `items` array to render Next.js `Image` components with proper `fill`, `sizes`, and `alt` attributes. Apply monochrome styling to navigation buttons (white/gray/black only for foreground). Ensure proper image sizing and responsive behavior. Add proper spacing and rounded corners.
  - **Success Criteria**: All images render correctly; images are properly optimized; styling follows monochrome design system; responsive sizing works on mobile and desktop.
  - **Testing Requirements**: Images render with correct attributes; styling classes are applied correctly; responsive behavior verified.
  - **Estimated Effort**: 1 hour
  - **Dependencies**: STEP-004 (requires scrollable container)
  - **Commit Strategy**: Can be committed independently

- [ ] **STEP-006**: Integrate carousel into Life page and add scrollbar hiding CSS
  - **Phase**: 3 – Integration & Styling
  - **Description**: Update `app/life/page.tsx` to import `ImageCarousel` and `lifeImages`. Add carousel component below existing heading section. Add CSS to `app/globals.css` for hiding scrollbars (webkit `::-webkit-scrollbar { display: none; }` and Firefox `scrollbar-width: none; -ms-overflow-style: none;`). Verify heading hierarchy (h1 for page, h2 for carousel).
  - **Success Criteria**: Carousel appears on Life page; scrollbar is hidden; heading hierarchy is correct; page renders without errors.
  - **Testing Requirements**: Page renders correctly; scrollbar is hidden; heading order verified.
  - **Estimated Effort**: 30 minutes
  - **Dependencies**: STEP-002 (requires lifeImages), STEP-005 (requires complete component)
  - **Commit Strategy**: Can be committed independently

- [ ] **STEP-007**: Add comprehensive test suite
  - **Phase**: 4 – Testing & Accessibility
  - **Description**: Create `tests/ImageCarousel.test.tsx` following component testing standards. Include tests for: core functionality (rendering, props), structural hierarchy (heading order, semantic HTML), accessibility (ARIA labels, keyboard navigation, focus states, touch targets), styling (monochrome classes, responsive design), interactive behavior (button clicks, scroll state), and edge cases (empty array, single image).
  - **Success Criteria**: All tests pass; test coverage meets requirements; tests follow component testing standards from `.cursor/rules/component-testing.mdc`.
  - **Testing Requirements**: All test categories covered; tests use stable selectors; direct attribute verification; accessibility requirements verified.
  - **Estimated Effort**: 1-2 hours
  - **Dependencies**: STEP-006 (requires complete integration)
  - **Commit Strategy**: Can be committed independently

### 🚫 Blocked Items

_(None currently)_

---

## 🧪 Testing Checkpoints

- **Checkpoint 1 (After STEP-003)**
  - ImageCarousel component renders with provided props without runtime errors.
  - Basic structure test passes (section, header, container elements present).

- **Checkpoint 2 (After STEP-004)**
  - Navigation buttons control scrolling correctly.
  - Buttons disable appropriately at scroll boundaries.
  - Smooth scrolling behavior works as expected.

- **Checkpoint 3 (After STEP-005)**
  - All images render with correct attributes and optimization.
  - Styling follows monochrome design system.
  - Responsive behavior verified on mobile and desktop viewports.

- **Checkpoint 4 (After STEP-006)**
  - Carousel appears correctly on Life page.
  - Scrollbar is hidden in all browsers.
  - Heading hierarchy is correct (h1 → h2).

- **Checkpoint 5 (After STEP-007)**
  - All tests pass including accessibility checks.
  - Edge cases are handled gracefully.
  - Component meets all success metrics.

---

## 📊 Progress Summary

**Overall Progress**: 29% (2/7 steps completed)

**Phase Breakdown**:

- Phase 1 – Type Definitions & Content Structure: 2/2 ✅
  - Steps: **STEP-001** ✅, **STEP-002** ✅
- Phase 2 – Carousel Component Development: 0/3 ⏳
  - Steps: **STEP-003** ⏳, **STEP-004** ⏳, **STEP-005** ⏳
- Phase 3 – Integration & Styling: 0/1 ⏳
  - Steps: **STEP-006** ⏳
- Phase 4 – Testing & Accessibility: 0/1 ⏳
  - Steps: **STEP-007** ⏳

---

## 🔗 Related Files

**To Be Created**:

- `app/components/ImageCarousel.tsx` ⏳ (main carousel component)
- `app/components/ImageCarousel.tsx` ⏳ (main carousel component)
- `tests/ImageCarousel.test.tsx` ⏳ (comprehensive test suite)

**Created**:

- `app/types/carousel.ts` ✅ (CarouselItem interface)
- `content/life.ts` ✅ (lifeImages array with typed data)

**To Be Updated**:

- `app/life/page.tsx` ⏳ (integrate ImageCarousel component)
- `app/globals.css` ⏳ (add scrollbar hiding CSS)

**User Action Required**:

- Create `public/images/life/` folder and add photos
- Update `content/life.ts` with actual image filenames and alt text

---

## 📝 Notes

- Images should be placed in `public/images/life/` folder by the user
- Image paths in `content/life.ts` should reference `/images/life/filename.jpg` format
- All new code should follow existing component testing, styling, and progress-tracking standards
- Component uses client-side JavaScript for scroll state management (`'use client'` directive required)
- Navigation buttons use monochrome styling (white/gray/black only) per design system
- Scrollbar hiding uses CSS-only approach for cross-browser compatibility

---

_Last Updated: Phase 1 completed - Type definitions and content structure implemented (12 February 2026)_
