# Validate MDC Rule File (validate-mdc)

Validates a specific `.mdc` rule file according to Cursor's rules format specification at https://cursor.com/docs/context/rules.

## Usage

When this command is invoked, validate the specified `.mdc` rule file:

```
validate-mdc <path-to-rule-file>
```

## Examples

```
validate-mdc .cursor/rules/component-testing.mdc
validate-mdc .cursor/rules/styling-standards.mdc
validate-mdc .cursor/rules/progress-tracking.mdc
```

## Instructions for AI

When this command is run:

1. **Read the specified `.mdc` file:**
   - Verify the file exists and is readable
   - Check that the file has `.mdc` extension
   - Read the file content

2. **Parse YAML frontmatter:**
   - Use `gray-matter` (already installed) to parse the frontmatter
   - Verify frontmatter starts with `---` delimiter
   - Check for valid YAML syntax (no JavaScript-style comments like `//`)
   - Validate that frontmatter exists and is not empty

3. **Validate required fields:**
   - **`description`** (required):
     - Must exist in frontmatter
     - Must be a string type
     - Must be non-empty (after trimming)
     - Should be at least 10 characters (warning if shorter)
     - Should be descriptive and meaningful

4. **Validate optional fields:**
   - **`alwaysApply`** (optional):
     - If present, must be a boolean (`true` or `false`)
     - Must not be a string like `"true"` or `"false"`
     - Report error if wrong type

5. **Validate content:**
   - Check that content exists after frontmatter
   - Content should not be empty (warning if empty)
   - Content should be substantial (warning if less than 50 characters)

6. **Check for common issues:**
   - JavaScript-style comments (`//`) in YAML frontmatter (should use `#` instead)
   - Unknown frontmatter fields (warn about potential typos)
   - File location (warn if not in `.cursor/rules/` directory)

7. **Provide structured feedback:**

   ```markdown
   ## MDC Rule File Validation Results

   **File:** [relative-path-to-file]

   ---

   ## ✅ Valid

   File passes all validation checks.

   OR

   ## ❌ Errors (Must Fix)

   ### [Error Category]

   **Issue:** [Description of the error]
   **Location:** [Line number or field name if applicable]
   **Fix:** [How to fix the issue]

   **Example:**
   ```yaml
   # Current (problematic)
   alwaysApply: true//comment here

   # Fixed
   alwaysApply: true
   # comment here
   ```

   ---

   ## ⚠️ Warnings (Should Fix)

   ### [Warning Category]

   **Issue:** [Description of the warning]
   **Suggestion:** [How to improve]

   ---

   ## 📊 Summary

   - **File:** [file path]
   - **Status:** ✅ Valid | ❌ Invalid | ⚠️ Valid with warnings
   - **Errors:** [count]
   - **Warnings:** [count]
   ```

## Validation Rules

### Required Checks

1. ✅ **File Exists**: File must exist and be readable
2. ✅ **File Extension**: File must have `.mdc` extension
3. ✅ **YAML Frontmatter**: Must have valid YAML frontmatter starting with `---`
4. ✅ **Description Field**: Must have `description` field that is:
   - Present in frontmatter
   - A string type (not boolean, number, etc.)
   - Non-empty after trimming
5. ✅ **AlwaysApply Type**: If `alwaysApply` exists, must be boolean

### Warning Checks

1. ⚠️ **Description Length**: Description should be at least 10 characters
2. ⚠️ **Content Exists**: File should have content after frontmatter
3. ⚠️ **Content Length**: Content should be substantial (at least 50 characters)
4. ⚠️ **File Location**: File should be in `.cursor/rules/` directory
5. ⚠️ **Unknown Fields**: Unknown frontmatter fields (potential typos)
6. ⚠️ **YAML Comments**: JavaScript-style comments (`//`) detected in YAML

## Common Issues and Fixes

### Issue: JavaScript-style comment in YAML

**Problem:**
```yaml
alwaysApply: true//comment here
```

**Fix:**
```yaml
alwaysApply: true
# comment here
```

### Issue: Missing description field

**Problem:**
```yaml
---
alwaysApply: true
---
```

**Fix:**
```yaml
---
description: "Description of what this rule does"
alwaysApply: true
---
```

### Issue: Description is not a string

**Problem:**
```yaml
---
description: true
---
```

**Fix:**
```yaml
---
description: "Description of what this rule does"
---
```

### Issue: AlwaysApply is a string instead of boolean

**Problem:**
```yaml
---
description: "Rule description"
alwaysApply: "true"
---
```

**Fix:**
```yaml
---
description: "Rule description"
alwaysApply: true
---
```

## Integration with Cursor Rules

This validation ensures compliance with Cursor's official rules format:
- Reference: https://cursor.com/docs/context/rules
- Rules should be stored in `.cursor/rules/` directory
- Rules should have proper YAML frontmatter with description
- Rules should be well-structured and focused

## Expected Behavior

### Successful Validation

```
✅ File: .cursor/rules/component-testing.mdc
✅ Status: Valid
✅ All checks passed
```

### Validation with Errors

```
❌ File: .cursor/rules/component-testing.mdc
❌ Status: Invalid
❌ Errors: 1
   • JavaScript-style comment (//) in YAML frontmatter at line 3
```

### Validation with Warnings

```
⚠️ File: .cursor/rules/component-testing.mdc
⚠️ Status: Valid with warnings
⚠️ Warnings: 1
   • Description is very short (8 chars). Consider a more detailed description.
```

## Related Commands

- `code-review` - Review code changes against Cursor rules
- `precommit` - Run quality checks including rule compliance

## Notes

- Uses `gray-matter` package (already installed) for parsing YAML frontmatter
- Validation is performed by the AI, not a separate script
- Focuses on structure and format, not content quality (that's subjective)
- Follows Cursor's official documentation for rule file format

---

_This command validates `.mdc` rule files to ensure they comply with Cursor's rules format specification, helping maintain consistency and correctness across project rules._

