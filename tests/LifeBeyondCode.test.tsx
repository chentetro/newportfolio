import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LifeBeyondCode from '@/app/components/LifeBeyondCode';
import { interestsData } from '@/content/interests';
import type { LifeBeyondCodeProps, InterestCard } from '@/app/types/interests';
import { FaUtensils } from 'react-icons/fa';

describe('LifeBeyondCode', () => {
  const mockProps: LifeBeyondCodeProps = {
    mainHeading: 'Life Beyond Code',
    description:
      "When I'm not coding, I'm exploring the world, creating music, and finding inspiration in the little things that make life beautiful.",
    sectionHeading: 'What I Love Doing',
    interests: interestsData,
  };

  const emptyMockProps: LifeBeyondCodeProps = {
    mainHeading: '',
    description: '',
    sectionHeading: '',
    interests: [],
  };

  // 1. Core Functionality Tests
  it('renders all content elements correctly', () => {
    render(<LifeBeyondCode {...mockProps} />);

    expect(screen.getByText('Life Beyond Code')).toBeInTheDocument();
    expect(
      screen.getByText(
        "When I'm not coding, I'm exploring the world, creating music, and finding inspiration in the little things that make life beautiful."
      )
    ).toBeInTheDocument();
    expect(screen.getByText('What I Love Doing')).toBeInTheDocument();
  });

  it('renders with all props', () => {
    render(<LifeBeyondCode {...mockProps} />);

    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Life Beyond Code');

    const sectionHeading = screen.getByRole('heading', { level: 2 });
    expect(sectionHeading).toHaveTextContent('What I Love Doing');

    const description = screen.getByText(
      "When I'm not coding, I'm exploring the world, creating music, and finding inspiration in the little things that make life beautiful."
    );
    expect(description).toBeInTheDocument();
  });

  it('renders all four interest cards', () => {
    render(<LifeBeyondCode {...mockProps} />);

    expect(screen.getByText('Cooking')).toBeInTheDocument();
    expect(screen.getByText('Workout')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });

  it('renders interest card descriptions correctly', () => {
    render(<LifeBeyondCode {...mockProps} />);

    expect(
      screen.getByText('Exploring new recipes and culinary techniques')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Kickboxing and Pilates to stay active and energized')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Listening to Latin music and discovering new artists')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Sci-fi novels and personal development books')
    ).toBeInTheDocument();
  });

  it('renders heart icon in gradient section', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const heartIcon = container.querySelector('svg');
    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders all interest card icons', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    // Heart icon + 4 interest icons = 5 total SVG elements
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBe(5);
  });

  it('handles empty interests array gracefully', () => {
    render(<LifeBeyondCode {...emptyMockProps} />);

    expect(screen.getByText('No interests to display.')).toBeInTheDocument();
  });

  // 2. Structural Hierarchy Tests
  it('maintains proper heading hierarchy', () => {
    render(<LifeBeyondCode {...mockProps} />);

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(6); // 1 H1 + 1 H2 + 4 H3

    // Test semantic structure
    expect(headings[0]).toHaveProperty('tagName', 'H1');
    expect(headings[1]).toHaveProperty('tagName', 'H2');

    // Test specific content
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Life Beyond Code');

    const sectionHeading = screen.getByRole('heading', { level: 2 });
    expect(sectionHeading).toHaveTextContent('What I Love Doing');

    const cardHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(cardHeadings.length).toBe(4);
    expect(cardHeadings[0]).toHaveProperty('tagName', 'H3');
    expect(cardHeadings[0]).toHaveTextContent('Cooking');
  });

  it('uses semantic HTML structure with stable selectors', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const sectionElement = container.querySelector('section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveAttribute(
      'aria-label',
      'Life beyond code section'
    );
    expect(sectionElement).toHaveAttribute('role', 'region');

    const articleElements = container.querySelectorAll('article');
    expect(articleElements.length).toBe(4);

    articleElements.forEach((article) => {
      expect(article).toHaveAttribute('aria-label');
      expect(article.getAttribute('aria-label')).toContain('Interest:');
    });
  });

  it('renders interest cards in correct order', () => {
    render(<LifeBeyondCode {...mockProps} />);

    const cardHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(cardHeadings[0]).toHaveTextContent('Cooking');
    expect(cardHeadings[1]).toHaveTextContent('Workout');
    expect(cardHeadings[2]).toHaveTextContent('Music');
    expect(cardHeadings[3]).toHaveTextContent('Reading');
  });

  // 3. Accessibility Tests
  it('meets comprehensive accessibility requirements', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    // Verify section has aria-label
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-label', 'Life beyond code section');
    expect(section).toHaveAttribute('role', 'region');

    // Verify all decorative icons have aria-hidden
    const svgIcons = container.querySelectorAll('svg');
    svgIcons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    // Verify all article elements have aria-label
    const articles = container.querySelectorAll('article');
    articles.forEach((article) => {
      expect(article).toHaveAttribute('aria-label');
      const ariaLabel = article.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('Interest:');
    });
  });

  it('provides proper semantic structure for screen readers', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const section = container.querySelector('section[role="region"]');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-label');

    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(4);

    articles.forEach((article) => {
      expect(article).toHaveAttribute('aria-label');
    });
  });

  it('marks all decorative icons with aria-hidden', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const svgIcons = container.querySelectorAll('svg');
    expect(svgIcons.length).toBe(5); // Heart + 4 interest icons

    svgIcons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // 4. Styling and Layout Tests
  it('applies correct styling classes to section', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('w-full');
  });

  it('applies correct gradient background classes', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const gradientSection = container.querySelector(
      '.bg-gradient-to-br.from-blue-50.to-white'
    );
    expect(gradientSection).toBeInTheDocument();
    expect(gradientSection).toHaveClass('bg-gradient-to-br');
    expect(gradientSection).toHaveClass('from-blue-50', 'to-white');
    expect(gradientSection).toHaveClass(
      'dark:from-gray-800',
      'dark:to-gray-900'
    );
    expect(gradientSection).toHaveClass('py-12', 'px-4');
  });

  it('applies correct styling classes to main heading', () => {
    render(<LifeBeyondCode {...mockProps} />);

    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveClass('text-3xl', 'lg:text-4xl');
    expect(mainHeading).toHaveClass('font-bold');
    expect(mainHeading).toHaveClass('text-gray-900', 'dark:text-gray-100');
  });

  it('applies correct styling classes to section heading', () => {
    render(<LifeBeyondCode {...mockProps} />);

    const sectionHeading = screen.getByRole('heading', { level: 2 });
    expect(sectionHeading).toHaveClass('text-2xl', 'lg:text-3xl');
    expect(sectionHeading).toHaveClass('font-semibold');
    expect(sectionHeading).toHaveClass('text-gray-900', 'dark:text-gray-100');
    expect(sectionHeading).toHaveClass('text-center', 'mb-8');
  });

  it('applies correct styling classes to interest cards', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(4);

    articles.forEach((article) => {
      expect(article).toHaveClass('bg-white', 'dark:bg-gray-900');
      expect(article).toHaveClass('rounded-lg', 'p-6');
      expect(article).toHaveClass('shadow-sm');
      expect(article).toHaveClass(
        'border',
        'border-gray-200',
        'dark:border-gray-700'
      );
      expect(article).toHaveClass('hover:shadow-md');
      expect(article).toHaveClass('transition-shadow', 'duration-200');
    });
  });

  it('applies correct styling classes to card headings', () => {
    render(<LifeBeyondCode {...mockProps} />);

    const cardHeadings = screen.getAllByRole('heading', { level: 3 });
    cardHeadings.forEach((heading) => {
      expect(heading).toHaveClass('text-lg', 'font-semibold');
      expect(heading).toHaveClass('text-gray-900', 'dark:text-gray-100');
      expect(heading).toHaveClass('mb-2', 'text-center');
    });
  });

  it('applies correct responsive grid layout classes', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid-cols-1');
    expect(gridContainer).toHaveClass('sm:grid-cols-2');
    expect(gridContainer).toHaveClass('lg:grid-cols-4');
    expect(gridContainer).toHaveClass('gap-6');
  });

  it('applies correct styling classes to icon circles', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const iconCircles = container.querySelectorAll('.rounded-full.bg-blue-50');
    expect(iconCircles.length).toBe(4);

    iconCircles.forEach((circle) => {
      expect(circle).toHaveClass('w-16', 'h-16');
      expect(circle).toHaveClass('rounded-full');
      expect(circle).toHaveClass('bg-blue-50', 'dark:bg-gray-700');
      expect(circle).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  it('applies correct monochrome color classes to icons', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const icons = container.querySelectorAll('svg');
    icons.forEach((icon) => {
      expect(icon).toHaveClass('text-gray-700', 'dark:text-gray-300');
    });
  });

  it('applies correct container constraints', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const maxWidthContainers = container.querySelectorAll('.max-w-6xl.mx-auto');
    expect(maxWidthContainers.length).toBe(2); // One in each section

    maxWidthContainers.forEach((container) => {
      expect(container).toHaveClass('max-w-6xl');
      expect(container).toHaveClass('mx-auto');
    });
  });

  it('applies correct white background section classes', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const whiteSection = container.querySelector(
      '.bg-white.dark\\:bg-gray-900'
    );
    expect(whiteSection).toBeInTheDocument();
    expect(whiteSection).toHaveClass('bg-white', 'dark:bg-gray-900');
    expect(whiteSection).toHaveClass('py-12', 'px-4');
  });

  // 5. Interactive Behavior Tests
  it('renders interest cards with correct structure', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(4);

    articles.forEach((article) => {
      // Each article should have an icon circle
      const iconCircle = article.querySelector('.rounded-full');
      expect(iconCircle).toBeInTheDocument();

      // Each article should have an h3 heading
      const heading = article.querySelector('h3');
      expect(heading).toBeInTheDocument();

      // Each article should have a description paragraph
      const description = article.querySelector('p');
      expect(description).toBeInTheDocument();
    });
  });

  it('renders icons and text in correct order within cards', () => {
    render(<LifeBeyondCode {...mockProps} />);

    const cookingCard = screen.getByText('Cooking').closest('article');
    expect(cookingCard).toBeInTheDocument();

    const workoutCard = screen.getByText('Workout').closest('article');
    expect(workoutCard).toBeInTheDocument();

    const musicCard = screen.getByText('Music').closest('article');
    expect(musicCard).toBeInTheDocument();

    const readingCard = screen.getByText('Reading').closest('article');
    expect(readingCard).toBeInTheDocument();
  });

  // 6. Edge Cases and Error Handling Tests
  it('renders without errors with valid props', () => {
    expect(() => render(<LifeBeyondCode {...mockProps} />)).not.toThrow();

    const { container } = render(<LifeBeyondCode {...mockProps} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('handles empty props gracefully', () => {
    const { container } = render(<LifeBeyondCode {...emptyMockProps} />);

    expect(() => render(<LifeBeyondCode {...emptyMockProps} />)).not.toThrow();

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    const emptyMessages = screen.getAllByText('No interests to display.');
    expect(emptyMessages.length).toBeGreaterThan(0);
  });

  it('handles empty strings in props', () => {
    const emptyStringProps: LifeBeyondCodeProps = {
      mainHeading: '',
      description: '',
      sectionHeading: '',
      interests: interestsData,
    };

    expect(() =>
      render(<LifeBeyondCode {...emptyStringProps} />)
    ).not.toThrow();

    const { container } = render(<LifeBeyondCode {...emptyStringProps} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    // Should still render interest cards even with empty strings
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(4);
  });

  it('handles single interest card', () => {
    const singleInterest: InterestCard[] = [
      {
        id: 'single',
        title: 'Single Interest',
        description: 'A single interest description',
        icon: FaUtensils,
      },
    ];

    const singleProps: LifeBeyondCodeProps = {
      ...mockProps,
      interests: singleInterest,
    };

    render(<LifeBeyondCode {...singleProps} />);

    expect(screen.getByText('Single Interest')).toBeInTheDocument();
    expect(
      screen.getByText('A single interest description')
    ).toBeInTheDocument();

    const { container } = render(<LifeBeyondCode {...singleProps} />);
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(1);
  });

  it('maintains proper structure with all interest cards', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(4);

    articles.forEach((article) => {
      expect(article).toHaveAttribute('aria-label');
      expect(article.querySelector('h3')).toBeInTheDocument();
      expect(article.querySelector('p')).toBeInTheDocument();
    });
  });

  it('renders correct number of headings', () => {
    render(<LifeBeyondCode {...mockProps} />);

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(6); // 1 H1 + 1 H2 + 4 H3

    const h1Headings = screen.getAllByRole('heading', { level: 1 });
    expect(h1Headings.length).toBe(1);

    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings.length).toBe(1);

    const h3Headings = screen.getAllByRole('heading', { level: 3 });
    expect(h3Headings.length).toBe(4);
  });

  it('handles all icon types correctly', () => {
    const { container } = render(<LifeBeyondCode {...mockProps} />);

    // Verify all icons render as SVG elements
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBe(5); // Heart + 4 interest icons

    // Verify each icon has proper attributes
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('renders description text correctly', () => {
    render(<LifeBeyondCode {...mockProps} />);

    const description = screen.getByText(
      "When I'm not coding, I'm exploring the world, creating music, and finding inspiration in the little things that make life beautiful."
    );
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
  });
});
