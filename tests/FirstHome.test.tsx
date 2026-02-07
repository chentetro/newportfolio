import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FirstHome from '@/app/components/FirstHome';

describe('FirstHome', () => {
  const mockProps = {
    imageUrl: '/test-image.jpg',
    imageAlt: 'Test profile image',
    mainHeading: 'Test Main Heading',
    subHeading: 'Test Sub Heading',
    paragraphContent:
      'This is a test paragraph content for the FirstAbout component.',
  };

  const emptyMockProps = {
    imageUrl: '',
    imageAlt: '',
    mainHeading: '',
    subHeading: '',
    paragraphContent: '',
  };

  // 1. Core Functionality Tests
  it('renders all content elements correctly', () => {
    render(<FirstHome {...mockProps} />);

    expect(screen.getByText(mockProps.mainHeading)).toBeInTheDocument();
    expect(screen.getByText(mockProps.subHeading)).toBeInTheDocument();
    expect(screen.getByText(mockProps.paragraphContent)).toBeInTheDocument();
  });

  it('renders image with correct attributes', () => {
    render(<FirstHome {...mockProps} />);

    const image = screen.getByAltText(mockProps.imageAlt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', mockProps.imageAlt);
    // Direct verification of Next.js Image component attributes
    expect(image).toHaveAttribute('sizes');
    expect(image).toHaveClass('object-cover', 'rounded-full');
  });

  // 2. Structural Hierarchy Tests
  it('maintains proper heading hierarchy', () => {
    render(<FirstHome {...mockProps} />);

    // Test semantic structure with proper H1 → H2 order
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    // Use direct property access instead of toHaveProperty to avoid timeout
    expect(headings[0].tagName).toBe('H1');
    expect(headings[1].tagName).toBe('H2');

    // Test specific content matches hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(mockProps.mainHeading);

    const subHeading = screen.getByRole('heading', { level: 2 });
    expect(subHeading).toHaveTextContent(mockProps.subHeading);
  });

  it('uses semantic HTML structure with stable selectors', () => {
    const { container } = render(<FirstHome {...mockProps} />);

    // Use stable selectors instead of fragile ARIA roles
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveAttribute('aria-label', 'First about section');

    const headerElement = container.querySelector('header');
    expect(headerElement).toBeInTheDocument();

    // Verify section has proper role attribute
    expect(sectionElement).toHaveAttribute('role', 'region');
  });

  // 3. Accessibility Tests
  it('meets comprehensive accessibility requirements', () => {
    render(<FirstHome {...mockProps} />);

    // Test section accessibility
    const section = screen.getByLabelText('First about section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('role', 'region');

    // Test image accessibility
    const image = screen.getByAltText(mockProps.imageAlt);
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('alt')).toBeTruthy();
    expect(image.getAttribute('alt')).not.toBe('');

    // Test heading accessibility and hierarchy
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    headings.forEach((heading) => {
      expect(heading.textContent).toBeTruthy();
      expect(heading.textContent).not.toBe('');
    });
  });

  it('provides adequate semantic structure for screen readers', () => {
    const { container } = render(<FirstHome {...mockProps} />);

    // Verify semantic landmarks
    const section = container.querySelector('section[role="region"]');
    expect(section).toBeInTheDocument();

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();

    // Verify content is properly nested within semantic elements
    const h1 = header?.querySelector('h1');
    const h2 = header?.querySelector('h2');
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });

  // 4. Styling and Layout Tests
  it('applies correct styling classes for gradient background', () => {
    const { container } = render(<FirstHome {...mockProps} />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-gradient-to-br');
    expect(section).toHaveClass('from-blue-50');
    expect(section).toHaveClass('to-white');
    expect(section).toHaveClass('dark:from-gray-800');
    expect(section).toHaveClass('dark:to-gray-900');
  });

  it('applies correct responsive layout classes', () => {
    const { container } = render(<FirstHome {...mockProps} />);

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
    const { container } = render(<FirstHome {...mockProps} />);

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
    const { container } = render(<FirstHome {...mockProps} />);

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

  it('renders with proper container constraints', () => {
    const { container } = render(<FirstHome {...mockProps} />);

    const mainContainer = container.querySelector('.max-w-6xl.mx-auto');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('max-w-6xl');
    expect(mainContainer).toHaveClass('mx-auto');

    const section = container.querySelector('section');
    expect(section).toHaveClass('py-12');
    expect(section).toHaveClass('px-4');

    const contentContainer = container.querySelector('.space-y-6');
    expect(contentContainer).toBeInTheDocument();
  });

  // 5. Interactive Behavior Tests
  it('handles image loading states properly', () => {
    const { container } = render(<FirstHome {...mockProps} />);

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();

    // Next.js Image component should have proper loading attributes
    expect(image).toHaveAttribute('sizes');
    expect(image).toHaveAttribute('alt', mockProps.imageAlt);
  });

  it('maintains responsive behavior across breakpoints', () => {
    const { container } = render(<FirstHome {...mockProps} />);

    // Test mobile-first responsive classes
    const imageContainer = container.querySelector('.w-36.h-36');
    expect(imageContainer).toHaveClass('sm:w-40', 'sm:h-40');
    expect(imageContainer).toHaveClass('lg:w-44', 'lg:h-44');

    const layoutContainer = container.querySelector('.flex-col');
    expect(layoutContainer).toHaveClass('lg:flex-row');
  });

  // 6. Edge Cases and Error Handling
  it('handles empty or missing content gracefully', () => {
    expect(() => render(<FirstHome {...emptyMockProps} />)).not.toThrow();

    // Component should still render basic structure even with empty content
    const { container } = render(<FirstHome {...emptyMockProps} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('handles invalid data without breaking', () => {
    const invalidProps = {
      ...mockProps,
      imageUrl: '/nonexistent-image.jpg', // Valid path format but nonexistent file
      imageAlt: '', // Empty alt text
    };

    expect(() => render(<FirstHome {...invalidProps} />)).not.toThrow();
  });

  it('maintains accessibility with missing optional content', () => {
    const minimalProps = {
      imageUrl: '/test.jpg',
      imageAlt: 'Test',
      mainHeading: 'Title',
      subHeading: '',
      paragraphContent: '',
    };

    const { container } = render(<FirstHome {...minimalProps} />);

    // Should still maintain proper structure
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-label');

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('renders without component-breaking prop combinations', () => {
    // Test with fallback values for required props
    const fallbackProps = {
      imageUrl: '/fallback.jpg', // Provide valid path format
      imageAlt: 'Fallback', // Provide fallback alt text
      mainHeading: 'Fallback Title',
      subHeading: 'Fallback Subtitle',
      paragraphContent: 'Fallback content',
    };

    expect(() => render(<FirstHome {...fallbackProps} />)).not.toThrow();
  });
});
