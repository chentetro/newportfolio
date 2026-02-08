# 🎯 Skills Section Implementation - Progress Tracker

## 📋 Project Overview

**Objective**: Build a Skills section component that displays technical skills organized by categories (Programming Languages, Web Development, Databases, Tools & Environment) with icons from react-icons. The component will be integrated into the About page underneath the Experience section, featuring a clean white-background card aesthetic with pill-shaped badges that have hover effects.

**Context**: The portfolio currently displays skills on the home page using SkillCard components. Adding a dedicated Skills section to the About page will provide a more detailed, categorized view of technical skills with visual icons. This complements the Experience section and provides visitors with a comprehensive view of technical capabilities.

**Status**: ⏳ Pending | **Phase**: 0 of 3 | **Progress**: 0% (0/12 steps)

**Success Metrics**:

- Skills component renders all skills organized by categories
- All icons load correctly from react-icons (si, bi, fa sets)
- Component follows monochrome styling standards (gray scale only)
- Badges are pill-shaped (rounded-full) with subtle borders and hover effects
- Icons and text are horizontally aligned within badges
- Badges wrap naturally using flex-wrap
- Component passes all accessibility requirements (WCAG AA)
- Responsive design works on mobile (375px+) and desktop
- Component integrates seamlessly into About page below Experience section
- 100% test coverage for component logic

**Timeline**:

- **Phase 1**: Type Definitions & Data Structure (30 minutes)
- **Phase 2**: Component Development (1-2 hours)
- **Phase 3**: Integration & Testing (1 hour)

**Scope**:

- ✅ TypeScript type definitions for skills (`app/types/skills.ts`)
- ✅ Skills data constant with categories and icons (`app/lib/skills.ts`)
- ✅ Skills component with card layout and badge design (`app/components/Skills.tsx`)
- ✅ Integration into About page below Experience section
- ✅ Comprehensive test suite following component testing standards
- ❌ Skill filtering or search (future enhancement)
- ❌ Skill proficiency levels (future enhancement)
- ❌ Skill detail pages (future enhancement)

## 🎯 Implementation Plan

### Phase Breakdown

**Phase 1: Type Definitions & Data Structure**

- Create TypeScript type file (`app/types/skills.ts`) with SkillCategory union type and Skill interface
- Create skills data file (`app/lib/skills.ts`) with SKILLS_DATA constant
- Import appropriate icons from react-icons (si, bi, fa sets)
- Organize skills by categories: Programming Languages, Web Development, Databases, Tools & Environment

**Phase 2: Component Development**

- Create Skills component structure (`app/components/Skills.tsx`)
- Implement white-background card layout with rounded corners
- Create pill-shaped badges with icons and text
- Add flex-wrap for natural badge wrapping
- Implement hover effects (border darkening)
- Apply monochrome styling per design standards
- Ensure horizontal alignment of icons and text
- Add accessibility attributes (aria-labels, semantic HTML)

**Phase 3: Integration & Testing**

- Integrate component into About page below Experience section
- Create comprehensive test suite following component testing standards
- Verify icon rendering and alignment
- Test accessibility compliance
- Validate responsive behavior and dark mode
- Ensure proper heading hierarchy

### Dependencies

- **STEP-001** → **STEP-002**: Type definitions must exist before creating data structure
- **STEP-002** → **STEP-003**: Data structure must exist before component development
- **STEP-003** → **STEP-004**: Component structure must exist before implementing design
- **STEP-004** → **STEP-005**: Design must be complete before styling
- **STEP-005** → **STEP-006**: Styling must be complete before accessibility
- **STEP-006** → **STEP-007**: Component must be complete before integration
- **STEP-007** → **STEP-008**: Integration must be complete before testing

### Risk Assessment

| Risk                            | Impact | Mitigation                                                   |
| ------------------------------- | ------ | ------------------------------------------------------------ |
| react-icons missing icons       | Medium | Verify icon availability, use alternative icons if needed    |
| Icon alignment issues           | Low    | Use flexbox with proper gap spacing, test alignment          |
| Badge wrapping issues on mobile | Medium | Test flex-wrap behavior, ensure proper spacing               |
| Accessibility violations        | Medium | Follow testing standards checklist, test with screen readers |
| Mobile responsiveness issues    | Medium | Test at 375px minimum width, mobile-first approach           |
| TypeScript type mismatches      | Low    | Define strict types, validate at build time                  |
| Heading hierarchy violations    | Medium | Follow component testing standards, verify H2 structure      |
| Hover effects not working       | Low    | Test transition classes, verify dark mode variants           |

