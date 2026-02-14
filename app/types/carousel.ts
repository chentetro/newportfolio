/**
 * Represents an item in an image carousel.
 * Each item contains the necessary information to display an image with proper accessibility.
 */
export interface CarouselItem {
  /** Unique identifier for the carousel item */
  id: string;
  /** Image source path (relative to public folder or absolute URL) */
  imageUrl: string;
  /** Descriptive alt text for the image (required for accessibility) */
  imageAlt: string;
}

/**
 * Props for the ImageCarousel component.
 */
export interface ImageCarouselProps {
  /** Title displayed above the carousel */
  title: string;
  /** Array of carousel items to display */
  items: CarouselItem[];
  /** Whether the carousel should automatically slide */
  autoSlide?: boolean;
  /** Interval in milliseconds between automatic slides */
  autoSlideInterval?: number;
}
