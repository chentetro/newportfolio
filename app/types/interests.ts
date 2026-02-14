import type { IconType } from 'react-icons';

/**
 * Represents an interest card with icon, title, and description.
 * Used in the LifeBeyondCode component to display personal interests.
 */
export interface InterestCard {
  /** Unique identifier for the interest card */
  id: string;
  /** Title of the interest (e.g., "Cooking", "Workout") */
  title: string;
  /** Description of the interest activity */
  description: string;
  /** Icon component from react-icons library */
  icon: IconType;
}

/**
 * Props for the LifeBeyondCode component.
 * Defines the structure for displaying personal interests section.
 */
export interface LifeBeyondCodeProps {
  /** Main heading text for the section (e.g., "Life Beyond Code") */
  mainHeading: string;
  /** Descriptive paragraph text explaining the section */
  description: string;
  /** Section heading for the interest cards (e.g., "Cooking") */
  sectionHeading: string;
  /** Array of interest cards to display */
  interests: InterestCard[];
}
