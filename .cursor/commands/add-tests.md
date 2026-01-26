# Add Tests Command

This command helps you create minimal, effective tests for recent changes using Vitest and React Testing Library with best practices focused on real user interactions, accessibility, and structural hierarchy validation.

## Usage

Use this command when you want to:

- **Add Tests for New Components** - Create focused tests for recently added components
- **Test User Interactions** - Verify components work as users would interact with them
- **Ensure Accessibility** - Use recommended queries that also validate a11y
- **Validate Structural Hierarchy** - Test proper H1 → H2 → H3 heading order
- **Minimal Test Coverage** - Create the minimum number of tests for good coverage
- **Real User Scenarios** - Test actual user workflows, not implementation details

## Testing Philosophy

### **🎯 User-Centric Testing**

- Test what users see and do, not internal implementation
- Use accessibility-focused queries (getByRole, getByLabelText)
- Focus on user interactions and expected outcomes
- Avoid testing implementation details or internal state

### **🚫 Minimal Mocking**

- Mock only external dependencies (APIs, third-party libraries)
- Don't mock internal components or utilities
- Use real DOM interactions when possible
- Prefer integration tests over isolated unit tests

### **✅ Quality Over Quantity**

- Write fewer, more meaningful tests
- Focus on critical user paths and edge cases
- Each test should have a clear, single purpose
- Descriptive test names that explain the user scenario

### **📐 Structural Hierarchy First**

- Always test proper heading hierarchy (H1 → H2 → H3)
- Use stable selectors (querySelector) for semantic elements
- Verify both semantic structure and visual hierarchy
- Test accessibility alongside functionality

## What This Command Does

1. **Analyzes Recent Changes** - Identifies new components and modified functionality
2. **Determines Test Strategy** - Decides what needs testing based on component type
3. **Generates Test Files** - Creates test files in `tests/` directory with proper structure and naming
4. **Uses Best Practices** - Implements recommended testing patterns from `component-testing.mdc`
5. **Focuses on Accessibility** - Uses queries that validate a11y compliance per `styling-standards.mdc`
6. **Validates Structure** - Tests structural hierarchy and semantic HTML
7. **Minimal Coverage** - Creates only essential tests for good coverage

## Test Types Created

### **🧩 Component Tests**

- **Rendering**: Component renders without crashing
- **Structural Hierarchy**: Proper H1 → H2 → H3 heading order
- **Semantic HTML**: Uses stable selectors (querySelector) for semantic elements
- **User Interactions**: Click, type, keyboard navigation
- **Accessibility**: Screen reader compatibility, ARIA attributes, touch targets
- **State Changes**: User actions produce expected results
- **Direct Verification**: Link attributes, image sources verified directly

### **🔄 Hook Tests**

- **Return Values**: Hook returns expected data structure
- **State Updates**: State changes work correctly
- **Side Effects**: useEffect and cleanup functions work

### **🎯 Integration Tests**

- **User Workflows**: Complete user scenarios
- **Component Interaction**: Multiple components working together
- **Form Submission**: End-to-end form workflows

## Testing Patterns & Examples

### **✅ Good Test Example - Structural Hierarchy**

```typescript
describe('ComponentName', () => {
  it('maintains proper heading hierarchy', () => {
    render(<ComponentName {...mockProps} />);
    
    // Test semantic structure
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toHaveProperty('tagName', 'H1');
    expect(headings[1]).toHaveProperty('tagName', 'H2');
    
    // Test specific content
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Expected Title');
    
    const subHeading = screen.getByRole('heading', { level: 2 });
    expect(subHeading).toHaveTextContent('Expected Subtitle');
  });
});
```

### **✅ Good Test Example - Stable Selectors**

```typescript
describe('ComponentName', () => {
  it('uses semantic HTML structure with stable selectors', () => {
    const { container } = render(<ComponentName {...mockProps} />);
    
    // Use querySelector for semantic elements (stable, doesn't fail on nesting)
    const headerElement = container.querySelector('header');
    expect(headerElement).toBeInTheDocument();
    
    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
    
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toBeInTheDocument();
  });
});
```

### **✅ Good Test Example - Direct Verification**

