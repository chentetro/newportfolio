/**
 * Props for the ProjectImage component.
 */
export interface ProjectImageProps {
  /** Source URL of the image to display */
  src: string;
  /** Alt text for the image */
  alt: string;
  /** CSS classes to apply to the image */
  className?: string;
  /** Responsive image sizes attribute */
  sizes?: string;
  /** Whether to prioritize loading this image */
  priority?: boolean;
}