### Testing Strategy

**Unit Tests**:

- Component renders all skill categories
- Skills display with correct icons and names
- Badges render with proper pill shape (rounded-full)
- Icons and text are horizontally aligned
- Badges wrap correctly with flex-wrap
- Hover effects apply border darkening
- Accessibility attributes are present
- Semantic HTML structure is correct
- Heading hierarchy is proper (H2 for section title)

**Integration Tests**:

- Skills data loads correctly from constant
- All icons render without errors
- Component integrates with About page layout
- Skills section appears below Experience section

**Manual Testing**:

- Verify card design matches requirements (white background, rounded corners)
- Test badge hover effects (border darkening)
- Test mobile layout (375px, 768px, 1024px)
- Verify badge wrapping behavior
- Test keyboard navigation
- Verify dark mode styling
- Check for horizontal overflow issues
- Validate icon alignment and spacing

**Accessibility Check**:

- WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Keyboard navigation works
- Screen reader compatibility
- Focus indicators visible
- Touch targets meet 44x44px minimum
- Semantic HTML structure verified
- Icons have aria-hidden="true" where appropriate

## ✅ Progress Tracking

### ✅ Completed Steps

_No steps completed yet_

### 🔄 In Progress

_No steps in progress_

### ⏳ Pending Steps

- [ ] **STEP-001**: Create TypeScript type definitions for skills
- [ ] **STEP-002**: Create skills data constant with categories and icons
- [ ] **STEP-003**: Create Skills component structure
- [ ] **STEP-004**: Implement card layout and badge design
- [ ] **STEP-005**: Apply monochrome styling per design standards
- [ ] **STEP-006**: Add accessibility attributes and semantic HTML
- [ ] **STEP-007**: Integrate component into About page
- [ ] **STEP-008**: Create comprehensive test suite
- [ ] **STEP-009**: Verify responsive design and dark mode
- [ ] **STEP-010**: Validate icon availability and alignment
- [ ] **STEP-011**: Final validation and code review
- [ ] **STEP-012**: Update progress document

### 🚫 Blocked Items

_No blockers currently_

## 📝 Detailed Steps

### Phase 1: Type Definitions & Data Structure

#### **STEP-001**: Create TypeScript type definitions for skills

**Description**: Define TypeScript types for skills data structure including SkillCategory union type and Skill interface.

**Files to Create**:

- `app/types/skills.ts`

**Implementation Details**:

- Create `SkillCategory` union type with values:
  - `'Programming Languages'`
  - `'Web Development'`
  - `'Databases'`
  - `'Tools & Environment'`
- Create `Skill` interface with:
  - `name: string` - Name of the skill
  - `icon: IconType` - React Icon component type (import from react-icons)
- Create `SkillCategoryData` interface with:
  - `category: SkillCategory` - Category title
  - `skills: Skill[]` - List of skills in this category
- Import `IconType` from `react-icons`
- Add JSDoc comments for documentation

**Success Criteria**:

- ✅ `app/types/skills.ts` file exists
- ✅ `SkillCategory` union type defined with all 4 categories
- ✅ `Skill` interface defined with name and icon properties
- ✅ `SkillCategoryData` interface defined
- ✅ TypeScript compilation passes without errors
- ✅ Types can be imported in other files

**Testing Requirements**:

- Verify file exists: `app/types/skills.ts`
- Check TypeScript compilation: `npm run type-check`
- Test import: `import type { SkillCategory, Skill, SkillCategoryData } from '../types/skills';`
- No TypeScript errors

**Estimated Effort**: 15 minutes

**Dependencies**: None

**Commit Strategy**: Can be committed independently

```bash
feat: define TypeScript types for skills data structure
```

---

#### **STEP-002**: Create skills data constant with categories and icons

**Description**: Create SKILLS_DATA constant with all skills organized by categories, using react-icons for all icons.

**Files to Create**:

- `app/lib/skills.ts`

**Implementation Details**:

