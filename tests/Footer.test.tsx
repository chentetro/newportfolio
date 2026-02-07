import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/app/components/Footer';

describe('Footer', () => {
  // 1. Core Functionality Tests
  it('renders all three social media links', () => {
    render(<Footer />);

    expect(screen.getByLabelText('Visit GitHub profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit LinkedIn profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact via email')).toBeInTheDocument();
  });

  it('renders links with correct href attributes', () => {
    render(<Footer />);

    const githubLink = screen.getByLabelText('Visit GitHub profile');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/chentetro');

    const linkedinLink = screen.getByLabelText('Visit LinkedIn profile');
    expect(linkedinLink).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin.com')
    );

    const emailLink = screen.getByLabelText('Contact via email');
    expect(emailLink).toHaveAttribute('href', 'mailto:chentetroo@gmail.com');
  });

  it('external links have target="_blank" and rel="noopener noreferrer"', () => {
    render(<Footer />);

    const githubLink = screen.getByLabelText('Visit GitHub profile');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const linkedinLink = screen.getByLabelText('Visit LinkedIn profile');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('email link does not have target="_blank"', () => {
    render(<Footer />);

    const emailLink = screen.getByLabelText('Contact via email');
    expect(emailLink).not.toHaveAttribute('target', '_blank');
  });

  // 2. Structural Hierarchy Tests
  it('uses semantic HTML structure with stable selectors', () => {
    const { container } = render(<Footer />);

    const footerElement = container.querySelector('footer');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveAttribute('role', 'contentinfo');
    expect(footerElement).toHaveAttribute(
      'aria-label',
      'Site footer with social media links'
    );

    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveAttribute('aria-label', 'Social media links');
  });

  it('maintains proper link element hierarchy', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    // Verify each link by querying all at once to avoid timeout issues
    const githubLink = screen.getByLabelText('Visit GitHub profile');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.tagName).toBe('A');

    const linkedinLink = screen.getByLabelText('Visit LinkedIn profile');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink.tagName).toBe('A');

    const emailLink = screen.getByLabelText('Contact via email');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.tagName).toBe('A');
  });

  it('renders with proper container structure', () => {
    const { container } = render(<Footer />);

    const footerElement = container.querySelector('footer');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveClass('w-full');

    const innerContainer = container.querySelector('.max-w-7xl.mx-auto');
    expect(innerContainer).toBeInTheDocument();

    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('flex', 'items-center', 'justify-center');
  });

  // 3. Accessibility Tests
  it('meets comprehensive accessibility requirements', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
      expect(link.getAttribute('aria-label')).toBeTruthy();
      expect(link.getAttribute('aria-label')).not.toBe('');
    });
  });

  it('provides adequate touch targets for all links', () => {
    const { container } = render(<Footer />);

    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(3);

    links.forEach((link) => {
      expect(link).toHaveClass('min-w-[44px]');
      expect(link).toHaveClass('min-h-[44px]');
    });
  });

  it('ensures proper focus and keyboard accessibility', () => {
    const { container } = render(<Footer />);

    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      expect(link).not.toHaveAttribute('tabindex', '-1');
      expect(link.getAttribute('href')).toBeTruthy();
      expect(link).toHaveClass('focus:ring-2');
      expect(link).toHaveClass('focus:outline-none');
    });
  });

  it('provides adequate semantic structure for screen readers', () => {
    const { container } = render(<Footer />);

    const footerElement = container.querySelector('footer[role="contentinfo"]');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveAttribute(
      'aria-label',
      'Site footer with social media links'
    );

    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveAttribute('aria-label', 'Social media links');

    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
    });
  });

  // 4. Styling and Layout Tests
  it('applies correct styling classes to footer container', () => {
    const { container } = render(<Footer />);

    const footerElement = container.querySelector('footer');
    expect(footerElement).toHaveClass('w-full');
    expect(footerElement).toHaveClass('border-t');
    expect(footerElement).toHaveClass(
      'border-gray-200',
      'dark:border-gray-800'
    );
    expect(footerElement).toHaveClass('bg-white', 'dark:bg-gray-950');
  });

  it('applies correct styling classes to navigation container', () => {
    const { container } = render(<Footer />);

    const navElement = container.querySelector('nav');
    expect(navElement).toHaveClass('flex', 'items-center', 'justify-center');
    expect(navElement).toHaveClass('gap-6');
  });

  it('applies correct styling classes to social links', () => {
    const { container } = render(<Footer />);

    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(3);

    links.forEach((link) => {
      expect(link).toHaveClass('flex', 'items-center', 'justify-center');
      expect(link).toHaveClass('text-gray-600', 'dark:text-gray-400');
      expect(link).toHaveClass(
        'hover:text-gray-900',
        'dark:hover:text-gray-100'
      );
      expect(link).toHaveClass('transition-colors', 'duration-200');
      expect(link).toHaveClass(
        'focus:ring-2',
        'focus:ring-gray-500',
        'focus:outline-none'
      );
      expect(link).toHaveClass('rounded');
    });
  });

  it('applies correct container constraints', () => {
    const { container } = render(<Footer />);

    const innerContainer = container.querySelector('.max-w-7xl.mx-auto');
    expect(innerContainer).toBeInTheDocument();
    expect(innerContainer).toHaveClass('max-w-7xl');
    expect(innerContainer).toHaveClass('mx-auto');
    expect(innerContainer).toHaveClass('px-4', 'py-8');
  });

  // 5. Interactive Behavior Tests
  it('renders GitHub link with correct href and attributes', () => {
    render(<Footer />);

    const githubLink = screen.getByLabelText('Visit GitHub profile');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/chentetro');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders LinkedIn link with correct href and attributes', () => {
    render(<Footer />);

    const linkedinLink = screen.getByLabelText('Visit LinkedIn profile');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin.com')
    );
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Email link with correct href and attributes', () => {
    render(<Footer />);

    const emailLink = screen.getByLabelText('Contact via email');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:chentetroo@gmail.com');
    expect(emailLink).not.toHaveAttribute('target', '_blank');
  });

  // 6. Edge Cases and Error Handling
  it('renders without errors', () => {
    expect(() => render(<Footer />)).not.toThrow();

    const { container } = render(<Footer />);
    const footerElement = container.querySelector('footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('maintains accessibility with all links present', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
      expect(link.getAttribute('aria-label')).toBeTruthy();
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });

  it('handles component rendering without breaking', () => {
    expect(() => render(<Footer />)).not.toThrow();

    const { container } = render(<Footer />);
    const footerElement = container.querySelector('footer');
    expect(footerElement).toBeInTheDocument();

    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(3);
  });

  it('maintains proper structure and accessibility', () => {
    const { container } = render(<Footer />);

    const footerElement = container.querySelector('footer[role="contentinfo"]');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveAttribute('aria-label');

    const links = container.querySelectorAll('a');
    expect(links.length).toBe(3);

    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
      expect(link).toHaveClass('min-w-[44px]');
      expect(link).toHaveClass('min-h-[44px]');
    });
  });
});