```typescript
describe('ComponentName', () => {
  it('renders links with correct attributes', () => {
    render(<ComponentName {...mockProps} />);
    
    const link = screen.getByLabelText('Visit GitHub profile');
    expect(link).toHaveAttribute('href', mockProps.githubUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
  
  it('renders images with correct attributes', () => {
    render(<ComponentName {...mockProps} />);
    
    const image = screen.getByAltText(mockProps.imageAlt);
    expect(image).toHaveAttribute('src', mockProps.imageUrl);
    expect(image).toHaveAttribute('alt', mockProps.imageAlt);
  });
});
```

### **✅ Good Test Example - User Interaction**

```typescript
describe('ComponentName', () => {
  it('allows user to interact with component', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    
    render(<ComponentName onClick={mockOnClick} />);
    
    // User sees the component
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    
    // User clicks the button
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    // System responds correctly
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
```

### **❌ Avoid These Patterns**

```typescript
// Don't test implementation details
expect(component.state.isLoading).toBe(false)

// Don't test internal methods
expect(component.handleClick).toHaveBeenCalled()

// Don't use fragile ARIA roles for nested semantic elements
screen.getByRole('banner') // Use querySelector('header') instead

// Don't use generic queries when specific ones exist
screen.getByTestId('submit-button') // Use getByRole('button') instead

// Don't over-mock internal components
vi.mock('./ComponentName') // Test the real component
```

## Recommended Queries Priority

### **🥇 First Choice - Accessible to Everyone**

```typescript
// Best for buttons, links, form elements
screen.getByRole('button', { name: /save/i })
screen.getByRole('textbox', { name: /search/i })

// Best for form labels
screen.getByLabelText(/email address/i)

// Best for text content users see
screen.getByText(/welcome back/i)

// Best for headings (with level)
screen.getByRole('heading', { level: 1 })
screen.getByRole('heading', { level: 2 })
```

### **🥈 Second Choice - Semantic HTML**

```typescript
// For headings, landmarks
screen.getByDisplayValue('current input value')
screen.getByPlaceholderText(/enter your name/i)

// For semantic elements (use querySelector for stability)
const { container } = render(<Component />);
container.querySelector('header')
container.querySelector('nav')
container.querySelector('section')
```

### **🥉 Last Resort - When Nothing Else Works**

```typescript
// Only when accessibility queries don't work
screen.getByTestId('complex-component')
```

## Test File Structure

### **Component Test Template**

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentName } from '../app/components/ComponentName'

describe('ComponentName', () => {
  const mockProps = {
    // Define comprehensive mock props matching TypeScript interface
  };

  // 1. Core Functionality
  it('renders all content elements correctly', () => {
    render(<ComponentName {...mockProps} />);
    // Test basic rendering and content
  });

  // 2. Structural Hierarchy
  it('maintains proper heading hierarchy', () => {
    render(<ComponentName {...mockProps} />);
    // Test H1 → H2 → H3 structure
  });

  it('uses semantic HTML structure', () => {
    const { container } = render(<ComponentName {...mockProps} />);
    // Test semantic elements with stable selectors
  });

  // 3. Accessibility
  it('meets accessibility requirements', () => {
    render(<ComponentName {...mockProps} />);
    // Test aria-labels, aria-hidden, touch targets
  });

  // 4. Styling and Layout
  it('applies correct styling classes', () => {
    const { container } = render(<ComponentName {...mockProps} />);
    // Test CSS classes and responsive design
  });

  // 5. Interactive Behavior
  it('handles user interactions correctly', async () => {
    const user = userEvent.setup();
    render(<ComponentName {...mockProps} />);
    // Test clicks, hovers, form submissions
  });

  // 6. Edge Cases
  it('handles empty or missing content gracefully', () => {
    // Test error boundaries and fallbacks
  });
});
```

### **Hook Test Template**

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCustomHook } from '../app/hooks/useCustomHook'

describe('useCustomHook', () => {
  it('returns expected initial state', () => {
    const { result } = renderHook(() => useCustomHook())

    expect(result.current.value).toBe(expectedValue)
  })

  it('updates state when action is called', () => {
    const { result } = renderHook(() => useCustomHook())

    act(() => {
      result.current.updateValue('new value')
    })

    expect(result.current.value).toBe('new value')
  })
})
```

## Specific Checks Performed

### **Component Analysis**