- Import icons from react-icons:
  - From `react-icons/si` (Simple Icons): SiC, SiCplusplus, SiCsharp, SiJava, SiPython, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiMysql, SiMongodb, SiGit, SiGithub, SiPostman
  - Use alternative icons from `react-icons/bi` or `react-icons/fa` if any si icons are unavailable
- Create `SKILLS_DATA` constant of type `SkillCategoryData[]`
- Organize skills by categories:
  - **Programming Languages**: C, C++, C#, Java, Python
  - **Web Development**: HTML, CSS, JavaScript, TypeScript
  - **Databases**: MySQL, MongoDB
  - **Tools & Environment**: Git, GitHub, Postman
- Export `SKILLS_DATA` constant
- Import `SkillCategoryData` type from `../types/skills`

**Success Criteria**:

- ✅ `app/lib/skills.ts` file exists
- ✅ All required skills are included in correct categories
- ✅ All icons are imported from react-icons
- ✅ `SKILLS_DATA` constant is properly typed
- ✅ TypeScript compilation passes without errors
- ✅ Data can be imported in component

**Testing Requirements**:

- Verify file exists: `app/lib/skills.ts`
- Check TypeScript compilation: `npm run type-check`
- Test import: `import { SKILLS_DATA } from '../lib/skills';`
- Verify all icons are available (check for import errors)
- No TypeScript errors
- All categories have at least one skill

**Estimated Effort**: 30 minutes

**Dependencies**: STEP-001

**Commit Strategy**: Can be committed independently

```bash
feat: create skills data constant with categories and react-icons
```

---

### Phase 2: Component Development

#### **STEP-003**: Create Skills component structure

**Description**: Create the Skills component with basic structure, TypeScript interface, and semantic HTML.

**Files to Create**:

- `app/components/Skills.tsx`

**Implementation Details**:

- Create `Skills` component (default export)
- Import `SKILLS_DATA` from `../lib/skills`
- Import `SkillCategoryData` type from `../types/skills`
- Create component with:
  - `<section>` element with `aria-label="Skills section"`
  - H2 heading "Skills"
  - Map over `SKILLS_DATA` to render categories
  - Map over skills within each category
- Use semantic HTML structure
- Handle empty data gracefully (return null if no data)

**Success Criteria**:

- ✅ `app/components/Skills.tsx` file exists
- ✅ Component accepts no props (uses SKILLS_DATA directly)
- ✅ Component renders section with H2 heading
- ✅ Component maps over categories and skills
- ✅ Semantic HTML structure is correct
- ✅ TypeScript compilation passes without errors
- ✅ Component can be imported in other files

**Testing Requirements**:

- Verify file exists: `app/components/Skills.tsx`
- Check TypeScript compilation: `npm run type-check`
- Test import: `import Skills from '../components/Skills';`
- Verify component renders without errors
- No TypeScript errors

**Estimated Effort**: 20 minutes

**Dependencies**: STEP-002

**Commit Strategy**: Can be committed independently

```bash
feat: create Skills component structure
```

---

#### **STEP-004**: Implement card layout and badge design

**Description**: Implement white-background card layout with pill-shaped badges, icons, and flex-wrap for natural wrapping.

**Implementation Details**:

- Add card container with:
  - `bg-white dark:bg-gray-900` for white background
  - `rounded-xl` for rounded corners
  - `shadow-sm` for subtle shadow
  - `p-6 lg:p-8` for responsive padding
- For each category:
  - Add H3 heading for category name
  - Create badge container with `flex flex-wrap gap-3`
- For each skill badge:
  - Use `flex items-center gap-2` for horizontal icon-text alignment
  - Apply `rounded-full` for pill shape
  - Add `px-4 py-2` for padding
  - Add `border border-gray-300 dark:border-gray-600` for subtle border
  - Render icon component with `w-5 h-5` size
  - Render skill name as text
- Ensure badges wrap naturally with flex-wrap

**Success Criteria**:

- ✅ Card has white background with rounded corners and shadow
- ✅ Badges are pill-shaped (rounded-full)
- ✅ Icons and text are horizontally aligned
- ✅ Badges wrap naturally using flex-wrap
- ✅ Proper spacing between badges (gap-3)
- ✅ Responsive padding (p-6 lg:p-8)
- ✅ Component renders all skills correctly

**Testing Requirements**:

