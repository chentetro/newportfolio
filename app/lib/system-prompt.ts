import { homeContent } from '@/content/home';
import { aboutContent } from '@/content/about';
import { projects } from '@/content/projects';
import { interestsData } from '@/content/interests';
import { socialLinks } from '@/content/social';
import { getAllExperienceEntries } from '@/app/lib/experience';

/**
 * Builds a comprehensive system prompt for the chatbot that includes
 * all content about Chen Tetroashvili from various content files.
 *
 * @returns A formatted system prompt string for the LLM
 */
export function buildSystemPrompt(): string {
  const sections: string[] = [];

  // Instructions section (STEP-007: added at the beginning)
  sections.push(`You are a helpful assistant that answers questions about Chen Tetroashvili.
Answer questions about Chen's background, experience, skills, projects, and interests.
When possible, cite specific sources (e.g., mention specific projects, companies, or experiences).
Be helpful, concise, and accurate.
Format your responses using Markdown for better readability.`);

  // About Chen section (STEP-003: Home content)
  sections.push(`## About Chen

**Name**: ${homeContent.profile.mainHeading}
**Title**: ${homeContent.profile.subHeading}
**Bio**: ${homeContent.profile.paragraphContent}`);

  // Skills & Expertise section (STEP-003: Home content)
  sections.push(`## Skills & Expertise

${homeContent.skills.description}

${homeContent.skills.items.map((skill) => `- **${skill.title}**: ${skill.description}`).join('\n')}`);

  // Current Status section (STEP-003: Home content)
  sections.push(`## Current Status

**${homeContent.now.heading}**: ${homeContent.now.item.title}
${homeContent.now.item.description}`);

  // About page content (STEP-004)
  sections.push(`## About

${aboutContent.profile.paragraphContent}

Note: Professional experience and detailed skills are covered in separate sections below.`);

  // Professional Experience section (STEP-006)
  const experienceEntries = getAllExperienceEntries();
  if (experienceEntries.length > 0) {
    sections.push(`## Professional Experience

${experienceEntries
  .map((entry) => {
    const dateRange =
      entry.endDate === 'Present'
        ? `${entry.startDate} - Present`
        : `${entry.startDate} - ${entry.endDate}`;
    const responsibilities = entry.content
      .split('\n')
      .filter((line) => line.trim().startsWith('-'))
      .map((line) => line.trim())
      .join('\n');
    return `### ${entry.role} at ${entry.company}
**Period**: ${dateRange}

${responsibilities}`;
  })
  .join('\n\n')}`);
  }

  // Projects section (STEP-005)
  if (projects.length > 0) {
    sections.push(`## Projects

${projects
  .map((project) => {
    const technologies =
      project.technologies.length > 0
        ? `Technologies: ${project.technologies.join(', ')}`
        : '';
    const languages =
      project.languages.length > 0
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

    return `### ${project.title}
${project.shortDescription}
${techInfo}${linksInfo}`;
  })
  .join('\n\n')}`);
  }

  // Personal Interests section (STEP-007)
  if (interestsData.length > 0) {
    sections.push(`## Personal Interests

${interestsData
  .map((interest) => `- **${interest.title}**: ${interest.description}`)
  .join('\n')}`);
  }

  // Links section (STEP-007)
  if (socialLinks.length > 0) {
    sections.push(`## Links

${socialLinks
  .map((link) => {
    const label = link.label.replace(/^(Visit |Contact via )/i, '');
    return `- **${label}**: ${link.href}`;
  })
  .join('\n')}`);
  }

  // Join all sections with double newlines for readability
  return sections.join('\n\n');
}
