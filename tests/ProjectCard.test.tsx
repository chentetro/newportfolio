import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectCard from '@/app/components/ProjectCard';
import type { Project } from '@/app/types/project';

describe('ProjectCard', () => {
  const baseProject: Project = {
    slug: 'test-project',
    title: 'Test Project',
    shortDescription: 'A short description of the test project.',
    description: 'A longer description of the test project.',
    technologies: ['Next.js', 'TypeScript'],
    languages: ['TypeScript'],
    githubUrl: 'https://github.com/example/test-project',
    imageSrc: '/images/test-project.png',
    imageAlt: 'Screenshot of the test project',
  };

  const emptyStacksProject: Project = {
    ...baseProject,
    technologies: [],
    languages: [],
  };

  // 1. Core Functionality Tests
  it('renders project title, description, and image with correct link', () => {
    const { container } = render(<ProjectCard project={baseProject} />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(baseProject.title);

    expect(screen.getByText(baseProject.shortDescription)).toBeInTheDocument();

    const link = screen.getByRole('link', {
      name: `View project: ${baseProject.title}`,
    });
    expect(link).toHaveAttribute('href', `/projects/${baseProject.slug}`);

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', baseProject.imageAlt);
  });

  // 2. Structural Hierarchy & Semantic Structure
  it('uses article as the semantic root and H2 for the title', () => {
    const { container } = render(<ProjectCard project={baseProject} />);

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveAttribute(
      'aria-label',
      `Project: ${baseProject.title}`
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveProperty('tagName', 'H2');
    expect(heading).toHaveTextContent(baseProject.title);
  });

  it('uses stable selectors for semantic structure', () => {
    const { container } = render(<ProjectCard project={baseProject} />);

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();

    const titleHeading = container.querySelector('h2');
    expect(titleHeading).toBeInTheDocument();

    const descriptionParagraph = container.querySelector(
      'div.flex.flex-col.gap-2.p-4 > p'
    );
    expect(descriptionParagraph).toBeInTheDocument();
  });

  // 3. Accessibility Tests
  it('meets accessibility requirements for link and alt text', () => {
    const { container } = render(<ProjectCard project={baseProject} />);

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveAttribute(
      'aria-label',
      `Project: ${baseProject.title}`
    );

    const link = screen.getByRole('link', {
      name: `View project: ${baseProject.title}`,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/projects/${baseProject.slug}`);

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', baseProject.imageAlt);
  });

  it('provides explicit touch targets for the interactive link', () => {
    const { container } = render(<ProjectCard project={baseProject} />);

    const article = container.querySelector('article');
    const link = container.querySelector('a');

    expect(article).toHaveClass('min-h-[44px]');
    expect(link).toHaveClass('min-h-[44px]');
  });

  // 4. Styling and Layout Tests
  it('applies correct monochrome styling and layout classes', () => {
    const { container } = render(<ProjectCard project={baseProject} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('bg-white');
    expect(article).toHaveClass('dark:bg-gray-900');
    expect(article).toHaveClass('border');
    expect(article).toHaveClass('border-gray-200');
    expect(article).toHaveClass('dark:border-gray-700');
    expect(article).toHaveClass('rounded-lg');
    expect(article).toHaveClass('shadow-sm');
    expect(article).toHaveClass('hover:shadow-md');
    expect(article).toHaveClass('transition-shadow');
    expect(article).toHaveClass('duration-200');

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-lg');
    expect(heading).toHaveClass('font-semibold');
    expect(heading).toHaveClass('text-gray-900');
    expect(heading).toHaveClass('dark:text-gray-100');

    const paragraph = screen.getByText(baseProject.shortDescription);
    expect(paragraph).toHaveClass('text-sm');
    expect(paragraph).toHaveClass('text-gray-600');
    expect(paragraph).toHaveClass('dark:text-gray-400');
  });

  it('includes overlay container with expected classes for hover/focus behavior', () => {
    const { container } = render(<ProjectCard project={baseProject} />);

    const overlay = container.querySelector('div.absolute.inset-0');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('bg-black/60');
    expect(overlay).toHaveClass('opacity-0');
    expect(overlay).toHaveClass('group-hover:opacity-100');
    expect(overlay).toHaveClass('group-focus-within:opacity-100');
    expect(overlay).toHaveClass('transition-opacity');
    expect(overlay).toHaveClass('duration-200');
  });

  // 5. Edge Cases and Error Handling
  it('handles empty technologies and languages arrays gracefully', () => {
    render(<ProjectCard project={emptyStacksProject} />);

    // When arrays are empty, labels should not be rendered
    expect(screen.queryByText('Stack')).not.toBeInTheDocument();
    expect(screen.queryByText('Languages')).not.toBeInTheDocument();
  });

  it('renders without throwing for minimal valid project data', () => {
    const minimalProject: Project = {
      slug: 'minimal-project',
      title: 'Minimal Project',
      shortDescription: 'Minimal description',
      description: '',
      technologies: [],
      languages: [],
      githubUrl: 'https://github.com/example/minimal-project',
      imageSrc: '/images/minimal-project.png',
      imageAlt: 'Minimal project image',
    };

    expect(() =>
      render(<ProjectCard project={minimalProject} />)
    ).not.toThrow();
  });
});
