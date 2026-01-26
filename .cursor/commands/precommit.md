# Precommit Command

Comprehensive pre-commit workflow that runs all quality checks automatically before committing changes.

## Overview

This command runs all standard quality checks using npm scripts to ensure code quality, type safety, formatting, and test coverage before committing changes.

## What it does

### Core Quality Checks

- **TypeScript Compilation** - `npm run type-check`
- **ESLint Code Quality** - `npm run lint`
- **Prettier Formatting** - `npm run format`
- **Test Suite** - `npm run test`

### Validation Script

The project includes a `validate` script that runs all checks:
- `npm run validate` - Runs lint, format, type-check, and test sequentially

## Usage

### Run All Quality Checks

```bash
npm run validate
```

Runs all quality checks in sequence (ESLint, Prettier, TypeScript, Tests).

### Individual Checks

```bash
npm run lint          # ESLint checks
npm run format        # Prettier formatting
npm run type-check    # TypeScript compilation
npm run test          # Test suite
```

### Pre-Commit Workflow

Before committing, run:

```bash
npm run validate
```

This ensures:
- ✅ Code follows ESLint rules
- ✅ Code is properly formatted
- ✅ TypeScript compiles without errors
- ✅ All tests pass

## Quality Checks Performed

### TypeScript Compilation

- Validates all TypeScript files compile without errors
- Checks type safety and interface compliance
- Ensures no `any` types or missing type definitions
- Verifies Next.js App Router patterns

### ESLint Code Quality

- Enforces code style and best practices
- Checks for common errors and anti-patterns
- Validates React and Next.js specific rules
- Ensures consistent code style across the project

### Prettier Formatting

- Automatically formats code to consistent style
- Ensures consistent indentation and spacing
- Formats TypeScript, JavaScript, JSON, and Markdown files

### Test Suite

- Runs all tests using Vitest
- Validates component functionality
- Ensures accessibility compliance
- Verifies structural hierarchy requirements

## Integration with Cursor Rules

The precommit checks validate compliance with:

- **`.cursor/rules/styling-standards.mdc`** - Monochrome design system, Tailwind CSS usage, mobile-first design, accessibility
- **`.cursor/rules/component-testing.mdc`** - Testing standards, structural hierarchy, stable selectors
- **`.cursor/rules/progress-tracking.mdc`** - Progress document updates (when applicable)

## Expected Behavior

### Successful Precommit

When all checks pass:

```
✅ ESLint: No errors
✅ Prettier: Code formatted
✅ TypeScript: No type errors
✅ Tests: All tests passing

Ready to commit!
```

### Failed Precommit

If any check fails:

```
❌ ESLint: Found 2 errors
❌ TypeScript: 1 type error
❌ Tests: 1 test failing

Fix errors before committing.
```

The command will stop on the first error to provide immediate feedback.

## Commit Message Best Practices

After running precommit checks, use conventional commit format:

### Commit Types

- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `chore:` - Maintenance tasks

### Example Commit Messages

```bash
feat: add navbar component with four navigation links

fix: resolve monochrome palette violation in SocialButtons

test: add comprehensive tests for Navbar component

refactor: improve mobile-first responsive design in FirstHome

docs: update progress tracking documentation
```

## Workflow Integration

### Before Committing

1. **Stage your changes:**
   ```bash
   git add .
   ```

2. **Run precommit checks:**
   ```bash
   npm run validate
   ```

3. **Fix any errors** that are reported

4. **Commit your changes:**
   ```bash
   git commit -m "feat: your commit message"
   ```

### Automated Precommit Hook (Optional)

You can set up a git pre-commit hook to run checks automatically:

Create `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npm run validate
```

Make it executable:

```bash
chmod +x .git/hooks/pre-commit
```

## Quality Gates

Before committing, ensure:

- ✅ **TypeScript**: No type errors
- ✅ **ESLint**: No linting errors
- ✅ **Prettier**: Code is formatted
- ✅ **Tests**: All tests passing
- ✅ **Design System**: Monochrome palette compliance
- ✅ **Accessibility**: WCAG 2.1 AA compliance
- ✅ **Mobile-First**: Responsive design verified
- ✅ **Structural Hierarchy**: Proper H1 → H2 → H3 order

## Related Commands

- `code-review` - Review changes against main branch
- `reflect-changes` - Summarize and validate recent changes
- `add-tests` - Add tests for recent components
- `progress-md` - Create progress tracking documents

## Troubleshooting

### TypeScript Errors

If you see TypeScript errors:
- Check for missing type definitions
- Ensure all props have proper interfaces
- Verify Next.js App Router patterns

### ESLint Errors

If you see ESLint errors:
- Review the error message for specific rule violations
- Check `.cursor/rules/styling-standards.mdc` for design system requirements
- Ensure proper accessibility attributes

### Test Failures

If tests fail:
- Review test output for specific failures
- Check `.cursor/rules/component-testing.mdc` for testing standards
- Ensure structural hierarchy and accessibility requirements are met

### Formatting Issues

If Prettier reports issues:
- Run `npm run format` to auto-fix formatting
- Review Prettier configuration if needed

## Best Practices

1. **Run precommit checks frequently** - Don't wait until commit time
2. **Fix errors immediately** - Address issues as they arise
3. **Keep tests passing** - Don't commit with failing tests
4. **Follow commit message conventions** - Use semantic commit messages
5. **Update progress documents** - Per `progress-tracking.mdc` rules when applicable

---

_This command ensures code quality, type safety, and test coverage before committing changes, maintaining high standards throughout the development process._

