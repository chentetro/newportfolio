import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FirstAbout from '@/app/components/FirstAbout';

describe('FirstAbout', () => {
  const mockProps = {
    imageUrl: '/test-image.jpg',
    imageAlt: 'Test profile image',
    mainHeading: 'Test Main Heading',
    subHeading: 'Test Sub Heading',
    paragraphContent:
      'This is a test paragraph content for the FirstAbout component.',
  };

  it('renders all content elements correctly', () => {
    render(<FirstAbout {...mockProps} />);

    expect(screen.getByText(mockProps.mainHeading)).toBeInTheDocument();
    expect(screen.getByText(mockProps.subHeading)).toBeInTheDocument();
    expect(screen.getByText(mockProps.paragraphContent)).toBeInTheDocument();
  });

  it('renders image with correct attributes', () => {
    render(<FirstAbout {...mockProps} />);

    const image = screen.getByAltText(mockProps.imageAlt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', mockProps.imageAlt);
  });

  it('has proper semantic HTML structure', () => {
    render(<FirstAbout {...mockProps} />);

    // Check for section element with proper role
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-label', 'First about section');

    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(mockProps.mainHeading);

    const subHeading = screen.getByRole('heading', { level: 2 });
    expect(subHeading).toHaveTextContent(mockProps.subHeading);
  });

  it('applies correct styling classes for gradient background', () => {
    const { container } = render(<FirstAbout {...mockProps} />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-gradient-to-br');
    expect(section).toHaveClass('from-blue-50');
    expect(section).toHaveClass('to-white');
    expect(section).toHaveClass('dark:from-gray-800');
    expect(section).toHaveClass('dark:to-gray-900');
  });

  it('applies correct responsive layout classes', () => {
    const { container } = render(<FirstAbout {...mockProps} />);

    const layoutContainer = container.querySelector(
      '.flex.flex-col.lg\\:flex-row'
    );
    expect(layoutContainer).toBeInTheDocument();
    expect(layoutContainer).toHaveClass('flex-col');
    expect(layoutContainer).toHaveClass('lg:flex-row');
    expect(layoutContainer).toHaveClass('gap-8');
    expect(layoutContainer).toHaveClass('lg:gap-12');
    expect(layoutContainer).toHaveClass('items-center');
  });

  it('applies correct image container styling for circular shape', () => {
    const { container } = render(<FirstAbout {...mockProps} />);

    const imageContainer = container.querySelector('.relative.w-36.h-36');
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveClass('w-36', 'h-36');
    expect(imageContainer).toHaveClass('sm:w-40', 'sm:h-40');
    expect(imageContainer).toHaveClass('lg:w-44', 'lg:h-44');

    const image = container.querySelector('img');
    expect(image).toHaveClass('rounded-full');
    expect(image).toHaveClass('object-cover');
  });

  it('applies correct text styling and hierarchy', () => {
    const { container } = render(<FirstAbout {...mockProps} />);

    const mainHeading = container.querySelector('h1');
    expect(mainHeading).toHaveClass('text-3xl');
    expect(mainHeading).toHaveClass('lg:text-4xl');
    expect(mainHeading).toHaveClass('font-bold');
    expect(mainHeading).toHaveClass('text-gray-900');
    expect(mainHeading).toHaveClass('dark:text-gray-100');

    const subHeading = container.querySelector('h2');
    expect(subHeading).toHaveClass('text-xl');
    expect(subHeading).toHaveClass('lg:text-2xl');
    expect(subHeading).toHaveClass('font-semibold');
    expect(subHeading).toHaveClass('text-gray-700');
    expect(subHeading).toHaveClass('dark:text-gray-300');

    const paragraph = container.querySelector('p');
    expect(paragraph).toHaveClass('text-base');
    expect(paragraph).toHaveClass('lg:text-lg');
    expect(paragraph).toHaveClass('text-gray-600');
    expect(paragraph).toHaveClass('dark:text-gray-400');
    expect(paragraph).toHaveClass('leading-relaxed');
  });

  it('has proper accessibility features', () => {
    render(<FirstAbout {...mockProps} />);

    // Test ARIA label on section
    const section = screen.getByLabelText('First about section');
    expect(section).toBeInTheDocument();

    // Test image alt text
    const image = screen.getByAltText(mockProps.imageAlt);
    expect(image).toBeInTheDocument();

    // Test heading hierarchy (h1 followed by h2)
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveProperty('tagName', 'H1');
    expect(headings[1]).toHaveProperty('tagName', 'H2');
  });

  it('renders with proper container constraints', () => {
    const { container } = render(<FirstAbout {...mockProps} />);

    const mainContainer = container.querySelector('.max-w-6xl.mx-auto');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('max-w-6xl');
    expect(mainContainer).toHaveClass('mx-auto');
  });

  it('has proper spacing classes applied', () => {
    const { container } = render(<FirstAbout {...mockProps} />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('py-12');
    expect(section).toHaveClass('px-4');

    const contentContainer = container.querySelector('.space-y-6');
    expect(contentContainer).toBeInTheDocument();
  });

  it('renders header element with proper semantic structure', () => {
    const { container } = render(<FirstAbout {...mockProps} />);

    const headerElement = container.querySelector('header');
    expect(headerElement).toBeInTheDocument();
  });

  it('handles empty or missing content gracefully', () => {
    const emptyProps = {
      imageUrl: '',
      imageAlt: '',
      mainHeading: '',
      subHeading: '',
      paragraphContent: '',
    };

    expect(() => render(<FirstAbout {...emptyProps} />)).not.toThrow();
  });
});
