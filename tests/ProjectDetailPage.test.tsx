import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import ProjectDetailPage from '@/app/projects/[slug]/page';
import { projects } from '@/content/projects';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('Project Detail Page', () => {
  const validSlug = projects[0].slug;
  const invalidSlug = 'non-existent-project';

  // Helper to create mock params
  const createMockParams = (slug: string) => Promise.resolve({ slug });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 1. Core Rendering & Landmarks
  it('renders the project title and main content for valid slug', async () => {
    const params = createMockParams(validSlug);
    const { container } = render(await ProjectDetailPage({ params }));

    const project = projects.find((p) => p.slug === validSlug);
    expect(project).toBeDefined();

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      project!.title
    );
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('renders project description', async () => {
    const params = createMockParams(validSlug);
    render(await ProjectDetailPage({ params }));

    const project = projects.find((p) => p.slug === validSlug);
    expect(screen.getByText(project!.description)).toBeInTheDocument();
  });

  it('renders project image with correct alt text', async () => {
    const params = createMockParams(validSlug);
    const { container } = render(await ProjectDetailPage({ params }));

    const project = projects.find((p) => p.slug === validSlug);
    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', project!.imageAlt);
  });

  // 2. Structural Hierarchy Tests
  it('maintains proper heading hierarchy', async () => {
    const params = createMockParams(validSlug);
    render(await ProjectDetailPage({ params }));

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);

    // Exactly one h1 (project title)
    const h1Headings = headings.filter((h) => h.tagName === 'H1');
    expect(h1Headings).toHaveLength(1);

    // All section headings should be h2
    const h2Headings = headings.filter((h) => h.tagName === 'H2');
    expect(h2Headings.length).toBeGreaterThan(0);

    // Verify heading order: h1 → h2 → h3 (no skipping, no going backwards)
    const headingLevels = headings.map((h) => parseInt(h.tagName.charAt(1)));
    for (let i = 1; i < headingLevels.length; i++) {
      // Each heading should be >= previous (can stay same or increase)
      // And difference should be <= 1 (no skipping levels)
      expect(headingLevels[i]).toBeGreaterThanOrEqual(headingLevels[i - 1]);
      expect(headingLevels[i] - headingLevels[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  // 3. Semantic Structure with Stable Selectors
  it('uses semantic HTML structure with stable selectors', async () => {
    const params = createMockParams(validSlug);
    const { container } = render(await ProjectDetailPage({ params }));

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();

    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  // 4. Accessibility Tests
  it('meets accessibility requirements for interactive elements and icons', async () => {
    const params = createMockParams(validSlug);
    const { container } = render(await ProjectDetailPage({ params }));

    // All links should have accessible names
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

  it('provides adequate touch targets for interactive elements', async () => {
    const params = createMockParams(validSlug);
    const { container } = render(await ProjectDetailPage({ params }));

    const interactiveElements = container.querySelectorAll('a, button');
    expect(interactiveElements.length).toBeGreaterThan(0);

    interactiveElements.forEach((element) => {
      const hasMinHeight = element.classList.contains('min-h-[44px]');
      const hasMinWidth = element.classList.contains('min-w-[44px]');

      // At least one dimension should meet the 44px minimum via class
      // Or verify element exists and is interactive
      expect(element).toBeInTheDocument();
      expect(hasMinHeight || hasMinWidth).toBe(true);
    });
  });

  // 5. Links & Navigation Tests (Direct Verification)
  it('renders GitHub link with correct attributes', async () => {
    const params = createMockParams(validSlug);
    render(await ProjectDetailPage({ params }));

    const project = projects.find((p) => p.slug === validSlug);
    const githubLink = screen.getByRole('link', {
      name: /View.*repository on GitHub/i,
    });

    expect(githubLink).toHaveAttribute('href', project!.githubUrl);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveAttribute('aria-label');
  });

  // 6. Content Rendering Tests
  it('renders all technologies and languages as badges', async () => {
    const params = createMockParams(validSlug);
    render(await ProjectDetailPage({ params }));

    const project = projects.find((p) => p.slug === validSlug);

    if (project!.technologies.length > 0) {
      project!.technologies.forEach((tech) => {
        // Use getAllByText since items may appear in both technologies and languages
        const elements = screen.getAllByText(tech);
        expect(elements.length).toBeGreaterThan(0);
        expect(elements[0]).toBeInTheDocument();
      });
    }

    if (project!.languages.length > 0) {
      project!.languages.forEach((lang) => {
        // Use getAllByText since items may appear in both technologies and languages
        const elements = screen.getAllByText(lang);
        expect(elements.length).toBeGreaterThan(0);
        expect(elements[0]).toBeInTheDocument();
      });
    }
  });

  it('renders section headings correctly', async () => {
    const params = createMockParams(validSlug);
    render(await ProjectDetailPage({ params }));

    expect(
      screen.getByRole('heading', { name: /About this project/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Stack & languages/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Repository/i })
    ).toBeInTheDocument();
    // Repository is H3 (subsection under Stack & languages section)
    const repositoryHeading = screen.getByRole('heading', {
      name: /Repository/i,
    });
    expect(repositoryHeading.tagName).toBe('H3');
  });

  // 7. Edge Cases and Error Handling
  it('calls notFound() for invalid slug', async () => {
    const params = createMockParams(invalidSlug);

    // Clear any previous calls
    vi.clearAllMocks();

    try {
      await ProjectDetailPage({ params });
    } catch {
      // notFound() throws in Next.js, so we expect an error
    }

    // Verify notFound was called
    expect(notFound).toHaveBeenCalled();
  });

  it('handles project with empty technologies array gracefully', async () => {
    const params = createMockParams(validSlug);
    const { container } = render(await ProjectDetailPage({ params }));

    const project = projects.find((p) => p.slug === validSlug);

    // Page should still render main structure
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    // Verify conditional rendering: Technologies section only renders if array has items
    if (project!.technologies.length === 0) {
      // When empty, Technologies heading should not be present
      const technologiesHeading = Array.from(
        container.querySelectorAll('h3')
      ).find((h) => h.textContent?.includes('Technologies'));
      expect(technologiesHeading).toBeUndefined();
    } else {
      // When technologies exist, verify the section renders with heading and items
      expect(
        screen.getByRole('heading', { level: 3, name: /^Technologies$/i })
      ).toBeInTheDocument();
      // Verify at least one technology badge is rendered
      // Use getAllByText since items may appear in both technologies and languages
      project!.technologies.forEach((tech) => {
        const elements = screen.getAllByText(tech);
        expect(elements.length).toBeGreaterThan(0);
        expect(elements[0]).toBeInTheDocument();
      });
    }
  });

  it('handles project with empty languages array gracefully', async () => {
    const params = createMockParams(validSlug);
    const { container } = render(await ProjectDetailPage({ params }));

    const project = projects.find((p) => p.slug === validSlug);

    // Page should still render main structure
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    // Verify conditional rendering: Languages section only renders if array has items
    if (project!.languages.length === 0) {
      // When empty, Languages heading should not be present
      const languagesHeading = Array.from(
        container.querySelectorAll('h3')
      ).find((h) => h.textContent?.includes('Languages'));
      expect(languagesHeading).toBeUndefined();
    } else {
      // When languages exist, verify the section renders with heading and items
      expect(
        screen.getByRole('heading', { level: 3, name: /^Languages$/i })
      ).toBeInTheDocument();
      // Verify at least one language badge is rendered
      // Use getAllByText since items may appear in both technologies and languages
      project!.languages.forEach((lang) => {
        const elements = screen.getAllByText(lang);
        expect(elements.length).toBeGreaterThan(0);
        expect(elements[0]).toBeInTheDocument();
      });
    }
  });

  it('renders without throwing errors for valid slug', async () => {
    const params = createMockParams(validSlug);
    const { container } = render(await ProjectDetailPage({ params }));
    // If render succeeds, no error was thrown
    expect(container).toBeInTheDocument();
  });

  // 8. Styling Tests
  it('applies correct monochrome styling classes', async () => {
    const params = createMockParams(validSlug);
    render(await ProjectDetailPage({ params }));

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveClass('text-gray-900');
    expect(h1).toHaveClass('dark:text-gray-100');

    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    h2Headings.forEach((h2) => {
      expect(h2).toHaveClass('text-gray-900');
      expect(h2).toHaveClass('dark:text-gray-100');
    });
  });

  it('applies expected layout constraints', async () => {
    const params = createMockParams(validSlug);
    const { container } = render(await ProjectDetailPage({ params }));

    const article = container.querySelector('article');
    expect(article).toHaveClass('overflow-x-hidden');
  });
});
