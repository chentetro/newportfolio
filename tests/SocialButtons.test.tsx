import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SocialButtons from '@/app/components/SocialButtons';

describe('SocialButtons', () => {
  const mockProps = {
    githubUrl: 'https://github.com/testuser',
    cvUrl: '/resume.pdf',
    linkedInUrl: 'https://linkedin.com/in/testuser',
    email: 'test@example.com',
  };

  const emptyMockProps = {
    githubUrl: '',
    cvUrl: '',
    linkedInUrl: '',
    email: '',
  };

  // 1. Core Functionality Tests
  it('renders all four buttons with correct labels', () => {
    render(<SocialButtons {...mockProps} />);

    expect(screen.getByLabelText('Visit GitHub profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit LinkedIn profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Download CV')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact via email')).toBeInTheDocument();
  });

  it('displays correct text content for each button', () => {
    render(<SocialButtons {...mockProps} />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('CV')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  // 2. Structural Hierarchy Tests
  it('uses proper semantic structure with container element', () => {
    const { container } = render(<SocialButtons {...mockProps} />);

    // Verify main container structure
    const mainContainer = container.querySelector('.flex.flex-wrap');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass(
      'gap-4',
      'items-center',
      'justify-center'
    );

    // All buttons should be Link elements (rendered as anchor tags)
    const linkElements = container.querySelectorAll('a');
    expect(linkElements).toHaveLength(4);
  });

  it('maintains proper link element hierarchy', () => {
    render(<SocialButtons {...mockProps} />);

    // All interactive elements should be links (no buttons in this component)
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);

    // Verify each link individually to avoid timeout issues
    const githubLink = screen.getByLabelText('Visit GitHub profile');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.tagName).toBe('A');

    const linkedinLink = screen.getByLabelText('Visit LinkedIn profile');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink.tagName).toBe('A');

    const cvLink = screen.getByLabelText('Download CV');
    expect(cvLink).toBeInTheDocument();
    expect(cvLink.tagName).toBe('A');

    const emailLink = screen.getByLabelText('Contact via email');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.tagName).toBe('A');
  });

  // 3. Accessibility Tests
  it('meets comprehensive accessibility requirements', () => {
    const { container } = render(<SocialButtons {...mockProps} />);

    // Test that ALL links have aria-label attributes
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);

    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
      expect(link.getAttribute('aria-label')).toBeTruthy();
      expect(link.getAttribute('aria-label')).not.toBe('');
    });

    // Test decorative SVG icons have aria-hidden="true"
    const svgIcons = container.querySelectorAll('svg');
    expect(svgIcons.length).toBe(3); // GitHub, LinkedIn, and Contact icons

    svgIcons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('provides adequate touch targets for all interactive elements', () => {
    const { container } = render(<SocialButtons {...mockProps} />);

    // All links should meet 44x44px minimum touch target requirement
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(4);

    links.forEach((link) => {
      // Check for proper padding classes that create adequate touch targets
      expect(link).toHaveClass('px-4', 'py-2');

      // Verify the link has flex and gap classes for proper layout
      expect(link).toHaveClass('flex', 'items-center', 'gap-2');
    });
  });

  it('ensures proper focus and keyboard accessibility', () => {
    const { container } = render(<SocialButtons {...mockProps} />);

    // All links should be keyboard accessible and focusable
    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      expect(link).not.toHaveAttribute('tabindex', '-1');
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });

  // 4. Styling and Layout Tests
  it('applies correct styling classes to all buttons', () => {
    const { container } = render(<SocialButtons {...mockProps} />);

    const links = container.querySelectorAll('a');

    links.forEach((link) => {
      // Verify monochrome styling per design system
      expect(link).toHaveClass('bg-gray-900', 'dark:bg-gray-100');
      expect(link).toHaveClass('text-white', 'dark:text-gray-900');
      expect(link).toHaveClass('hover:bg-gray-800', 'dark:hover:bg-gray-200');

      // Verify layout and spacing
      expect(link).toHaveClass('flex', 'items-center', 'gap-2');
      expect(link).toHaveClass('px-4', 'py-2');
      expect(link).toHaveClass('rounded-lg');

      // Verify transitions
      expect(link).toHaveClass('transition-colors', 'duration-200');
      expect(link).toHaveClass('font-medium');
    });
  });

  it('renders SVG icons with correct styling', () => {
    const { container } = render(<SocialButtons {...mockProps} />);

    const svgIcons = container.querySelectorAll('svg');
    svgIcons.forEach((icon) => {
      expect(icon).toHaveClass('w-5', 'h-5');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('applies correct container layout classes', () => {
    const { container } = render(<SocialButtons {...mockProps} />);

    const mainContainer = container.querySelector('div');
    expect(mainContainer).toHaveClass('flex', 'flex-wrap', 'gap-4');
    expect(mainContainer).toHaveClass('items-center', 'justify-center');
  });

  // 5. Interactive Behavior Tests
  it('renders GitHub button with correct href and attributes', () => {
    render(<SocialButtons {...mockProps} />);

    const githubLink = screen.getByLabelText('Visit GitHub profile');
    expect(githubLink).toHaveAttribute('href', mockProps.githubUrl);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders LinkedIn button with correct href and attributes', () => {
    render(<SocialButtons {...mockProps} />);

    const linkedInLink = screen.getByLabelText('Visit LinkedIn profile');
    expect(linkedInLink).toHaveAttribute('href', mockProps.linkedInUrl);
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders CV button with correct href and attributes', () => {
    render(<SocialButtons {...mockProps} />);

    const cvLink = screen.getByLabelText('Download CV');
    expect(cvLink).toHaveAttribute('href', mockProps.cvUrl);
    expect(cvLink).toHaveAttribute('target', '_blank');
    expect(cvLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Contact button with correct mailto href', () => {
    render(<SocialButtons {...mockProps} />);

    const contactLink = screen.getByLabelText('Contact via email');
    expect(contactLink).toHaveAttribute('href', `mailto:${mockProps.email}`);
    // Contact link should NOT have target="_blank" since it opens mail client
    expect(contactLink).not.toHaveAttribute('target');
  });

  it('handles external link security properly', () => {
    render(<SocialButtons {...mockProps} />);

    // External links should have proper security attributes
    const externalLinks = [
      screen.getByLabelText('Visit GitHub profile'),
      screen.getByLabelText('Visit LinkedIn profile'),
      screen.getByLabelText('Download CV'),
    ];

    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  // 6. Edge Cases and Error Handling
  it('handles empty or missing URLs gracefully', () => {
    expect(() => render(<SocialButtons {...emptyMockProps} />)).not.toThrow();

    // Component should still render with empty URLs
    const { container } = render(<SocialButtons {...emptyMockProps} />);
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(4);

    // Links should still have aria-labels even with empty hrefs
    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
    });
  });

  it('handles invalid URL formats without breaking', () => {
    const invalidProps = {
      githubUrl: 'not-a-valid-url',
      cvUrl: 'invalid-file-path',
      linkedInUrl: '://malformed-url',
      email: 'invalid-email-format',
    };

    expect(() => render(<SocialButtons {...invalidProps} />)).not.toThrow();

    // Component should render and maintain structure
    const { container } = render(<SocialButtons {...invalidProps} />);
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(4);
  });

  it('maintains accessibility with missing optional data', () => {
    const minimalProps = {
      githubUrl: 'https://github.com/test',
      cvUrl: '',
      linkedInUrl: '',
      email: 'test@test.com',
    };

    const { container } = render(<SocialButtons {...minimalProps} />);

    // Should maintain accessibility even with some missing URLs
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
      expect(link.getAttribute('aria-label')).toBeTruthy();
    });

    // SVG icons should still have proper accessibility
    const svgIcons = container.querySelectorAll('svg');
    svgIcons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('renders without component-breaking prop combinations', () => {
    // Test with fallback values that won't break Next.js Link component
    const fallbackProps = {
      githubUrl: '#', // Fallback hash link
      cvUrl: '#',
      linkedInUrl: '#',
      email: 'fallback@example.com',
    };

    expect(() => render(<SocialButtons {...fallbackProps} />)).not.toThrow();
  });

  it('maintains proper structure with mixed valid and invalid URLs', () => {
    const mixedProps = {
      githubUrl: 'https://github.com/valid',
      cvUrl: '',
      linkedInUrl: 'not-a-url',
      email: 'valid@email.com',
    };

    render(<SocialButtons {...mixedProps} />);

    // All buttons should still render and be accessible
    expect(screen.getByLabelText('Visit GitHub profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit LinkedIn profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Download CV')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact via email')).toBeInTheDocument();
  });
});
