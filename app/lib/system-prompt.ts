import { homeContent } from '@/content/home';
import { aboutContent } from '@/content/about';
import { projects } from '@/content/projects';
import { interestsData } from '@/content/interests';
import { socialLinks } from '@/content/social';
import { getAllExperienceEntries } from '@/app/lib/experience';
import type { ExperienceEntry } from '@/app/types/experience';

/**
 * Instructions for the chatbot assistant.
 * Defines the role and behavior expectations for the LLM.
 */
const ASSISTANT_INSTRUCTIONS = `You are a helpful assistant that answers questions about Chen Tetroashvili.
Answer questions about Chen's background, experience, skills, projects, and interests.
When possible, cite specific sources (e.g., mention specific projects, companies, or experiences).
Be helpful, concise, and accurate.
Format your responses using Markdown for better readability.`;

/**
 * Builds the "About Chen" section from home content.
 *
 * @returns Formatted markdown section string
 */
function buildAboutChenSection(): string {
  const name = homeContent.profile?.mainHeading || 'N/A';
  const title = homeContent.profile?.subHeading || 'N/A';
  const bio = homeContent.profile?.paragraphContent || '';

  return `## About Chen

**Name**: ${name}
**Title**: ${title}
**Bio**: ${bio}`;
}

/**
 * Builds the "Skills & Expertise" section from home content.
 *
 * @returns Formatted markdown section string
 */
function buildSkillsSection(): string {
  const description = homeContent.skills?.description || '';
  const items = homeContent.skills?.items || [];
  const skillsList = items
    .map((skill) => `- **${skill.title || 'N/A'}**: ${skill.description || ''}`)
    .join('\n');

  return `## Skills & Expertise

${description}

${skillsList}`;
}

/**
 * Builds the "Current Status" section from home content.
 *
 * @returns Formatted markdown section string
 */
function buildCurrentStatusSection(): string {
  const heading = homeContent.now?.heading || 'Now';
  const title = homeContent.now?.item?.title || 'N/A';
  const description = homeContent.now?.item?.description || '';

  return `## Current Status

**${heading}**: ${title}
${description}`;
}

/**
 * Builds the "About" section from about page content.
 *
 * @returns Formatted markdown section string
 */
function buildAboutSection(): string {
  const paragraphContent = aboutContent.profile?.paragraphContent || '';

  return `## About

${paragraphContent}

Note: Professional experience and detailed skills are covered in separate sections below.`;
}

/**
 * Extracts responsibilities from experience entry content.
 * Filters for bullet points (lines starting with '-') or falls back to full content.
 *
 * @param content - The markdown content from the experience entry
 * @returns Formatted responsibilities string
 */
function extractResponsibilities(content: string): string {
  if (!content || typeof content !== 'string') {
    return '';
  }

  const bulletPoints = content
    .split('\n')
    .filter((line) => line.trim().startsWith('-'))
    .map((line) => line.trim())
    .join('\n');

  // Fallback to full content if no bullet points found
  return bulletPoints || content.trim();
}

/**
 * Builds the "Professional Experience" section from experience entries.
 *
 * @returns Formatted markdown section string, or empty string if no entries
 */
function buildProfessionalExperienceSection(): string {
  let experienceEntries: ExperienceEntry[] = [];

  try {
    experienceEntries = getAllExperienceEntries();
  } catch (error) {
    // Log error but continue with empty array
    // In production, you might want to use a logging service
    console.error('Failed to load experience entries:', error);
    return '';
  }

  if (experienceEntries.length === 0) {
    return '';
  }

  const experienceList = experienceEntries
    .map((entry) => {
      const dateRange =
        entry.endDate === 'Present'
          ? `${entry.startDate || 'N/A'} - Present`
          : `${entry.startDate || 'N/A'} - ${entry.endDate || 'N/A'}`;
      const responsibilities = extractResponsibilities(entry.content || '');

      return `### ${entry.role || 'N/A'} at ${entry.company || 'N/A'}
**Period**: ${dateRange}

${responsibilities}`;
    })
    .join('\n\n');

  return `## Professional Experience

${experienceList}`;
}

