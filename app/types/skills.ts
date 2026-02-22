import type { IconType } from 'react-icons';

/**
 * Represents the category of a technical skill.
 * Union type ensures type safety and prevents invalid category values.
 */
export type SkillCategory =
  | 'Languages'
  | 'Frontend Development'
  | 'Backend & Database'
  | 'Tools & Testing'
  | 'Other';

/**
 * Represents a single technical skill with its icon.
 */
export interface Skill {
  /** Name of the skill */
  name: string;
  /** React Icon component type */
  icon: IconType;
}

/**
 * Represents a category of skills with its associated skills list.
 */
export interface SkillCategoryData {
  /** Category title */
  category: SkillCategory;
  /** List of skills in this category */
  skills: Skill[];
}
