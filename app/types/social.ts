import type { IconType } from 'react-icons';

/**
 * Represents a social media link configuration for Footer and other components.
 */
export interface SocialLink {
  /** URL or mailto link */
  href: string;
  /** React Icon component type */
  icon: IconType;
  /** Accessible label for screen readers */
  label: string;
  /** Whether the link opens in a new tab (external links) */
  external?: boolean;
}
