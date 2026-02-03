# Reflect Changes Command

This command helps you reflect on and summarize recent changes made to the codebase, providing insights into what was implemented, modified, or fixed.

## Usage

Use this command when you want to:

- **Summarize Recent Work** - Get an overview of what changes have been made
- **Document Progress** - Create a summary of completed tasks and implementations
- **Review Modifications** - Understand the scope and impact of recent changes
- **Prepare Status Updates** - Generate content for team updates or documentation
- **Update Progress Documents** - Automatically update progress tracking files per `progress-tracking.mdc` rules

## What This Command Does

1. **Analyzes Recent Changes** - Reviews git commits, file modifications, and code changes
2. **Categorizes Updates** - Groups changes by type (features, fixes, refactoring, etc.)
3. **Identifies Key Components** - Highlights which files and components were modified
4. **Validates Next.js Patterns** - Checks adherence to Next.js App Router patterns and TypeScript best practices
5. **Reviews Design System Compliance** - Ensures proper use of Tailwind CSS and monochrome design system
6. **Validates Accessibility** - Checks WCAG 2.1 AA compliance and accessibility standards
7. **Summarizes Impact** - Explains the business value and technical improvements
8. **Updates Progress Tracking** - Automatically updates progress documents in `.cursor/progress/` folder per `progress-tracking.mdc` rules
9. **Provides Context** - Links changes to requirements, issues, or user stories

## Example Output

The command will provide a structured reflection including:

- **📋 Summary of Changes** - High-level overview of what was accomplished
- **🔧 Technical Modifications** - Specific code changes and implementations
- **✅ Features Added** - New functionality and capabilities
- **🐛 Issues Fixed** - Bugs resolved and problems addressed
- **♿ Accessibility Improvements** - UX/accessibility enhancements
- **🧪 Testing Updates** - Test coverage and quality improvements
- **📚 Documentation Changes** - README updates, comments, and docs
- **📊 Progress Updates** - Automatic updates to progress tracking documents

### Next.js App Router Pattern Compliance

- **🎯 Component Structure** - Adherence to file organization and naming conventions
- **📝 TypeScript Usage** - Proper interface definitions and type safety
- **🎨 Styling Patterns** - Tailwind CSS v4 usage and monochrome design system compliance
- **♿ Accessibility Standards** - WCAG 2.1 AA compliance, ARIA labels, semantic HTML
- **🔄 State Management** - Proper useState usage for local state
- **🧩 Component Architecture** - Separation of concerns and single responsibility
- **⌨️ Keyboard Navigation** - Focus management and keyboard accessibility
- **📱 Mobile-First Design** - Responsive design with mobile-first approach
- **🌓 Dark Mode** - Proper dark mode implementation with `dark:` variants

### Design System Compliance

- **✅ Monochrome Palette** - Strict adherence to white, gray (gray-50 to gray-900), and black for foreground elements
- **🎨 Background Gradients** - Light pastel colors (shades 50-100) allowed only for backgrounds
- **📐 Tailwind CSS Usage** - Exclusive use of Tailwind utility classes, no inline styles
- **📱 Mobile-First** - All components designed for mobile screens first (375px minimum)
- **🌓 Dark Mode Variants** - All colors have appropriate dark mode variants
- **♿ Accessibility** - Touch targets (44x44px minimum), focus states, semantic HTML

## Best Practices

- Use this command after completing a feature or significant work session
- Run it before code reviews to prepare comprehensive summaries
- Include it in your workflow when preparing release notes
- Use the output to update project documentation and status reports
- Review Next.js App Router pattern compliance before committing
- Ensure proper accessibility standards are followed
- Validate TypeScript usage and component architecture
- Verify monochrome design system compliance
- Check mobile-first responsive design implementation

## Specific Checks Performed

### Next.js App Router Pattern Validation

The command will specifically check for:

- **Component Structure**: PascalCase naming, proper file organization in `app/components/`
- **TypeScript Interfaces**: Proper prop definitions and type safety
- **Server vs Client Components**: Correct use of `"use client"` directive
- **Metadata Exports**: Proper metadata exports for pages
- **Route Organization**: Correct App Router file structure
- **Accessibility**: WCAG 2.1 AA compliance, ARIA labels, semantic HTML
- **Styling**: Tailwind CSS v4 usage, monochrome palette compliance, responsive design
- **State Management**: Proper useState usage for local state
- **Error Handling**: Proper error boundaries and user-friendly error messages
- **Performance**: Component optimization and lazy loading where appropriate

### Design System Validation

The command will check for:

- **Monochrome Palette**: Only white, gray (gray-50 to gray-900), and black for foreground elements
- **Background Colors**: Light pastels (shades 50-100) allowed only for backgrounds
- **Tailwind Usage**: Exclusive use of Tailwind utility classes, no inline styles
- **Mobile-First**: Components designed for mobile screens first (375px minimum)
- **Responsive Breakpoints**: Proper use of `sm:`, `md:`, `lg:`, `xl:`, `2xl:` breakpoints
- **Dark Mode**: All colors have appropriate `dark:` variants
- **Touch Targets**: Minimum 44x44px for all interactive elements
- **Focus States**: Visible focus indicators on all focusable elements
- **Semantic HTML**: Proper use of `<button>`, `<nav>`, `<section>`, etc.

### Progress Tracking Integration

The command will automatically:

- **Check for Progress Documents**: Look for relevant progress files in `.cursor/progress/`
- **Update Completed Steps**: Move completed steps from "Pending" to "Completed" sections
- **Add Commit References**: Include commit hashes or messages in progress updates
- **Update Progress Counters**: Update overall progress percentage and phase breakdowns
- **Document Fixes**: Add entries for code review fixes and bug fixes
- **Update Timestamps**: Update "Last Updated" timestamp at bottom of document

## Related Commands

- `precommit` - Run quality checks before committing changes
- `code-review` - Review changes against main branch
- `progress-md` - Create progress tracking documents
- `add-tests` - Add tests for recent changes

## Example Usage Scenarios

### After Feature Implementation

```
🎯 Use Case: Just completed navbar component feature
✅ Check: Component structure, design system compliance, accessibility
📋 Output: Comprehensive analysis of Next.js patterns and design system adherence
📊 Progress: Automatic update to navbar-implementation.md progress file
```

### Before Code Review

```
🎯 Use Case: Preparing for team code review
✅ Check: TypeScript usage, Tailwind CSS patterns, monochrome palette compliance
📋 Output: Detailed compliance report with improvement suggestions
```

### After Code Review Fixes

```
🎯 Use Case: Fixed issues found in code review
✅ Check: Design system violations, accessibility issues, TypeScript errors
📋 Output: Summary of fixes applied with automatic progress document updates
📊 Progress: New step entry added to progress file documenting fixes
```

### Design System Audit

```
🎯 Use Case: Regular design system maintenance
✅ Check: Monochrome palette violations, Tailwind usage, mobile-first compliance
📋 Output: Design system compliance report with specific violations
```

---

_This command helps maintain project visibility, ensures Next.js App Router pattern compliance, validates monochrome design system adherence, and automatically updates progress tracking documents per `progress-tracking.mdc` rules._
