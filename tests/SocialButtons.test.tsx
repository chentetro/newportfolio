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

  it('renders all four buttons with correct labels', () => {
    render(<SocialButtons {...mockProps} />);

    expect(screen.getByLabelText('Visit GitHub profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit LinkedIn profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Download CV')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact via email')).toBeInTheDocument();
  });

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
  });

  it('displays correct text content for each button', () => {
    render(<SocialButtons {...mockProps} />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('CV')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders SVG icons with proper accessibility attributes', () => {
    const { container } = render(<SocialButtons {...mockProps} />);

    const svgIcons = container.querySelectorAll('svg');
    expect(svgIcons.length).toBe(3); // GitHub, LinkedIn, and Contact icons

    svgIcons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveClass('w-5', 'h-5');
    });
  });
});