/**
 * Builds the "Projects" section from projects content.
 *
 * @returns Formatted markdown section string, or empty string if no projects
 */
function buildProjectsSection(): string {
  if (!projects || projects.length === 0) {
    return '';
  }

  const projectsList = projects
    .map((project) => {
      const technologies =
        project.technologies && project.technologies.length > 0
          ? `Technologies: ${project.technologies.join(', ')}`
          : '';
      const languages =
        project.languages && project.languages.length > 0
          ? `Languages: ${project.languages.join(', ')}`
          : '';
      const techInfo = [technologies, languages].filter(Boolean).join(' | ');
      const links: string[] = [];
      if (project.githubUrl) {
        links.push(`GitHub: ${project.githubUrl}`);
      }
      if (project.liveUrl) {
        links.push(`Live: ${project.liveUrl}`);
      }
      const linksInfo = links.length > 0 ? `\n${links.join(' | ')}` : '';

      return `### ${project.title || 'N/A'}
${project.shortDescription || ''}
${techInfo}${linksInfo}`;
    })
    .join('\n\n');

  return `## Projects

${projectsList}`;
}

/**
 * Builds the "Personal Interests" section from interests content.
 *
 * @returns Formatted markdown section string, or empty string if no interests
 */
function buildPersonalInterestsSection(): string {
  if (!interestsData || interestsData.length === 0) {
    return '';
  }

  const interestsList = interestsData
    .map((interest) => `- **${interest.title || 'N/A'}**: ${interest.description || ''}`)
    .join('\n');

  return `## Personal Interests

${interestsList}`;
}

/**
 * Cleans social link labels by removing common prefixes.
 *
 * @param label - The original label from social links
 * @returns Cleaned label without prefixes
 */
function cleanSocialLinkLabel(label: string | undefined | null): string {
  if (!label || typeof label !== 'string') {
    return 'N/A';
  }
  return label.replace(/^(Visit |Contact via )/i, '');
}

/**
 * Builds the "Links" section from social links content.
 *
 * @returns Formatted markdown section string, or empty string if no links
 */
function buildLinksSection(): string {
  if (!socialLinks || socialLinks.length === 0) {
    return '';
  }

  const linksList = socialLinks
    .map((link) => {
      const label = cleanSocialLinkLabel(link.label);
      return `- **${label}**: ${link.href || 'N/A'}`;
    })
    .join('\n');

  return `## Links

${linksList}`;
}

/**
 * Builds a comprehensive system prompt for the chatbot that includes
 * all content about Chen Tetroashvili from various content files.
 *
 * @returns A formatted system prompt string for the LLM
 *
 * @example
 * ```markdown
 * You are a helpful assistant that answers questions about Chen Tetroashvili.
 * ...
 * ## About Chen
 * **Name**: Chen Tetroashvili
 * **Title**: Software Developer
 * ...
 * ## Skills & Expertise
 * ...
 * ```
 */
export function buildSystemPrompt(): string {
  const sections: string[] = [];

  // Instructions section (STEP-007: added at the beginning)
  sections.push(ASSISTANT_INSTRUCTIONS);

  // About Chen section (STEP-003: Home content)
  sections.push(buildAboutChenSection());

  // Skills & Expertise section (STEP-003: Home content)
  sections.push(buildSkillsSection());

  // Current Status section (STEP-003: Home content)
  sections.push(buildCurrentStatusSection());

  // About page content (STEP-004)
  sections.push(buildAboutSection());

  // Professional Experience section (STEP-006)
  const experienceSection = buildProfessionalExperienceSection();
  if (experienceSection) {
    sections.push(experienceSection);
  }

  // Projects section (STEP-005)
  const projectsSection = buildProjectsSection();
  if (projectsSection) {
    sections.push(projectsSection);
  }

  // Personal Interests section (STEP-007)
  const interestsSection = buildPersonalInterestsSection();
  if (interestsSection) {
    sections.push(interestsSection);
  }

  // Links section (STEP-007)
  const linksSection = buildLinksSection();
  if (linksSection) {
    sections.push(linksSection);
  }

  // Join all sections with double newlines for readability
  return sections.join('\n\n');
}
