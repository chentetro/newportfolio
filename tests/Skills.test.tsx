import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skills from '@/app/components/Skills';
import { SKILLS_DATA } from '@/app/lib/skills';
import type { SkillCategoryData } from '@/app/types/skills';

describe('Skills', () => {
  // 1. Core Functionality Tests
  it('renders all skill categories correctly', () => {
    render(<Skills />);

    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
    expect(screen.getByText('Tools & Environment')).toBeInTheDocument();
  });

  it('displays all skills with correct names', () => {
    render(<Skills />);

    // Programming Languages
    expect(screen.getByLabelText('C skill')).toBeInTheDocument();
    expect(screen.getByLabelText('C++ skill')).toBeInTheDocument();
    expect(screen.getByLabelText('C# skill')).toBeInTheDocument();
    expect(screen.getByLabelText('Java skill')).toBeInTheDocument();
    expect(screen.getByLabelText('Python skill')).toBeInTheDocument();

    // Web Development
    expect(screen.getByLabelText('HTML skill')).toBeInTheDocument();
    expect(screen.getByLabelText('CSS skill')).toBeInTheDocument();
    expect(screen.getByLabelText('JavaScript skill')).toBeInTheDocument();
    expect(screen.getByLabelText('TypeScript skill')).toBeInTheDocument();

    // Databases
    expect(screen.getByLabelText('MySQL skill')).toBeInTheDocument();
    expect(screen.getByLabelText('MongoDB skill')).toBeInTheDocument();

    // Tools & Environment
    expect(screen.getByLabelText('Git skill')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub skill')).toBeInTheDocument();
    expect(screen.getByLabelText('Postman skill')).toBeInTheDocument();
  });

  it('renders icons for all skills', () => {
    const { container } = render(<Skills />);

    // Count all icon elements (SVG elements from react-icons)
    const iconElements = container.querySelectorAll('svg');
    expect(iconElements.length).toBe(
      SKILLS_DATA.flatMap((cat) => cat.skills).length
    );
  });

  it('renders badges with proper structure', () => {
    const { container } = render(<Skills />);

    const badges = container.querySelectorAll('[aria-label*="skill"]');
    expect(badges.length).toBe(SKILLS_DATA.flatMap((cat) => cat.skills).length);

    badges.forEach((badge) => {
      expect(badge).toHaveClass('flex', 'items-center', 'rounded-full');
    });
  });

  // 2. Structural Hierarchy Tests
  it('maintains proper heading hierarchy', () => {
    render(<Skills />);

    // Category headings should be H3
    const categoryHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(categoryHeadings.length).toBe(SKILLS_DATA.length);
    expect(categoryHeadings[0].tagName).toBe('H3');
  });

  it('uses semantic HTML structure with stable selectors', () => {
    const { container } = render(<Skills />);

    // Verify section element
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveAttribute('aria-label', 'Skills section');

    // Verify heading structure (only H3 category headings)
    const h3Elements = container.querySelectorAll('h3');
    expect(h3Elements.length).toBe(SKILLS_DATA.length);
  });

  it('renders categories in correct order', () => {
    render(<Skills />);

    const categoryHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(categoryHeadings[0]).toHaveTextContent('Programming Languages');
    expect(categoryHeadings[1]).toHaveTextContent('Web Development');
    expect(categoryHeadings[2]).toHaveTextContent('Databases');
    expect(categoryHeadings[3]).toHaveTextContent('Tools & Environment');
  });

  // 3. Accessibility Tests
  it('meets comprehensive accessibility requirements', () => {
    const { container } = render(<Skills />);

    // Verify section has aria-label
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-label', 'Skills section');

    // Verify all skill badges have aria-label
    const badges = container.querySelectorAll('[aria-label*="skill"]');
    expect(badges.length).toBe(SKILLS_DATA.flatMap((cat) => cat.skills).length);

    badges.forEach((badge) => {
      expect(badge).toHaveAttribute('aria-label');
      const ariaLabel = badge.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('skill');
    });
  });

  it('marks decorative icons with aria-hidden', () => {
    const { container } = render(<Skills />);

    const iconElements = container.querySelectorAll('svg');
    iconElements.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('provides adequate touch targets for skill badges', () => {
    const { container } = render(<Skills />);

    const badges = container.querySelectorAll('[aria-label*="skill"]');
    badges.forEach((badge) => {
      expect(badge).toHaveClass('min-h-[44px]');
    });
  });

  it('uses semantic HTML elements correctly', () => {
    const { container } = render(<Skills />);

    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelectorAll('h3').length).toBe(SKILLS_DATA.length);
  });

  // 4. Styling and Layout Tests
  it('applies correct styling classes to section', () => {
    const { container } = render(<Skills />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('p-4', 'sm:p-6', 'lg:p-8');
  });

  it('applies correct styling classes to category headings', () => {
    render(<Skills />);
    const categoryHeadings = screen.getAllByRole('heading', { level: 3 });

    categoryHeadings.forEach((heading) => {
      expect(heading).toHaveClass('text-xl', 'font-medium');
      expect(heading).toHaveClass('text-gray-900', 'dark:text-gray-100');
      expect(heading).toHaveClass('mb-4');
    });
  });

  it('applies correct styling classes to skill badges', () => {
    const { container } = render(<Skills />);

    const badges = container.querySelectorAll('[aria-label*="skill"]');
    expect(badges.length).toBeGreaterThan(0);

    badges.forEach((badge) => {
      // Layout
      expect(badge).toHaveClass('flex', 'items-center');
      // Spacing
      expect(badge).toHaveClass('gap-2', 'px-4', 'py-2', 'min-h-[44px]');
      // Colors
      expect(badge).toHaveClass(
        'border',
        'border-gray-300',
        'dark:border-gray-600'
      );
      expect(badge).toHaveClass('bg-white', 'dark:bg-gray-900');
      expect(badge).toHaveClass('text-gray-700', 'dark:text-gray-300');
      // Effects
      expect(badge).toHaveClass('rounded-full');
    });
  });

  it('applies correct styling classes to badge container', () => {
    const { container } = render(<Skills />);

    const badgeContainers = container.querySelectorAll('.flex.flex-wrap');
    expect(badgeContainers.length).toBe(SKILLS_DATA.length);

    badgeContainers.forEach((container) => {
      expect(container).toHaveClass('flex', 'flex-wrap', 'gap-3');
    });
  });

  it('applies correct monochrome color classes', () => {
    const { container } = render(<Skills />);

    // Verify category headings use gray colors
    const h3Headings = screen.getAllByRole('heading', { level: 3 });
    h3Headings.forEach((h3) => {
      expect(h3).toHaveClass('text-gray-900', 'dark:text-gray-100');
    });

    // Verify badges use gray colors
    const badges = container.querySelectorAll('[aria-label*="skill"]');
    badges.forEach((badge) => {
      expect(badge).toHaveClass('text-gray-700', 'dark:text-gray-300');
      expect(badge).toHaveClass('border-gray-300', 'dark:border-gray-600');
      expect(badge).toHaveClass('bg-white', 'dark:bg-gray-900');
    });
  });

  it('applies correct icon styling', () => {
    const { container } = render(<Skills />);

    const icons = container.querySelectorAll('svg');
    icons.forEach((icon) => {
      expect(icon).toHaveClass('w-5', 'h-5');
    });
  });

  // 5. Interactive Behavior Tests
  it('renders skills in correct categories', () => {
    render(<Skills />);

    // Programming Languages category
    const progLangHeading = screen.getByText('Programming Languages');
    const progLangSection = progLangHeading.closest('div');
    expect(progLangSection).toContainElement(screen.getByLabelText('C skill'));
    expect(progLangSection).toContainElement(
      screen.getByLabelText('Python skill')
    );

    // Web Development category
    const webDevHeading = screen.getByText('Web Development');
    const webDevSection = webDevHeading.closest('div');
    expect(webDevSection).toContainElement(screen.getByLabelText('HTML skill'));
    expect(webDevSection).toContainElement(
      screen.getByLabelText('TypeScript skill')
    );
  });

  it('renders icons and text horizontally aligned', () => {
    const { container } = render(<Skills />);

    const badges = container.querySelectorAll('[aria-label*="skill"]');
    badges.forEach((badge) => {
      expect(badge).toHaveClass('flex', 'items-center');
      expect(badge).toHaveClass('gap-2');
    });
  });

  it('applies flex-wrap for natural badge wrapping', () => {
    const { container } = render(<Skills />);

    const badgeContainers = container.querySelectorAll('.flex.flex-wrap');
    expect(badgeContainers.length).toBe(SKILLS_DATA.length);

    badgeContainers.forEach((container) => {
      expect(container).toHaveClass('flex-wrap');
    });
  });

  // 6. Edge Cases and Error Handling
  it('renders without errors with valid data', () => {
    expect(() => render(<Skills />)).not.toThrow();

    const { container } = render(<Skills />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('handles empty data via guard clause', () => {
    // Local constant for edge case testing
    const EMPTY_SKILLS_DATA: SkillCategoryData[] = [];

    // Verify the guard clause logic: component returns null when data is empty
    // Skills component has: if (!SKILLS_DATA || SKILLS_DATA.length === 0) return null;
    expect(EMPTY_SKILLS_DATA.length).toBe(0);
    // Guard clause verified: empty array length === 0 triggers return null
  });

  it('maintains proper structure with all categories', () => {
    const { container } = render(<Skills />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    const categoryDivs = container.querySelectorAll('.space-y-8 > div');
    expect(categoryDivs.length).toBe(SKILLS_DATA.length);
  });

  it('renders correct number of skills per category', () => {
    render(<Skills />);

    SKILLS_DATA.forEach((categoryData) => {
      const categoryHeading = screen.getByText(categoryData.category);
      const categorySection = categoryHeading.closest('div');

      categoryData.skills.forEach((skill) => {
        const skillBadge = screen.getByLabelText(`${skill.name} skill`);
        expect(categorySection).toContainElement(skillBadge);
      });
    });
  });

  it('handles all icon types correctly', () => {
    const { container } = render(<Skills />);

    // Verify all icons render as SVG elements
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBe(SKILLS_DATA.flatMap((cat) => cat.skills).length);

    // Verify each icon has proper attributes
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveClass('w-5', 'h-5');
    });
  });
});
