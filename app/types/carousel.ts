/**
 * Represents an image item in a carousel.
 */
export interface ImageCarouselItem {
  /** Type discriminator for images */
  type: 'image';
  /** Unique identifier for the carousel item */
  id: string;
  /** Image source path (relative to public folder or absolute URL) */
  imageUrl: string;
  /** Descriptive alt text for the image (required for accessibility) */
  imageAlt: string;
}

/**
 * Represents a video item in a carousel.
 */
export interface VideoCarouselItem {
  /** Type discriminator for videos */
  type: 'video';
  /** Unique identifier for the carousel item */
  id: string;
  /** Video source path (relative to public folder or absolute URL) */
  videoUrl: string;
  /** Descriptive alt text for the video (required for accessibility) */
  videoAlt: string;
}

/**
 * Represents an item in a carousel (supports both images and videos).
 * Each item contains the necessary information to display media with proper accessibility.
 */
export type CarouselItem = ImageCarouselItem | VideoCarouselItem;

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
