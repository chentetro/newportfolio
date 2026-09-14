import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillCard from '@/app/components/SkillCard';

describe('SkillCard', () => {
  const mockProps = {
    title: 'JavaScript',
    description: 'Modern ES6+ JavaScript with advanced concepts and frameworks',
    className: 'custom-test-class',
  };

  const longText = {
    title:
      'Very Long Skill Title That Should Still Render Cleanly Without Breaking Layout Or Accessibility',
    description:
      'Very long description that contains multiple sentences and is intentionally verbose to verify the component handles extended content safely and still exposes the expected semantic structure.',
  };

  describe('Core Rendering & Props', () => {
    it('renders the title and description content when provided', () => {
      render(<SkillCard {...mockProps} />);

      expect(screen.getByRole('heading', { level: 3, name: mockProps.title })).toBeInTheDocument();
      expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    });

    it('omits the description from the DOM when it is not provided', () => {
      render(<SkillCard title="React" />);

      expect(screen.getByRole('heading', { level: 3, name: 'React' })).toBeInTheDocument();
      expect(screen.queryByText(mockProps.description)).not.toBeInTheDocument();
    });

    it('applies a custom className to the article root element', () => {
      const { container } = render(<SkillCard {...mockProps} />);
      const article = container.querySelector('article');

      expect(article).toHaveClass(mockProps.className);
    });
  });

  describe('Semantic Structure & Accessibility', () => {
    it('uses semantic article markup with heading hierarchy, aria-label, and keyboard focusability', () => {
      render(<SkillCard {...mockProps} />);

      const article = screen.getByLabelText(`Skill: ${mockProps.title}`);
      const heading = screen.getByRole('heading', { level: 3, name: mockProps.title });

      expect(article.tagName).toBe('ARTICLE');
      expect(article).toHaveAttribute('role', 'article');
      expect(article).toHaveAttribute('tabIndex', '0');
      expect(article).toHaveAttribute('aria-label', `Skill: ${mockProps.title}`);
      expect(article).toHaveClass('min-h-[44px]');

      expect(heading.tagName).toBe('H3');
      expect(screen.getAllByRole('heading')).toHaveLength(1);

      article.focus();
      expect(article).toHaveFocus();
    });
  });

  describe('Styling & States', () => {
    it('applies the expected monochrome, dark-mode, and interactive styling classes', () => {
      const { container } = render(<SkillCard {...mockProps} />);
      const article = container.querySelector('article');

      expect(article).toHaveClass(
        'bg-white',
        'dark:bg-gray-900',
        'border-gray-200',
        'dark:border-gray-700',
        'hover:shadow-md',
        'focus:ring-2',
        'focus:ring-gray-500',
        'focus:outline-none',
      );
    });
  });

  describe('Edge Cases & Error Handling', () => {
    it.each([
      {
        label: 'whitespace-only strings',
        props: { title: '   ', description: '\n\n', className: '!!!invalid-class-name' },
      },
      {
        label: 'extremely long content',
        props: longText,
      },
      {
        label: 'minimal props',
        props: { title: 'React' },
      },
      {
        label: 'empty props',
        props: { title: '', description: '', className: '' },
      },
    ])('handles $label without throwing', ({ props }) => {
      expect(() => render(<SkillCard {...props} />)).not.toThrow();
    });
  });
});
