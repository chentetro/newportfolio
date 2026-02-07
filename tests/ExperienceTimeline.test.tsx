import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExperienceTimeline from '@/app/components/ExperienceTimeline';
import { ExperienceEntry } from '@/app/types/experience';

describe('ExperienceTimeline', () => {
  const mockExperiences: ExperienceEntry[] = [
    {
      slug: 'staff-engineer-ai-lead',
      role: 'Staff Engineer & AI Lead',
      company: 'Verbit.ai',
      startDate: 'Jan 2026',
      endDate: 'Present',
      content:
        '- Acts as a senior technical leader\n- Leads cross-team initiatives\n- Drives standards for performance',
    },
    {
      slug: 'frontend-tech-lead',
      role: 'Frontend Tech Lead',
      company: 'Verbit.ai',
      startDate: 'Mar 2024',
      endDate: 'Dec 2025',
      content:
        '- Led frontend development team\n- Implemented new features\n- Improved code quality',
    },
  ];

  const emptyExperiences: ExperienceEntry[] = [];

  const singleExperience: ExperienceEntry[] = [
    {
      slug: 'test-role',
      role: 'Test Role',
      company: 'Test Company',
      startDate: 'Jan 2020',
      endDate: 'Dec 2020',
      content: '- First bullet point\n- Second bullet point',
    },
  ];

  // 1. Core Functionality Tests
  it('renders all experience entries correctly', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);

    expect(screen.getByText('Staff Engineer & AI Lead')).toBeInTheDocument();
    expect(screen.getAllByText('Verbit.ai')).toHaveLength(2);
    expect(screen.getByText('Frontend Tech Lead')).toBeInTheDocument();
  });

  it('displays role, company, and dates for each entry', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);

    // First entry
    expect(screen.getByText('Staff Engineer & AI Lead')).toBeInTheDocument();
    expect(screen.getAllByText('Verbit.ai')).toHaveLength(2);
    expect(screen.getByText('Jan 2026 — Present')).toBeInTheDocument();

    // Second entry
    expect(screen.getByText('Frontend Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('Mar 2024 — Dec 2025')).toBeInTheDocument();
  });

  it('renders bullet points from markdown content', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);

    expect(
      screen.getByText(/Acts as a senior technical leader/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Leads cross-team initiatives/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Led frontend development team/)
    ).toBeInTheDocument();
  });

  it('handles "Present" endDate correctly', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);

    const presentEntry = screen.getByText('Jan 2026 — Present');
    expect(presentEntry).toBeInTheDocument();
    expect(presentEntry.tagName).toBe('TIME');
  });

  it('returns null when experiences array is empty', () => {
    const { container } = render(
      <ExperienceTimeline experiences={emptyExperiences} />
    );
    expect(container.firstChild).toBeNull();
  });

  // 2. Structural Hierarchy Tests
  it('maintains proper heading hierarchy', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2); // 2 H2 (no H1 in component)

    // Verify H2 headings for each entry
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings).toHaveLength(2);
    // Verify tag names directly to avoid timeout issues
    expect(h2Headings[0].tagName).toBe('H2');
    expect(h2Headings[1].tagName).toBe('H2');
    expect(h2Headings[0]).toHaveTextContent('Staff Engineer & AI Lead');
    expect(h2Headings[1]).toHaveTextContent('Frontend Tech Lead');
  });

  it('uses semantic HTML structure with stable selectors', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    // Verify section element
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveAttribute(
      'aria-label',
      'Professional experience timeline'
    );

    // Verify article elements
    const articleElements = container.querySelectorAll('article');
    expect(articleElements).toHaveLength(2);

    // Verify time elements
    const timeElements = container.querySelectorAll('time');
    expect(timeElements.length).toBeGreaterThanOrEqual(2);
  });

  it('renders articles with proper structure', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(2);

    articles.forEach((article) => {
      expect(article).toHaveAttribute('aria-label');
      expect(article.getAttribute('aria-label')).toContain('Experience:');
    });
  });

  // 3. Accessibility Tests
  it('meets comprehensive accessibility requirements', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    // Verify all articles have aria-labels
    const articles = container.querySelectorAll('article');
    articles.forEach((article) => {
      expect(article).toHaveAttribute('aria-label');
      const ariaLabel = article.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('Experience:');
      expect(ariaLabel).toContain('at');
    });

    // Verify section has aria-label
    const section = container.querySelector('section');
    expect(section).toHaveAttribute(
      'aria-label',
      'Professional experience timeline'
    );
  });

  it('marks decorative bullets with aria-hidden', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    const bullets = container.querySelectorAll('.rounded-full');
    bullets.forEach((bullet) => {
      expect(bullet).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('renders vertical timeline line', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    const timelineLine = container.querySelector('.bg-gray-300');
    expect(timelineLine).toBeInTheDocument();
    expect(timelineLine).toHaveClass('dark:bg-gray-600');
    expect(timelineLine).toHaveAttribute('aria-hidden', 'true');
  });

  it('provides proper dateTime attributes on time elements', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);

    const timeElements = screen.getAllByText(/Jan 2026|Mar 2024/);
    timeElements.forEach((timeElement) => {
      if (timeElement.tagName === 'TIME') {
        expect(timeElement).toHaveAttribute('dateTime');
        const dateTime = timeElement.getAttribute('dateTime');
        expect(dateTime).toBeTruthy();
      }
    });
  });

  it('uses semantic HTML elements correctly', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    // Verify semantic structure
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelectorAll('article').length).toBe(2);
    expect(container.querySelectorAll('time').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll('ul').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll('li').length).toBeGreaterThanOrEqual(4);
  });

  // 4. Styling and Layout Tests
  it('applies correct styling classes to section', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('p-6', 'lg:p-8');
  });

  it('applies correct styling classes to timeline cards', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    const cards = container.querySelectorAll('.bg-gray-50');
    expect(cards.length).toBeGreaterThanOrEqual(2);

    cards.forEach((card) => {
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('p-6', 'lg:p-8');
    });
  });

  it('applies correct styling classes to circular bullets', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    const bullets = container.querySelectorAll('.rounded-full');
    expect(bullets.length).toBeGreaterThanOrEqual(2);

    bullets.forEach((bullet) => {
      expect(bullet).toHaveClass('w-3', 'h-3');
      expect(bullet).toHaveClass('bg-gray-400', 'dark:bg-gray-500');
      expect(bullet).toHaveClass('border-2');
    });
  });

  it('applies correct styling to vertical timeline line', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    const timelineLine = container.querySelector('.bg-gray-300');
    expect(timelineLine).toBeInTheDocument();
    expect(timelineLine).toHaveClass('bg-gray-300', 'dark:bg-gray-600');
    expect(timelineLine).toHaveClass('w-px');
  });

  it('applies correct padding to articles for timeline spacing', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    const articles = container.querySelectorAll('article');
    articles.forEach((article) => {
      expect(article).toHaveClass('pl-8');
      expect(article).toHaveClass('relative');
    });
  });

  it('applies correct monochrome color classes', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    // Verify H2 headings use gray colors
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    h2Headings.forEach((h2) => {
      expect(h2).toHaveClass('text-gray-900', 'dark:text-gray-100');
    });

    // Verify cards use gray background
    const cards = container.querySelectorAll('.bg-gray-50');
    cards.forEach((card) => {
      expect(card).toHaveClass('bg-gray-50', 'dark:bg-gray-900');
      expect(card).toHaveClass('border-gray-200', 'dark:border-gray-700');
    });
  });

  // 5. Interactive Behavior Tests
  it('renders entries in correct order', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);

    // First entry should be "Present" (most recent)
    expect(articles[0]).toHaveAttribute(
      'aria-label',
      'Experience: Staff Engineer & AI Lead at Verbit.ai'
    );
    // Second entry should be older
    expect(articles[1]).toHaveAttribute(
      'aria-label',
      'Experience: Frontend Tech Lead at Verbit.ai'
    );
  });

  it('handles single experience entry correctly', () => {
    render(<ExperienceTimeline experiences={singleExperience} />);

    expect(screen.getByText('Test Role')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Jan 2020 — Dec 2020')).toBeInTheDocument();
  });

  // 6. Edge Cases and Error Handling
  it('handles empty experiences array gracefully', () => {
    const { container } = render(
      <ExperienceTimeline experiences={emptyExperiences} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('handles missing content gracefully', () => {
    const experiencesWithoutContent: ExperienceEntry[] = [
      {
        slug: 'test',
        role: 'Test Role',
        company: 'Test Company',
        startDate: 'Jan 2020',
        endDate: 'Dec 2020',
        content: '',
      },
    ];

    expect(() =>
      render(<ExperienceTimeline experiences={experiencesWithoutContent} />)
    ).not.toThrow();

    expect(screen.getByText('Test Role')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('handles experience with only one bullet point', () => {
    const singleBullet: ExperienceEntry[] = [
      {
        slug: 'test',
        role: 'Test Role',
        company: 'Test Company',
        startDate: 'Jan 2020',
        endDate: 'Dec 2020',
        content: '- Single bullet point',
      },
    ];

    render(<ExperienceTimeline experiences={singleBullet} />);

    expect(screen.getByText('Single bullet point')).toBeInTheDocument();
  });

  it('parses markdown bullet points correctly', () => {
    const markdownContent: ExperienceEntry[] = [
      {
        slug: 'test',
        role: 'Test Role',
        company: 'Test Company',
        startDate: 'Jan 2020',
        endDate: 'Dec 2020',
        content: '- First point\n- Second point\n- Third point',
      },
    ];

    render(<ExperienceTimeline experiences={markdownContent} />);

    expect(screen.getByText('First point')).toBeInTheDocument();
    expect(screen.getByText('Second point')).toBeInTheDocument();
    expect(screen.getByText('Third point')).toBeInTheDocument();
  });

  it('handles whitespace in markdown content', () => {
    const whitespaceContent: ExperienceEntry[] = [
      {
        slug: 'test',
        role: 'Test Role',
        company: 'Test Company',
        startDate: 'Jan 2020',
        endDate: 'Dec 2020',
        content: '  - First point  \n\n  - Second point  \n  ',
      },
    ];

    render(<ExperienceTimeline experiences={whitespaceContent} />);

    expect(screen.getByText('First point')).toBeInTheDocument();
    expect(screen.getByText('Second point')).toBeInTheDocument();
  });

  it('renders without errors with valid props', () => {
    expect(() =>
      render(<ExperienceTimeline experiences={mockExperiences} />)
    ).not.toThrow();

    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('maintains proper structure with multiple entries', () => {
    const { container } = render(
      <ExperienceTimeline experiences={mockExperiences} />
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(2);

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2); // 2 H2 (no H1 in component)
  });
});
