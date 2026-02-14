import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageCarousel from '@/app/components/ImageCarousel';
import type { CarouselItem } from '@/app/types/carousel';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    fill,
    className,
    sizes,
    priority,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
    priority?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      data-fill={fill}
      data-sizes={sizes}
      data-priority={priority}
    />
  ),
}));

describe('ImageCarousel', () => {
  const mockItems: CarouselItem[] = [
    {
      id: 'item-1',
      imageUrl: '/images/life/image-1.jpg',
      imageAlt: 'First life moment',
    },
    {
      id: 'item-2',
      imageUrl: '/images/life/image-2.jpg',
      imageAlt: 'Second life moment',
    },
    {
      id: 'item-3',
      imageUrl: '/images/life/image-3.jpg',
      imageAlt: 'Third life moment',
    },
  ];

  const singleItem: CarouselItem[] = [
    {
      id: 'single-item',
      imageUrl: '/images/life/single.jpg',
      imageAlt: 'Single image',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 1. Core Functionality Tests
  it('renders carousel with title and all images', () => {
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Life Moments'
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('alt', 'First life moment');
    expect(images[1]).toHaveAttribute('alt', 'Second life moment');
    expect(images[2]).toHaveAttribute('alt', 'Third life moment');
  });

  it('renders navigation buttons with correct aria-labels', () => {
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const prevButton = screen.getByLabelText('Previous image');
    const nextButton = screen.getByLabelText('Next image');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton.tagName).toBe('BUTTON');
    expect(nextButton.tagName).toBe('BUTTON');
  });

  it('renders indicator dots for all items', () => {
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const indicators = screen.getAllByRole('tab');
    expect(indicators).toHaveLength(3);

    indicators.forEach((indicator, index) => {
      expect(indicator).toHaveAttribute(
        'aria-label',
        `Go to slide ${index + 1}`
      );
    });
  });

  it('displays first image by default', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const carouselRegion = container.querySelector(
      '[role="region"][aria-live="polite"]'
    );
    expect(carouselRegion).toBeInTheDocument();
    expect(carouselRegion).toHaveAttribute(
      'aria-label',
      'Life Moments carousel - slide 1 of 3'
    );
  });

  it('returns null when items array is empty', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={[]} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders images with correct attributes', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(3);

    images.forEach((image, index) => {
      expect(image).toHaveAttribute('src', mockItems[index].imageUrl);
      expect(image).toHaveAttribute('alt', mockItems[index].imageAlt);
      expect(image).toHaveAttribute('data-fill', 'true');
      expect(image).toHaveAttribute('data-sizes', '100vw');
    });

    // First image should have priority
    expect(images[0]).toHaveAttribute('data-priority', 'true');
    expect(images[1]).toHaveAttribute('data-priority', 'false');
    expect(images[2]).toHaveAttribute('data-priority', 'false');
  });

  it('applies correct image styling classes', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const images = container.querySelectorAll('img');
    images.forEach((image) => {
      expect(image).toHaveClass('object-contain');
    });
  });

  // 2. Structural Hierarchy Tests
  it('maintains proper heading hierarchy', () => {
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveProperty('tagName', 'H2');
    expect(headings[0]).toHaveTextContent('Life Moments');
  });

  it('uses semantic HTML structure with stable selectors', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-label', 'Life Moments carousel');

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();

    const carouselRegion = container.querySelector('[role="region"]');
    expect(carouselRegion).toBeInTheDocument();
    expect(carouselRegion).toHaveAttribute('aria-live', 'polite');
  });

  it('renders with proper container structure', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('py-12', 'px-4');

    const maxWidthContainer = container.querySelector('.max-w-7xl.mx-auto');
    expect(maxWidthContainer).toBeInTheDocument();
  });

  // 3. Accessibility Tests
  it('meets comprehensive accessibility requirements', () => {
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2); // nav buttons + indicators

    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label');
      expect(button.getAttribute('aria-label')).toBeTruthy();
    });

    const images = screen.getAllByRole('img');
    images.forEach((image) => {
      expect(image).toHaveAttribute('alt');
      expect(image.getAttribute('alt')).toBeTruthy();
    });
  });

  it('provides adequate touch targets for all interactive elements', () => {
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const prevButton = screen.getByLabelText('Previous image');
    const nextButton = screen.getByLabelText('Next image');

    expect(prevButton).toHaveClass('min-h-[44px]');
    expect(prevButton).toHaveClass('min-w-[44px]');
    expect(nextButton).toHaveClass('min-h-[44px]');
    expect(nextButton).toHaveClass('min-w-[44px]');

    const indicatorButtons = screen.getAllByRole('tab');
    expect(indicatorButtons[0]).toHaveClass('min-h-[44px]');
    expect(indicatorButtons[0]).toHaveClass('min-w-[44px]');
    expect(indicatorButtons[1]).toHaveClass('min-h-[44px]');
    expect(indicatorButtons[1]).toHaveClass('min-w-[44px]');
    expect(indicatorButtons[2]).toHaveClass('min-h-[44px]');
    expect(indicatorButtons[2]).toHaveClass('min-w-[44px]');
  });

  it('ensures proper focus and keyboard accessibility', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const buttons = container.querySelectorAll('button');
    buttons.forEach((button) => {
      expect(button).toHaveClass('focus:ring-2');
      expect(button).toHaveClass('focus:outline-none');
    });

    const carouselContainer = container.querySelector('[role="region"]');
    expect(carouselContainer).toHaveAttribute('tabIndex', '0');
  });

  it('provides proper ARIA attributes for carousel region', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const carouselRegion = container.querySelector('[role="region"]');
    expect(carouselRegion).toBeInTheDocument();
    expect(carouselRegion).toHaveAttribute('aria-live', 'polite');
    expect(carouselRegion).toHaveAttribute('aria-label');
    expect(carouselRegion?.getAttribute('aria-label')).toContain('carousel');
  });

  it('provides proper ARIA attributes for indicator dots', () => {
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();
    expect(tablist).toHaveAttribute('aria-label', 'Carousel indicators');

    const indicators = screen.getAllByRole('tab');
    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');
    expect(indicators[1]).toHaveAttribute('aria-selected', 'false');
    expect(indicators[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('ensures decorative icons have aria-hidden', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const svgIcons = container.querySelectorAll('svg');
    svgIcons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // 4. Styling and Layout Tests
  it('applies correct monochrome styling to navigation buttons', () => {
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const prevButton = screen.getByLabelText('Previous image');
    const nextButton = screen.getByLabelText('Next image');

    expect(prevButton).toHaveClass('bg-gray-900/80');
    expect(prevButton).toHaveClass('dark:bg-gray-100/80');
    expect(prevButton).toHaveClass('text-white');
    expect(prevButton).toHaveClass('dark:text-gray-900');

    expect(nextButton).toHaveClass('bg-gray-900/80');
    expect(nextButton).toHaveClass('dark:bg-gray-100/80');
    expect(nextButton).toHaveClass('text-white');
    expect(nextButton).toHaveClass('dark:text-gray-900');
  });

  it('applies correct styling classes to carousel container', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const carouselContainer = container.querySelector(
      '.relative.overflow-hidden.rounded-lg'
    );
    expect(carouselContainer).toBeInTheDocument();

    const flexContainer = container.querySelector('.flex.transition-transform');
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveClass('ease-out', 'duration-500');
  });

  it('applies correct styling classes to image containers', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const imageContainers = container.querySelectorAll(
      '.relative.w-full.flex-shrink-0'
    );
    expect(imageContainers).toHaveLength(3);

    imageContainers.forEach((container) => {
      expect(container).toHaveClass('min-h-[450px]');
    });
  });

  it('applies correct styling classes to indicator dots', () => {
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const indicators = screen.getAllByRole('tab');
    indicators.forEach((indicator) => {
      expect(indicator).toHaveClass('bg-transparent');
      expect(indicator).toHaveClass('rounded-full');
    });
  });

  it('applies correct container constraints', () => {
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const maxWidthContainer = container.querySelector('.max-w-7xl.mx-auto');
    expect(maxWidthContainer).toBeInTheDocument();
    expect(maxWidthContainer).toHaveClass('max-w-7xl');
    expect(maxWidthContainer).toHaveClass('mx-auto');
  });

  it('renders correctly at mobile width (375px)', () => {
    // Set viewport to mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 667,
    });

    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('px-4'); // Mobile padding

    // Verify container constraints prevent horizontal overflow
    const maxWidthContainer = container.querySelector('.max-w-7xl.mx-auto');
    expect(maxWidthContainer).toBeInTheDocument();

    // Verify carousel container has overflow hidden
    const carouselContainer = container.querySelector(
      '.relative.overflow-hidden.rounded-lg'
    );
    expect(carouselContainer).toBeInTheDocument();

    // Verify all images are rendered
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
  });

  // 5. Interactive Behavior Tests
  it('navigates to next slide when next button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const nextButton = screen.getByLabelText('Next image');
    const indicators = screen.getAllByRole('tab');

    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');
    expect(indicators[1]).toHaveAttribute('aria-selected', 'false');

    await user.click(nextButton);

    const updatedIndicators = screen.getAllByRole('tab');
    expect(updatedIndicators[0]).toHaveAttribute('aria-selected', 'false');
    expect(updatedIndicators[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('navigates to previous slide when previous button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const prevButton = screen.getByLabelText('Previous image');
    const indicators = screen.getAllByRole('tab');

    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');

    // Start at slide 1, clicking prev should wrap to last slide
    await user.click(prevButton);

    const updatedIndicators = screen.getAllByRole('tab');
    expect(updatedIndicators[2]).toHaveAttribute('aria-selected', 'true');
    expect(updatedIndicators[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('navigates to specific slide when indicator dot is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const thirdIndicator = screen.getByLabelText('Go to slide 3');
    const indicators = screen.getAllByRole('tab');

    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');

    await user.click(thirdIndicator);

    const updatedIndicators = screen.getAllByRole('tab');
    expect(updatedIndicators[0]).toHaveAttribute('aria-selected', 'false');
    expect(updatedIndicators[1]).toHaveAttribute('aria-selected', 'false');
    expect(updatedIndicators[2]).toHaveAttribute('aria-selected', 'true');
  });

  it('navigates with keyboard arrow keys', async () => {
    const user = userEvent.setup({ delay: null });
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const carouselRegion = container.querySelector(
      '[role="region"]'
    ) as HTMLElement;
    carouselRegion?.focus();

    const indicators = screen.getAllByRole('tab');
    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowRight}');

    const updatedIndicators1 = screen.getAllByRole('tab');
    expect(updatedIndicators1[1]).toHaveAttribute('aria-selected', 'true');
    expect(updatedIndicators1[0]).toHaveAttribute('aria-selected', 'false');

    await user.keyboard('{ArrowLeft}');

    const updatedIndicators2 = screen.getAllByRole('tab');
    expect(updatedIndicators2[0]).toHaveAttribute('aria-selected', 'true');
    expect(updatedIndicators2[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('does not navigate with keyboard when input is focused', async () => {
    const user = userEvent.setup({ delay: null });
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    // Create and focus an input element
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const carouselRegion = container.querySelector('[role="region"]');
    expect(carouselRegion).toHaveAttribute(
      'aria-label',
      'Life Moments carousel - slide 1 of 3'
    );

    await user.keyboard('{ArrowRight}');

    // Should still be on slide 1 because input is focused
    expect(carouselRegion).toHaveAttribute(
      'aria-label',
      'Life Moments carousel - slide 1 of 3'
    );

    document.body.removeChild(input);
  });

  it('auto-slides when autoSlide prop is enabled', async () => {
    vi.useFakeTimers();
    render(
      <ImageCarousel
        title="Life Moments"
        items={mockItems}
        autoSlide={true}
        autoSlideInterval={1000}
      />
    );

    const indicators = screen.getAllByRole('tab');
    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');

    // Fast-forward time by 1000ms
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    const updatedIndicators = screen.getAllByRole('tab');
    expect(updatedIndicators[1]).toHaveAttribute('aria-selected', 'true');
    expect(updatedIndicators[0]).toHaveAttribute('aria-selected', 'false');

    vi.useRealTimers();
  });

  it('does not auto-slide when autoSlide prop is disabled', async () => {
    vi.useFakeTimers();
    const { container } = render(
      <ImageCarousel
        title="Life Moments"
        items={mockItems}
        autoSlide={false}
        autoSlideInterval={1000}
      />
    );

    const carouselRegion = container.querySelector('[role="region"]');
    expect(carouselRegion).toHaveAttribute(
      'aria-label',
      'Life Moments carousel - slide 1 of 3'
    );

    // Fast-forward time by 2000ms
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    // Should still be on slide 1
    expect(carouselRegion).toHaveAttribute(
      'aria-label',
      'Life Moments carousel - slide 1 of 3'
    );

    vi.useRealTimers();
  });

  it('wraps around when navigating past last slide', async () => {
    const user = userEvent.setup({ delay: null });
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const nextButton = screen.getByLabelText('Next image');

    // Navigate to last slide
    await user.click(nextButton);
    let indicators = screen.getAllByRole('tab');
    expect(indicators[1]).toHaveAttribute('aria-selected', 'true');

    await user.click(nextButton);
    indicators = screen.getAllByRole('tab');
    expect(indicators[2]).toHaveAttribute('aria-selected', 'true');

    // Click next again - should wrap to first slide
    await user.click(nextButton);
    indicators = screen.getAllByRole('tab');
    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');
    expect(indicators[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('wraps around when navigating before first slide', async () => {
    const user = userEvent.setup({ delay: null });
    render(<ImageCarousel title="Life Moments" items={mockItems} />);

    const prevButton = screen.getByLabelText('Previous image');
    const indicators = screen.getAllByRole('tab');

    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');

    // Start at slide 1, click prev - should wrap to last slide
    await user.click(prevButton);

    const updatedIndicators = screen.getAllByRole('tab');
    expect(updatedIndicators[2]).toHaveAttribute('aria-selected', 'true');
    expect(updatedIndicators[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('updates aria-label correctly when slide changes', async () => {
    const user = userEvent.setup({ delay: null });
    const { container } = render(
      <ImageCarousel title="Life Moments" items={mockItems} />
    );

    const carouselRegion = container.querySelector('[role="region"]');
    const nextButton = screen.getByLabelText('Next image');

    expect(carouselRegion).toHaveAttribute(
      'aria-label',
      'Life Moments carousel - slide 1 of 3'
    );

    await user.click(nextButton);

    const updatedRegion = container.querySelector('[role="region"]');
    expect(updatedRegion).toHaveAttribute(
      'aria-label',
      'Life Moments carousel - slide 2 of 3'
    );
  });

  // 6. Edge Cases and Error Handling
  it('handles single image carousel correctly', () => {
    const { container } = render(
      <ImageCarousel title="Single Image" items={singleItem} />
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);

    const indicators = screen.getAllByRole('tab');
    expect(indicators).toHaveLength(1);
    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');

    const carouselRegion = container.querySelector('[role="region"]');
    expect(carouselRegion).toHaveAttribute(
      'aria-label',
      'Single Image carousel - slide 1 of 1'
    );
  });

  it('handles many images correctly', () => {
    const manyItems: CarouselItem[] = Array.from({ length: 10 }, (_, i) => ({
      id: `item-${i + 1}`,
      imageUrl: `/images/life/image-${i + 1}.jpg`,
      imageAlt: `Life moment ${i + 1}`,
    }));

    render(<ImageCarousel title="Many Images" items={manyItems} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(10);

    const indicators = screen.getAllByRole('tab');
    expect(indicators).toHaveLength(10);
  });

  it('renders without errors for valid props', () => {
    expect(() =>
      render(<ImageCarousel title="Life Moments" items={mockItems} />)
    ).not.toThrow();
  });
});
