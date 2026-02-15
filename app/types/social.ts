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

/**
 * Props for the SocialButtons component.
 */
export interface SocialButtonsProps {
  /** GitHub profile URL */
  githubUrl: string;
  /** CV/resume download URL */
  cvUrl: string;
  /** LinkedIn profile URL */
  linkedInUrl: string;
  /** Email address for contact */
  email: string;
}