- Verify card styling matches requirements
- Check badge shape (rounded-full)
- Verify icon and text alignment
- Test badge wrapping behavior
- Check spacing and padding
- Verify responsive behavior

**Estimated Effort**: 30 minutes

**Dependencies**: STEP-003

**Commit Strategy**: Can be committed independently

```bash
feat: implement card layout and pill-shaped badge design
```

---

#### **STEP-005**: Apply monochrome styling per design standards

**Description**: Apply monochrome styling throughout the component using only gray scale colors.

**Implementation Details**:

- Apply monochrome color scheme:
  - Text: `text-gray-900 dark:text-gray-100` for headings
  - Text: `text-gray-700 dark:text-gray-300` for skill names
  - Icons: `text-gray-700 dark:text-gray-300`
  - Borders: `border-gray-300 dark:border-gray-600`
  - Background: `bg-white dark:bg-gray-900` for card
- Ensure all colors use gray scale only (no teal, blue, or other colors)
- Add dark mode variants for all colors
- Verify WCAG AA contrast ratios (4.5:1 for normal text)

**Success Criteria**:

- ✅ All colors use gray scale only
- ✅ Dark mode variants added for all elements
- ✅ WCAG AA contrast ratios met
- ✅ No teal, blue, or other colored elements
- ✅ Consistent with design standards

**Testing Requirements**:

- Verify all colors are monochrome (gray scale)
- Test dark mode styling
- Check contrast ratios meet WCAG AA
- Verify no colored elements exist
- Compare with styling standards

**Estimated Effort**: 20 minutes

**Dependencies**: STEP-004

**Commit Strategy**: Can be committed independently

```bash
feat: apply monochrome styling to Skills component
```

---

#### **STEP-006**: Add hover effects and accessibility attributes

**Description**: Add hover effects to badges (border darkening) and comprehensive accessibility attributes.

**Implementation Details**:

- Add hover effect to badges:
  - `hover:border-gray-500 dark:hover:border-gray-400` for border darkening
  - `transition-colors duration-200` for smooth transition
- Add accessibility attributes:
  - `aria-label="Skills section"` on section element
  - `aria-hidden="true"` on icon elements (decorative)
  - Ensure proper heading hierarchy (H2 for section, H3 for categories)
  - Use semantic HTML (`<section>`, `<h2>`, `<h3>`)
- Verify keyboard navigation works
- Ensure touch targets meet 44x44px minimum

**Success Criteria**:

- ✅ Badge hover effects work (border darkens on hover)
- ✅ Smooth transition on hover
- ✅ Accessibility attributes present (aria-label, aria-hidden)
- ✅ Proper heading hierarchy (H2 → H3)
- ✅ Semantic HTML structure
- ✅ Keyboard navigation works
- ✅ Touch targets meet minimum size

**Testing Requirements**:

- Test hover effects on badges
- Verify transition smoothness
- Check accessibility attributes with screen reader
- Verify heading hierarchy
- Test keyboard navigation
- Check touch target sizes

**Estimated Effort**: 20 minutes

**Dependencies**: STEP-005

**Commit Strategy**: Can be committed independently

```bash
feat: add hover effects and accessibility attributes to Skills component
```

---

### Phase 3: Integration & Testing

#### **STEP-007**: Integrate component into About page

**Description**: Add Skills section to About page below the Experience section.

**Files to Modify**:

- `app/about/page.tsx`

**Implementation Details**:

- Import Skills component: `import Skills from '../components/Skills';`
- Add new section below Experience section:
  - Section wrapper with `py-12 px-4` for spacing
  - Container with `max-w-6xl mx-auto`
  - H1 heading "Skills" (matching Experience section pattern)
  - Card wrapper with `bg-white dark:bg-gray-900 rounded-xl shadow-sm`
  - Skills component inside card wrapper
- Ensure proper spacing between Experience and Skills sections
- Maintain consistent layout with Experience section

**Success Criteria**:

- ✅ Skills section appears on About page
- ✅ Skills section is below Experience section
- ✅ H1 heading "Skills" displays correctly
- ✅ Card wrapper matches Experience section styling
- ✅ Layout integrates seamlessly
- ✅ No console errors
- ✅ TypeScript compilation passes

**Testing Requirements**:

