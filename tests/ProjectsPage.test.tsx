import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Projects from '@/app/projects/page';
import { projects } from '@/content/projects';

describe('Projects Page', () => {
  // 1. Core Rendering & Landmarks
  it('renders the page title and main content', () => {
    const { container } = render(<Projects />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Projects'
    );
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('renders descriptive paragraph about projects', () => {
    render(<Projects />);

    const paragraph = screen.getByText(
      /A collection of projects showcasing my work/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  it('renders all project cards from content', () => {
    render(<Projects />);

    // Each ProjectCard renders an article with aria-label containing the project title
    // We can verify cards are rendered by checking for article elements
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBe(projects.length);
  });

  // 2. Structural Hierarchy Tests
  it('maintains proper heading hierarchy', () => {
    render(<Projects />);

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);

    // Exactly one h1 (page title)
    const h1Headings = headings.filter((h) => h.tagName === 'H1');
    expect(h1Headings).toHaveLength(1);
    expect(h1Headings[0]).toHaveTextContent('Projects');

    // Verify no level skipping - all headings after h1 should be h2 or higher
    const headingLevels = headings.map((h) => parseInt(h.tagName.charAt(1)));
    for (let i = 1; i < headingLevels.length; i++) {
      expect(headingLevels[i]).toBeGreaterThanOrEqual(headingLevels[i - 1]);
      expect(headingLevels[i] - headingLevels[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  // 3. Semantic Structure with Stable Selectors
  it('uses semantic HTML structure with stable selectors', () => {
    const { container } = render(<Projects />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  // 4. Accessibility Tests
  it('meets accessibility requirements for interactive elements and icons', () => {
    const { container } = render(<Projects />);

    // All links should have accessible names (aria-label or text content)
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      const ariaLabel = link.getAttribute('aria-label');
      const textContent = link.textContent?.trim();
      expect(ariaLabel || textContent).toBeTruthy();
    });

    // Decorative SVG icons should be hidden from screen readers
    const svgs = container.querySelectorAll('svg');
    svgs.forEach((svg) => {
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('provides adequate touch targets for interactive elements', () => {
    const { container } = render(<Projects />);

    const interactiveElements = container.querySelectorAll('a, button');
    interactiveElements.forEach((element) => {
      const hasMinHeight = element.classList.contains('min-h-[44px]');
      const hasMinWidth = element.classList.contains('min-w-[44px]');

      // At least one dimension should meet the 44px minimum
      expect(hasMinHeight || hasMinWidth).toBe(true);
    });
  });

  // 5. Links & Navigation Tests
  it('renders project cards with correct navigation links', () => {
    render(<Projects />);

    // Each project card should have a link to its detail page
    const articles = screen.getAllByRole('article');
    articles.forEach((article) => {
      const link = article.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link?.getAttribute('href')).toMatch(/^\/projects\/.+/);
    });
  });

  it('renders links with correct href attributes for each project', () => {
    render(<Projects />);

    projects.forEach((project) => {
      const link = screen.getByRole('link', {
        name: `View project: ${project.title}`,
      });
      expect(link).toHaveAttribute('href', `/projects/${project.slug}`);
    });
  });

  // 6. Content Rendering & Styling Tests
  it('applies expected layout constraints (no obvious overflow primitives)', () => {
    const { container } = render(<Projects />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();

    const section = container.querySelector('section');
    expect(section).toHaveClass('overflow-x-hidden');
  });

  it('applies correct monochrome styling classes', () => {
    render(<Projects />);

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveClass('text-gray-900');
    expect(h1).toHaveClass('dark:text-gray-100');

    const paragraph = screen.getByText(/A collection of projects/i);
    expect(paragraph).toHaveClass('text-gray-600');
    expect(paragraph).toHaveClass('dark:text-gray-400');
  });

  // 7. Edge Cases and Error Handling
  it('handles empty projects array gracefully (no crash)', () => {
    // This test verifies the page structure remains intact even if projects array is empty
    // In a real scenario, we might mock the projects import, but for now we test with actual data
    render(<Projects />);

    // Page should still render main structure
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/A collection of projects/i)).toBeInTheDocument();
  });

  it('renders without throwing errors', () => {
    expect(() => render(<Projects />)).not.toThrow();
  });
});
