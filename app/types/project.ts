/**
 * Represents a technology or tool used in a project.
 * Union type ensures type safety and prevents invalid technology values.
 */
export type Technology =
  | 'React'
  | 'Next.js'
  | 'TypeScript'
  | 'JavaScript'
  | 'Tailwind CSS'
  | 'Node.js'
  | 'MongoDB'
  | 'MySQL'
  | 'PostgreSQL'
  | 'Git'
  | 'GitHub'
  | 'Docker'
  | 'AWS'
  | 'Vercel'
  | 'HTML'
  | 'CSS'
  | 'Express'
  | 'Prisma'
  | 'GraphQL'
  | 'REST API'
  | 'Jest'
  | 'Vitest'
  | 'React Testing Library';

/**
 * Represents a programming language used in a project.
 * Union type ensures type safety and prevents invalid language values.
 */
export type Language =
  | 'TypeScript'
  | 'JavaScript'
  | 'Python'
  | 'Java'
  | 'C++'
  | 'C'
  | 'C#'
  | 'Go'
  | 'Rust'
  | 'PHP'
  | 'Ruby'
  | 'Swift'
  | 'Kotlin';

/**
 * Represents a project in the portfolio with all its metadata and content.
 */
export interface Project {
  /** Unique slug identifier used for routing (e.g., "e-commerce-platform") */
  slug: string;
  /** Project title displayed on cards and detail pages */
  title: string;
  /** Short description shown on project cards (1-2 sentences) */
  shortDescription: string;
  /** Full description shown on project detail page (paragraphs) */
  description: string;
  /** Array of technologies/tools used in the project */
  technologies: Technology[];
  /** Array of programming languages used in the project */
  languages: Language[];
  /** GitHub repository URL */
  githubUrl: string;
  /** Image source path (relative to public folder or absolute URL) */
  imageSrc: string;
  /** Descriptive alt text for the project image (required for accessibility) */
  imageAlt: string;
  /** Live demo URL (optional) */
  liveUrl?: string;
  /** Video demonstration URL (optional) */
  videoUrl?: string;
}