- Navigate to `/about` route
- Verify Skills section renders
- Check Skills section is below Experience section
- Verify heading hierarchy (H1 for page sections)
- Check layout consistency
- Verify no console errors
- Test responsive behavior

**Estimated Effort**: 15 minutes

**Dependencies**: STEP-006

**Commit Strategy**: Can be committed independently

```bash
feat: integrate Skills section into About page
```

---

#### **STEP-008**: Create comprehensive test suite

**Description**: Create test suite for Skills component following component testing standards.

**Files to Create**:

- `tests/Skills.test.tsx`

**Implementation Details**:

- Create test file following component testing standards
- Test categories:
  - **Core Functionality Tests**:
    - Component renders all categories
    - Skills display with correct names
    - Icons render correctly
    - Badges render with proper structure
  - **Structural Hierarchy Tests**:
    - H2 heading for section title
    - H3 headings for categories
    - Semantic HTML structure
  - **Accessibility Tests**:
    - ARIA labels present
    - Icons have aria-hidden="true"
    - Heading hierarchy correct
  - **Styling and Layout Tests**:
    - Monochrome colors applied
    - Badges have rounded-full class
    - Flex-wrap applied
    - Hover classes present
    - Dark mode variants
  - **Interactive Behavior Tests**:
    - Badge hover effects
    - Icon and text alignment
  - **Edge Cases**:
    - Empty data handling (if applicable)
    - Missing icons handling

**Success Criteria**:

- ✅ Test file exists: `tests/Skills.test.tsx`
- ✅ All test categories covered
- ✅ Minimum 15+ test cases
- ✅ 100% component logic coverage
- ✅ All tests pass
- ✅ Tests follow component testing standards

**Testing Requirements**:

- Run test suite: `npm run test`
- Verify all tests pass
- Check test coverage
- Verify tests follow standards
- Test with different data scenarios

**Estimated Effort**: 45 minutes

**Dependencies**: STEP-007

**Commit Strategy**: Can be committed independently

```bash
feat: add comprehensive test suite for Skills component
```

---

#### **STEP-009**: Verify responsive design and dark mode

**Description**: Manually verify responsive design at multiple breakpoints and dark mode styling.

**Implementation Details**:

- Test responsive design:
  - Mobile: 375px width
  - Tablet: 768px width
  - Desktop: 1024px+ width
- Verify badge wrapping behavior at each breakpoint
- Check for horizontal overflow issues
- Test dark mode:
  - Toggle dark mode
  - Verify all colors have proper dark variants
  - Check contrast ratios in dark mode
- Verify icon alignment and spacing
- Check card padding and spacing

**Success Criteria**:

- ✅ Responsive design works at all breakpoints
- ✅ Badges wrap correctly on mobile
- ✅ No horizontal overflow issues
- ✅ Dark mode styling correct
- ✅ All contrast ratios meet WCAG AA
- ✅ Icon alignment consistent
- ✅ Spacing and padding appropriate

**Testing Requirements**:

- Test at 375px, 768px, 1024px+ widths
- Verify badge wrapping
- Check for overflow
- Test dark mode toggle
- Verify contrast ratios
- Check icon alignment

**Estimated Effort**: 20 minutes

**Dependencies**: STEP-008

**Commit Strategy**: Can be committed independently

```bash
test: verify responsive design and dark mode for Skills component
```

---

#### **STEP-010**: Validate icon availability and alignment

**Description**: Verify all icons from react-icons load correctly and are properly aligned.

**Implementation Details**:

- Check all icon imports:
  - Verify SiC, SiCplusplus, SiCsharp, SiJava, SiPython exist
  - Verify SiHtml5, SiCss3, SiJavascript, SiTypescript exist
  - Verify SiMysql, SiMongodb exist
  - Verify SiGit, SiGithub, SiPostman exist
- If any icons are missing, find alternatives from bi or fa sets
- Verify icon alignment:
  - Icons are vertically centered with text
  - Icons have consistent size (w-5 h-5)
  - Proper gap spacing (gap-2) between icon and text
- Test icon rendering in browser

**Success Criteria**:

- ✅ All icons load without errors
- ✅ Icons are properly aligned with text
- ✅ Icon sizes are consistent
- ✅ No missing icon errors in console
- ✅ Alternative icons used if needed

**Testing Requirements**:

- Check browser console for icon errors
- Verify all icons render
- Check icon alignment visually
- Verify icon sizes
- Test with missing icon scenarios

