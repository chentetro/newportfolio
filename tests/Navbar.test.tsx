import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '@/app/components/Navbar';

describe('Navbar', () => {
  // 1. Core Functionality Tests
  it('renders all four navigation links', () => {
    render(<Navbar />);

    // Check logo link
    expect(
      screen.getByLabelText('Navigate to home page - Chen portfolio')
    ).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByLabelText('Navigate to home page')).toBeInTheDocument();
    expect(screen.getByLabelText('Navigate to about page')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Navigate to projects page')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Navigate to life page')).toBeInTheDocument();
  });

  it('displays correct text content for each navigation link', () => {
    render(<Navbar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Life')).toBeInTheDocument();
  });

  it('renders links with correct href attributes', () => {
    render(<Navbar />);

    // Logo link
    const logoLink = screen.getByLabelText(
      'Navigate to home page - Chen portfolio'
    );
    expect(logoLink).toHaveAttribute('href', '/');

    // Home nav link
    const homeLink = screen.getByLabelText('Navigate to home page');
    expect(homeLink).toHaveAttribute('href', '/');

    const aboutLink = screen.getByLabelText('Navigate to about page');
    expect(aboutLink).toHaveAttribute('href', '/about');

    const projectsLink = screen.getByLabelText('Navigate to projects page');
    expect(projectsLink).toHaveAttribute('href', '/projects');

    const lifeLink = screen.getByLabelText('Navigate to life page');
    expect(lifeLink).toHaveAttribute('href', '/life');
  });

  // 2. Structural Hierarchy Tests
  it('uses semantic HTML structure with stable selectors', () => {
    const { container } = render(<Navbar />);

    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveAttribute('role', 'navigation');
    expect(navElement).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('maintains proper link element hierarchy', () => {
    render(<Navbar />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5); // Logo link + 4 nav links

    // Verify logo link
    const logoLink = screen.getByLabelText(
      'Navigate to home page - Chen portfolio'
    );
    expect(logoLink).toBeInTheDocument();
    expect(logoLink.tagName).toBe('A');

    // Verify nav links - query individually to avoid timeout issues
    const homeLink = screen.getByLabelText('Navigate to home page');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.tagName).toBe('A');

    const aboutLink = screen.getByLabelText('Navigate to about page');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.tagName).toBe('A');

    const projectsLink = screen.getByLabelText('Navigate to projects page');
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink.tagName).toBe('A');

    const lifeLink = screen.getByLabelText('Navigate to life page');
    expect(lifeLink).toBeInTheDocument();
    expect(lifeLink.tagName).toBe('A');
  });

  it('renders with proper container structure', () => {
    const { container } = render(<Navbar />);

    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();

    const innerContainer = container.querySelector('.max-w-7xl.mx-auto');
    expect(innerContainer).toBeInTheDocument();

    const flexContainer = container.querySelector('.flex.flex-col');
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveClass('sm:justify-between');
  });

  it('renders logo/brand section with text', () => {
    const { container } = render(<Navbar />);

    const logoLink = screen.getByLabelText(
      'Navigate to home page - Chen portfolio'
    );
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveTextContent('Chen');

    // Check for the text span element with proper styling
    const logoText = container.querySelector('span.font-bold');
    expect(logoText).toBeInTheDocument();
    expect(logoText).toHaveTextContent('Chen');
    expect(logoText).toHaveClass('text-gray-900', 'dark:text-gray-100');
    expect(logoText).toHaveClass('text-xl', 'uppercase', 'tracking-tight');
  });

  // 3. Accessibility Tests
  it('meets comprehensive accessibility requirements', () => {
    render(<Navbar />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5); // Logo link + 4 nav links

    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
      expect(link.getAttribute('aria-label')).toBeTruthy();
      expect(link.getAttribute('aria-label')).not.toBe('');
    });
  });

  it('provides adequate touch targets for all navigation links', () => {
    const { container } = render(<Navbar />);

    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(5); // Logo link + 4 nav links

    links.forEach((link) => {
      expect(link).toHaveClass('min-h-[44px]');
    });
  });

  it('ensures proper focus and keyboard accessibility', () => {
    const { container } = render(<Navbar />);

    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      expect(link).not.toHaveAttribute('tabindex', '-1');
      expect(link.getAttribute('href')).toBeTruthy();
      expect(link).toHaveClass('focus:ring-2');
      expect(link).toHaveClass('focus:outline-none');
    });
  });

  it('provides adequate semantic structure for screen readers', () => {
    const { container } = render(<Navbar />);

    const navElement = container.querySelector('nav[role="navigation"]');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveAttribute('aria-label', 'Main navigation');

    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
    });
  });

  // 4. Styling and Layout Tests
  it('applies correct styling classes to navigation container', () => {
    const { container } = render(<Navbar />);

    const navElement = container.querySelector('nav');
    expect(navElement).toHaveClass('w-full');
    expect(navElement).toHaveClass('bg-white', 'dark:bg-gray-950');
    expect(navElement).toHaveClass(
      'border-b',
      'border-gray-200',
      'dark:border-gray-800'
    );
  });

  it('applies correct styling classes to navigation links', () => {
    const { container } = render(<Navbar />);

    // Get navigation links (excluding logo link)
    const navLinksContainer = container.querySelector(
      '.flex.flex-row.items-center.gap-6'
    );
    expect(navLinksContainer).toBeInTheDocument();

    const navLinks = navLinksContainer?.querySelectorAll('a') || [];
    expect(navLinks.length).toBe(4);

    navLinks.forEach((link) => {
      expect(link).toHaveClass('text-gray-600', 'dark:text-gray-400');
      expect(link).toHaveClass(
        'hover:text-gray-900',
        'dark:hover:text-gray-100'
      );
      expect(link).toHaveClass('transition-colors', 'duration-200');
      expect(link).toHaveClass('font-medium');
      expect(link).toHaveClass(
        'focus:ring-2',
        'focus:ring-gray-500',
        'focus:outline-none'
      );
    });
  });

  it('applies correct styling classes to logo/brand link', () => {
    render(<Navbar />);

    const logoLink = screen.getByLabelText(
      'Navigate to home page - Chen portfolio'
    );

    expect(logoLink).toHaveClass('flex', 'items-center');
    expect(logoLink).toHaveClass('min-h-[44px]');
    expect(logoLink).toHaveClass('focus:ring-2', 'focus:ring-gray-500');
    expect(logoLink).toHaveClass('focus:outline-none', 'rounded');
    expect(logoLink).toHaveTextContent('Chen');
  });

  it('applies correct responsive layout classes', () => {
    const { container } = render(<Navbar />);

    const flexContainer = container.querySelector('.flex.flex-col');
    expect(flexContainer).toHaveClass('flex-col');
    expect(flexContainer).toHaveClass('sm:flex-row');
    expect(flexContainer).toHaveClass('sm:justify-between');
    expect(flexContainer).toHaveClass('gap-4');
  });

  it('applies correct container constraints', () => {
    const { container } = render(<Navbar />);

    const innerContainer = container.querySelector('.max-w-7xl.mx-auto');
    expect(innerContainer).toBeInTheDocument();
    expect(innerContainer).toHaveClass('max-w-7xl');
    expect(innerContainer).toHaveClass('mx-auto');
    expect(innerContainer).toHaveClass('px-4', 'py-4');
  });

  // 5. Interactive Behavior Tests
  it('renders Home link with correct href and attributes', () => {
    render(<Navbar />);

    const homeLink = screen.getByLabelText('Navigate to home page');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveTextContent('Home');
  });

  it('renders About link with correct href and attributes', () => {
    render(<Navbar />);

    const aboutLink = screen.getByLabelText('Navigate to about page');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(aboutLink).toHaveTextContent('About');
  });

  it('renders Projects link with correct href and attributes', () => {
    render(<Navbar />);

    const projectsLink = screen.getByLabelText('Navigate to projects page');
    expect(projectsLink).toHaveAttribute('href', '/projects');
    expect(projectsLink).toHaveTextContent('Projects');
  });

  it('renders Life link with correct href and attributes', () => {
    render(<Navbar />);

    const lifeLink = screen.getByLabelText('Navigate to life page');
    expect(lifeLink).toHaveAttribute('href', '/life');
    expect(lifeLink).toHaveTextContent('Life');
  });

  // 6. Edge Cases and Error Handling
  it('renders without errors', () => {
    expect(() => render(<Navbar />)).not.toThrow();

    const { container } = render(<Navbar />);
    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
  });

  it('maintains accessibility with all links present', () => {
    render(<Navbar />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5); // Logo link + 4 nav links

    expect(links[0]).toHaveAttribute('aria-label');
    expect(links[0].getAttribute('aria-label')).toBeTruthy();
    expect(links[0].getAttribute('href')).toBeTruthy();

    expect(links[1]).toHaveAttribute('aria-label');
    expect(links[1].getAttribute('aria-label')).toBeTruthy();
    expect(links[1].getAttribute('href')).toBeTruthy();

    expect(links[2]).toHaveAttribute('aria-label');
    expect(links[2].getAttribute('aria-label')).toBeTruthy();
    expect(links[2].getAttribute('href')).toBeTruthy();

    expect(links[3]).toHaveAttribute('aria-label');
    expect(links[3].getAttribute('aria-label')).toBeTruthy();
    expect(links[3].getAttribute('href')).toBeTruthy();

    expect(links[4]).toHaveAttribute('aria-label');
    expect(links[4].getAttribute('aria-label')).toBeTruthy();
    expect(links[4].getAttribute('href')).toBeTruthy();
  });

  it('handles component rendering without breaking', () => {
    expect(() => render(<Navbar />)).not.toThrow();

    const { container } = render(<Navbar />);
    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();

    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(5); // Logo link + 4 nav links
  });

  it('maintains proper structure and accessibility', () => {
    const { container } = render(<Navbar />);

    const navElement = container.querySelector('nav[role="navigation"]');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveAttribute('aria-label');

    const links = container.querySelectorAll('a');
    expect(links.length).toBeGreaterThanOrEqual(5); // Logo link + 4 nav links

    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
      expect(link).toHaveClass('min-h-[44px]');
    });
  });
});