- **New Components**: Identifies recently added React components in `app/components/`
- **Modified Components**: Detects significant changes to existing components
- **User Interactions**: Maps out clickable elements, form inputs, navigation
- **Accessibility Features**: Identifies ARIA attributes, semantic HTML
- **Structural Hierarchy**: Checks for proper H1 → H2 → H3 heading order

### **Test Coverage Strategy**

- **Critical Paths**: User workflows that must work correctly
- **Structural Hierarchy**: Proper heading order and semantic structure
- **Stable Selectors**: Use querySelector for semantic elements
- **Direct Verification**: Link attributes, image sources verified directly
- **Error States**: How component handles errors and edge cases
- **Accessibility**: Screen reader compatibility and keyboard navigation
- **Integration Points**: How components work together

### **Mock Strategy**

- **External APIs**: Mock HTTP requests and external services
- **Third-party Libraries**: Mock complex external dependencies
- **Real Components**: Use actual internal components when possible
- **User Events**: Use real DOM events via @testing-library/user-event

## Best Practices Enforced

### **📝 Test Naming**

```typescript
// ✅ Good: Describes user behavior
it('shows error message when email is invalid')
it('allows user to filter results by status')
it('saves form data when user clicks submit')
it('maintains proper heading hierarchy')

// ❌ Bad: Describes implementation
it('calls handleSubmit function')
it('sets state.loading to true')
it('renders without errors')
```

### **🎯 Test Focus**

- **One Assertion Per Concept**: Each test verifies one user scenario
- **Clear Setup**: Minimal, focused test setup
- **Real Interactions**: Use user-event library for realistic interactions
- **Meaningful Assertions**: Assert on user-visible outcomes
- **Structural Validation**: Always test heading hierarchy and semantic HTML

### **♿ Accessibility Testing**

```typescript
// ✅ Good: Tests accessibility while testing functionality
const button = screen.getByRole('button', { name: /delete item/i })
expect(button).toHaveAttribute('aria-label')

// ✅ Good: Tests keyboard navigation
const user = userEvent.setup();
await user.keyboard('{Tab}')
expect(screen.getByRole('button')).toHaveFocus()

// ✅ Good: Tests touch targets (44x44px minimum)
const { container } = render(<Component />);
const button = container.querySelector('button');
const styles = window.getComputedStyle(button);
expect(parseInt(styles.minHeight) || parseInt(styles.height)).toBeGreaterThanOrEqual(44);

// ✅ Good: Tests screen reader content
expect(screen.getByRole('alert')).toHaveTextContent('Error occurred')
```

### **📐 Structural Hierarchy Testing**

```typescript
// ✅ Good: Tests both semantic and visual hierarchy
it('maintains proper heading hierarchy', () => {
  render(<Component {...props} />);
  
  const headings = screen.getAllByRole('heading');
  expect(headings[0]).toHaveProperty('tagName', 'H1');
  expect(headings[1]).toHaveProperty('tagName', 'H2');
  
  const mainHeading = screen.getByRole('heading', { level: 1 });
  expect(mainHeading).toHaveTextContent('Expected Title');
});
```

## Related Commands

- `precommit` - Runs tests as part of quality checks
- `reflect-changes` - Identifies what components need testing
- `code-review` - Reviews code quality and patterns

## Example Usage Scenarios

### **After Component Creation**

```
🎯 Use Case: Created new Navbar component
✅ Tests Added: Structural hierarchy, semantic HTML, accessibility, user interactions
📋 Coverage: Critical user workflows with accessibility validation
📐 Structure: H1 → H2 heading order verified
```

### **After Bug Fix**

```
🎯 Use Case: Fixed component crash issue
✅ Tests Added: Component renders, user can interact, no errors
📋 Coverage: Regression prevention with real user interactions
```

### **Before Feature Release**

```
🎯 Use Case: Completed feature implementation
✅ Tests Added: End-to-end user workflows, edge cases, error states
📋 Coverage: Complete user journey with minimal but effective tests
📐 Structure: All components verified for proper heading hierarchy
```

## References

- `.cursor/rules/component-testing.mdc` - Comprehensive testing standards
- `.cursor/rules/styling-standards.mdc` - Accessibility and design system requirements
- `tests/` directory - Existing test file structure

---

_This command creates focused, user-centric tests that validate real functionality while ensuring accessibility compliance, structural hierarchy, and proper semantic HTML, using the minimum number of tests needed for confident coverage._