**Estimated Effort**: 15 minutes

**Dependencies**: STEP-009

**Commit Strategy**: Can be committed independently

```bash
fix: validate and fix icon availability and alignment
```

---

#### **STEP-011**: Final validation and code review

**Description**: Run all validation checks and perform final code review.

**Implementation Details**:

- Run all validation commands:
  - `npm run lint` - ESLint checks
  - `npm run format` - Prettier formatting
  - `npm run type-check` - TypeScript compilation
  - `npm run test` - Test suite
- Verify all checks pass
- Review code for:
  - Consistency with existing codebase patterns
  - Proper error handling
  - Code comments and documentation
  - Performance considerations
- Check file structure and organization

**Success Criteria**:

- ✅ All linting checks pass
- ✅ Code is properly formatted
- ✅ TypeScript compilation passes
- ✅ All tests pass
- ✅ Code follows project patterns
- ✅ Documentation is complete

**Testing Requirements**:

- Run `npm run validate` (if available)
- Run individual validation commands
- Review code manually
- Check for any warnings or errors

**Estimated Effort**: 15 minutes

**Dependencies**: STEP-010

**Commit Strategy**: Can be committed independently

```bash
chore: final validation and code review for Skills section
```

---

#### **STEP-012**: Update progress document

**Description**: Mark all steps as completed and update progress tracking.

**Files to Modify**:

- `.cursor/progress/skills-section-implementation.md`

**Implementation Details**:

- Update status to "✅ Complete"
- Mark all steps as completed with commit references
- Add completion notes for each step
- Update progress percentage to 100%
- Document any deviations from original plan
- Add final notes and lessons learned

**Success Criteria**:

- ✅ Progress document updated
- ✅ All steps marked as completed
- ✅ Commit references added
- ✅ Progress percentage updated
- ✅ Final notes documented

**Testing Requirements**:

- Verify progress document is updated
- Check all steps are marked complete
- Verify commit references are accurate

**Estimated Effort**: 10 minutes

**Dependencies**: STEP-011

**Commit Strategy**: Can be committed independently

```bash
docs: update progress tracking for Skills section implementation
```

---

## 🧪 Testing Checkpoints

### Component Rendering

- [ ] All categories render correctly
- [ ] All skills display with names
- [ ] All icons render without errors
- [ ] Badges have correct pill shape
- [ ] Icons and text are aligned horizontally

### Styling & Layout

- [ ] Card has white background
- [ ] Card has rounded corners (rounded-xl)
- [ ] Card has subtle shadow
- [ ] Badges wrap naturally
- [ ] Proper spacing between badges
- [ ] Monochrome colors applied
- [ ] Dark mode variants work

### Interactivity

- [ ] Hover effects work (border darkens)
- [ ] Smooth transitions on hover
- [ ] No layout shifts on hover

### Accessibility

- [ ] ARIA labels present
- [ ] Icons have aria-hidden="true"
- [ ] Heading hierarchy correct (H2 → H3)
- [ ] Keyboard navigation works
- [ ] Touch targets meet 44x44px minimum
- [ ] WCAG AA contrast ratios met

### Responsive Design

- [ ] Works at 375px width
- [ ] Works at 768px width
- [ ] Works at 1024px+ width
- [ ] No horizontal overflow
- [ ] Badges wrap correctly on mobile

### Integration

- [ ] Component appears on About page
- [ ] Positioned below Experience section
- [ ] Layout integrates seamlessly
- [ ] No console errors
- [ ] TypeScript compilation passes

---

## 📚 Reference

### Required Skills by Category

**Programming Languages**:

- C
- C++
- C#
- Java
- Python

**Web Development**:

- HTML
- CSS
- JavaScript
- TypeScript

**Databases**:

- MySQL
- MongoDB

**Tools & Environment**:

- Git
- GitHub
- Postman

### Icon Sources

- Primary: `react-icons/si` (Simple Icons)
- Alternatives: `react-icons/bi` (Boxicons), `react-icons/fa` (Font Awesome)

### Design Requirements

- White background card
- Pill-shaped badges (rounded-full)
- Subtle border with hover effect (darkens)
- Horizontal icon-text alignment
- Flex-wrap for natural wrapping
- Monochrome color scheme only
