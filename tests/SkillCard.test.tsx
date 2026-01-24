import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SkillCard from '@/app/components/SkillCard';

describe('SkillCard', () => {
  const mockProps = {
    title: 'JavaScript',
    description: 'Modern ES6+ JavaScript with advanced concepts and frameworks',
    className: 'custom-test-class',
  };

  const minimalProps = {
    title: 'React',
    // No description or className
  };

  const emptyMockProps = {
    title: '',
    description: '',
    className: '',
  };

  // 1. Core Functionality Tests
  it('renders all content elements correctly', () => {
    render(<SkillCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('renders title without description when description is not provided', () => {
    render(<SkillCard {...minimalProps} />);

    expect(screen.getByText(minimalProps.title)).toBeInTheDocument();
    expect(screen.queryByText('Modern ES6+')).not.toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const { container } = render(<SkillCard {...mockProps} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass(mockProps.className);
  });

  // 2. Structural Hierarchy Tests
  it('maintains proper heading hierarchy with H3 for card title', () => {
    render(<SkillCard {...mockProps} />);

    // Test that title uses H3 (appropriate for card components)
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveProperty('tagName', 'H3');
    expect(heading).toHaveTextContent(mockProps.title);

    // Ensure no other heading levels are used inappropriately
    const allHeadings = screen.getAllByRole('heading');
    expect(allHeadings).toHaveLength(1);
    expect(allHeadings[0]).toHaveProperty('tagName', 'H3');
  });

  it('uses semantic HTML structure with stable selectors', () => {
    const { container } = render(<SkillCard {...mockProps} />);

    // Use stable selectors for semantic elements
    const articleElement = container.querySelector('article');
    expect(articleElement).toBeInTheDocument();
    expect(articleElement).toHaveAttribute('role', 'article');

    const headingElement = container.querySelector('h3');
    expect(headingElement).toBeInTheDocument();

    const paragraphElement = container.querySelector('p');
    expect(paragraphElement).toBeInTheDocument();
  });

  // 3. Accessibility Tests
  it('meets comprehensive accessibility requirements', () => {
    render(<SkillCard {...mockProps} />);

    // Test article accessibility
    const article = screen.getByLabelText(`Skill: ${mockProps.title}`);
    expect(article).toBeInTheDocument();
    expect(article).toHaveAttribute('role', 'article');
    expect(article).toHaveAttribute('aria-label', `Skill: ${mockProps.title}`);

    // Test interactive accessibility
    expect(article).toHaveAttribute('tabIndex', '0');
    expect(article).toHaveClass('cursor-pointer');

    // Test heading accessibility
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBeTruthy();
    expect(heading.textContent).not.toBe('');
  });

  it('provides adequate touch targets for mobile accessibility', () => {
    const { container } = render(<SkillCard {...mockProps} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('min-h-[44px]');

    // Verify the element is focusable and has proper interactive styling
    expect(article).toHaveClass('cursor-pointer');
    expect(article).toHaveClass('focus:ring-2');
    expect(article).toHaveClass('focus:ring-gray-500');
    expect(article).toHaveClass('focus:outline-none');
  });

  it('supports keyboard navigation properly', () => {
    const { container } = render(<SkillCard {...mockProps} />);

    const article = container.querySelector('article');
    expect(article).toHaveAttribute('tabIndex', '0');

    // Test that focus can be applied
    article?.focus();
    expect(article).toHaveFocus();
  });

  // 4. Styling and Layout Tests
  it('applies correct monochrome styling classes', () => {
    const { container } = render(<SkillCard {...mockProps} />);

    const article = container.querySelector('article');
    // Test background colors (monochrome compliance)
    expect(article).toHaveClass('bg-white');
    expect(article).toHaveClass('dark:bg-gray-900');

    // Test border colors (monochrome compliance)
    expect(article).toHaveClass('border-gray-200');
    expect(article).toHaveClass('dark:border-gray-700');

    // Test text colors (monochrome compliance)
    const heading = container.querySelector('h3');
    expect(heading).toHaveClass('text-gray-900');
    expect(heading).toHaveClass('dark:text-gray-100');

    const paragraph = container.querySelector('p');
    if (paragraph) {
      expect(paragraph).toHaveClass('text-gray-600');
      expect(paragraph).toHaveClass('dark:text-gray-400');
    }
  });

  it('applies correct layout and spacing classes', () => {
    const { container } = render(<SkillCard {...mockProps} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('rounded-lg');
    expect(article).toHaveClass('p-6');
    expect(article).toHaveClass('shadow-sm');

    const paragraph = container.querySelector('p');
    if (paragraph) {
      expect(paragraph).toHaveClass('mt-2');
      expect(paragraph).toHaveClass('text-sm');
      expect(paragraph).toHaveClass('leading-relaxed');
    }

    const heading = container.querySelector('h3');
    expect(heading).toHaveClass('text-lg');
    expect(heading).toHaveClass('font-semibold');
    expect(heading).toHaveClass('leading-relaxed');
  });

  it('applies correct hover and transition effects', () => {
    const { container } = render(<SkillCard {...mockProps} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('hover:shadow-md');
    expect(article).toHaveClass('transition-shadow');
    expect(article).toHaveClass('duration-200');
  });

  // 5. Interactive Behavior Tests
  it('handles user interactions correctly', () => {
    const { container } = render(<SkillCard {...mockProps} />);

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();

    // Test click interaction (should not throw errors)
    fireEvent.click(article!);
    expect(article).toBeInTheDocument();

    // Test that element is focusable
    expect(article).toHaveAttribute('tabIndex', '0');
  });

  it('maintains focus state properly', () => {
    const { container } = render(<SkillCard {...mockProps} />);

    const article = container.querySelector('article');

    // Test that element has proper focus attributes
    expect(article).toHaveAttribute('tabIndex', '0');
    expect(article).toHaveClass('focus:ring-2');
    expect(article).toHaveClass('focus:ring-gray-500');
    expect(article).toHaveClass('focus:outline-none');

    // Test programmatic focus
    article?.focus();
    expect(article).toHaveFocus();
  });

  // 6. Edge Cases and Error Handling
  it('handles empty or missing content gracefully', () => {
    expect(() => render(<SkillCard {...emptyMockProps} />)).not.toThrow();

    // Component should still render basic structure even with empty content
    const { container } = render(<SkillCard {...emptyMockProps} />);
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('handles missing optional props gracefully', () => {
    expect(() => render(<SkillCard title="Unique Test Title" />)).not.toThrow();

    const { container } = render(<SkillCard title="Unique Test Title" />);

    // Should render title using container query to avoid multiple elements
    const heading = container.querySelector('h3');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Unique Test Title');

    // Should not render description paragraph when not provided
    const paragraph = container.querySelector('p');
    expect(paragraph).not.toBeInTheDocument();
  });

  it('handles invalid or edge case data without breaking', () => {
    const edgeCaseProps = {
      title: '   ', // Whitespace only
      description: '\n\n', // Newlines only
      className: '!!!invalid-class-name',
    };

    expect(() => render(<SkillCard {...edgeCaseProps} />)).not.toThrow();
  });

  it('maintains accessibility with minimal content', () => {
    const { container } = render(<SkillCard title="T" />);

    // Should still maintain proper structure
    const article = container.querySelector('article');
    expect(article).toHaveAttribute('aria-label', 'Skill: T');
    expect(article).toHaveAttribute('role', 'article');
    expect(article).toHaveAttribute('tabIndex', '0');

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
  });

  it('renders without component-breaking prop combinations', () => {
    // Test various combinations that shouldn't break the component
    const testCases = [
      { title: 'A' }, // Minimal
      { title: 'Test', description: undefined }, // Explicitly undefined description
      { title: 'Test', className: '' }, // Empty className
      {
        title: 'Very Long Title That Might Cause Layout Issues In Some Cases',
        description:
          'Very long description that contains multiple sentences and might test how the component handles extensive text content without breaking the layout or functionality.',
      },
    ];

    testCases.forEach((props) => {
      expect(() => render(<SkillCard {...props} />)).not.toThrow();
    });
  });
});
