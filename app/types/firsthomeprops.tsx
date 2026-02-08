/**
 * Props for the FirstHome component.
 */
export interface FirstHomeProps {
  /** URL of the image to display */
  imageUrl: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Main heading text */
  mainHeading: string;
  /** Subheading text */
  subHeading: string;
  /** Paragraph content text */
  paragraphContent: string;
  /**
   * Whether to disable the background gradient.
   *
   * Set to `true` when you want the component to blend seamlessly with the page background
   * without the gradient effect. Useful when:
   * - The component is placed on a page with its own background styling
   * - You want a more minimal, flat design aesthetic
   * - The component needs to match surrounding sections without visual separation
   *
   * Defaults to `false`, which applies a gradient background from blue-50 to white
   * (light mode) or gray-800 to gray-900 (dark mode).
   */
  noBackground?: boolean;
}
