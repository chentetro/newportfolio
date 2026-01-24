# Code Review (cr) - Compare Branch to Main

Review changes in the current branch against main, checking for:

- Potential bugs and errors
- Best practices violations (from Cursor rules)
- Code quality issues
- Next.js App Router patterns
- TypeScript type safety
- React patterns and hooks usage
- Accessibility compliance (WCAG 2.1 AA)
- Monochrome design system adherence
- Mobile-first responsive design
- Tailwind CSS v4 usage

## Instructions for AI

When this command is run:

1. **Get the list of changed files and their diffs:**

   ```bash
   git diff --name-status main...HEAD
   git diff main...HEAD -- <file_path>
   ```

   **Important:** Process each file's diff individually to prevent output truncation.

2. **Analyze changes against Cursor rules:**
   - Read rules from `.cursor/rules/` directory
   - Check against:
     - `styling-standards.mdc` - Tailwind CSS, mobile-first design, monochrome palette, accessibility
     - Security guidelines (from workspace rules)

3. **Provide structured feedback:**

   ````markdown
   ## Code Review Summary

   **Branch:** [current-branch-name]
   **Comparing:** [current-branch] → main
   **Files Changed:** [count]

   ---

   ## 🔴 Critical Issues (Must Fix)

   ### [File Path]

   **Issue:** [Description]
   **Rule Violated:** [Which Cursor rule, if applicable]
   **Suggestion:** [How to fix]
   **Example:**

   ```tsx
   // Current (problematic)
   ...

   // Suggested
   ...
   ```

   ---

   ## 🟡 Warnings (Should Fix)

   ### [File Path]

   **Issue:** [Description]
   **Rule Reference:** [Which Cursor rule]
   **Suggestion:** [How to improve]

   ---

   ## 💡 Suggestions (Nice to Have)

   ### [File Path]

   **Suggestion:** [What could be better]
   **Why:** [Explanation]

   ---

   ## ✅ Positive Observations

   - [What was done well]

   ---

   ## 📊 Summary

   - **Critical Issues:** X
   - **Warnings:** Y
   - **Suggestions:** Z
   - **Overall Assessment:** [Good/Needs Work/Ready to Merge]
   ````

4. **Focus on:**
   - **Next.js & TypeScript:**
     - Missing type definitions or using `any`
     - Incorrect App Router patterns (server vs client components)
     - Missing `"use client"` directive when needed
     - Incorrect metadata exports
     - Using Pages Router patterns in App Router

   - **React patterns:**
     - Incorrect hook dependencies or rules of hooks violations
     - Direct state mutations (should be immutable)
     - Missing error boundaries
     - Props interfaces not properly defined
     - Component not memoized when appropriate
     - Async operations not properly handled in useEffect
     - Using useEffect for focus management (prefer callback refs)

   - **Code Quality:**
     - Missing error handling
     - Console.log statements left in code
     - Duplicate code that could be extracted
     - Magic numbers/strings that should be constants

   - **Styling & Design System (CRITICAL):**
     - **Monochrome Palette Violations:**
       - Using any colors other than white, gray (gray-50 to gray-900), or black
       - Using blue, green, red, orange, purple, or any color variants
       - Hardcoded colors instead of gray scale
     - **Tailwind CSS Usage:**
       - Using inline styles (`style={{}}`) instead of Tailwind utilities
       - Using styled-components or CSS modules instead of Tailwind
       - Not using Tailwind utility classes exclusively
       - Custom CSS when Tailwind utilities would work
     - **Mobile-First Design:**
       - Not designing for mobile screens first (375px minimum)
       - Missing responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
       - Horizontal overflow issues (content extending beyond viewport)
       - Missing `max-w-full` or `w-full` on containers
       - Not testing at mobile size before adding breakpoints
     - **Dark Mode:**
       - Missing dark mode variants (`dark:` prefix)
       - Not using CSS variables (`var(--background)`, `var(--foreground)`)
       - Incorrect dark mode color combinations
       - Not testing in both light and dark modes
     - **ClassName Organization:**
       - Not following the order: Layout → Spacing → Colors → Effects
       - Inconsistent spacing patterns
       - Missing transitions for interactive elements

   - **Accessibility (WCAG 2.1 AA):**
     - Missing accessibility attributes (aria-labels, roles)
     - Missing keyboard navigation support
     - Interactive elements without focus states (`focus:ring-2 focus:ring-gray-500`)
     - Touch targets smaller than 44x44px (`min-h-[44px] min-w-[44px]`)
     - Missing semantic HTML (`<button>`, `<nav>`, `<section>`, etc.)
     - Using `<div>` for interactive elements instead of `<button>` or `<a>`
     - Missing ARIA labels on icons (`aria-hidden="true"` on SVG, label on parent)
     - Contrast ratios below WCAG AA (4.5:1 for normal text, 3:1 for large text)
     - Missing proper heading hierarchy (h1 → h2 → h3, no skipping)

   - **Testing:**
     - Missing tests for new components or features
     - Using `fireEvent` instead of `@testing-library/user-event`
     - Testing implementation details instead of user behavior
     - Not using RTL query priority (getByRole > getByLabelText > getByText)
     - Missing accessibility tests
     - Testing class names or DOM structure
     - Not testing mobile responsiveness (375px width)

   - **Documentation:**
     - Missing or unclear code comments
     - Complex logic without explanation

   - **Security:**
     - Hardcoded secrets or API keys
     - Missing input validation
     - XSS vulnerabilities (dangerouslySetInnerHTML without sanitization)
     - Exposing sensitive data in error messages

