/**
 * Represents a professional experience entry parsed from markdown frontmatter.
 */
export interface ExperienceEntry {
  /** Job title or role name */
  role: string;
  /** Company or organization name */
  company: string;
  /** Start date in "MMM YYYY" format (e.g., "Dec 2024") */
  startDate: string;
  /** End date in "MMM YYYY" format or "Present" for current positions */
  endDate: string | 'Present';
  /** Markdown content with bullet points describing responsibilities */
  content: string;
  /** Filename slug (without .md extension) used for identification */
  slug: string;
}