5. **DO NOT flag:**
   - Proper formatting (assume ESLint/Prettier handles this)
   - Minor style preferences
   - Pre-existing issues in unchanged code

6. **Be specific:**
   - Quote exact problematic code
   - Reference line numbers when possible
   - Explain WHY (user impact, maintainability, performance, accessibility)
   - Provide concrete examples with actual code
   - Reference specific Cursor rules (especially `styling-standards.mdc`)

7. **Be constructive:**
   - Focus on helping, not criticizing
   - Acknowledge good practices
   - Prioritize issues (Critical > Warning > Suggestion)

## Example Output

````markdown
## Code Review Summary

**Branch:** feature/social-buttons
**Comparing:** feature/social-buttons → main
**Files Changed:** 2

---

## 🔴 Critical Issues (Must Fix)

### app/components/SocialButtons.tsx (Line 23)

**Issue:** Using blue color (`bg-blue-500`) violates monochrome design system
**Rule Violated:** `styling-standards.mdc` - Only white, gray (gray-50 to gray-900), and black allowed
**Suggestion:** Replace with gray scale equivalent

**Example:**

```tsx
// Current (problematic)
className = 'bg-blue-500 text-white';

// Suggested
className = 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900';
```

### app/components/SocialButtons.tsx (Line 45)

**Issue:** Missing dark mode variant for button background
**Rule Violated:** `styling-standards.mdc` - Always implement both light and dark variants
**Suggestion:** Add `dark:` prefix classes

**Example:**

```tsx
// Current (problematic)
className = 'bg-gray-900 text-white';

// Suggested
className = 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900';
```

---

## 🟡 Warnings (Should Fix)

### app/components/SocialButtons.tsx (Line 67)

**Issue:** Touch target may be too small (missing `min-h-[44px]`)
**Rule Reference:** `styling-standards.mdc` - Minimum 44x44px for interactive elements
**Suggestion:** Add `min-h-[44px]` or ensure padding creates adequate touch area

### app/components/SocialButtons.tsx (Line 89)

**Issue:** Missing focus state indicator
**Rule Reference:** `styling-standards.mdc` - All focusable elements must have visible focus indicators
**Suggestion:** Add `focus:ring-2 focus:ring-gray-500 focus:outline-none`

---

## 💡 Suggestions (Nice to Have)

### app/components/SocialButtons.tsx

**Suggestion:** Consider extracting button className to a constant for reusability
**Why:** Reduces duplication and makes styling easier to maintain across components

---

## ✅ Positive Observations

- ✅ Excellent use of Tailwind utility classes exclusively
- ✅ Proper TypeScript types throughout
- ✅ Good accessibility attributes (aria-labels on all buttons)
- ✅ Icons properly marked with `aria-hidden="true"`
- ✅ Mobile-first responsive design approach
- ✅ Proper use of semantic HTML (`<Link>` elements)

---

## 📊 Summary

- **Critical Issues:** 2
- **Warnings:** 2
- **Suggestions:** 1
- **Overall Assessment:** Needs Work (fix monochrome violations and dark mode before merging)

**Recommendation:** Fix the color violations and add dark mode variants, then address accessibility warnings. Great work on accessibility attributes and TypeScript usage!
````

## Notes

- Run from project root
- Requires git
- Only reviews current branch vs main
- Does not modify files, only provides feedback
- Focus on Next.js App Router, React, TypeScript, monochrome design system, mobile-first design, and accessibility
- Consider both developer experience and end-user impact
- Pay special attention to monochrome palette violations (this is a strict requirement)
